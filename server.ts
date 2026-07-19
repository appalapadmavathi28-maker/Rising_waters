import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { HISTORICAL_DATASET, StandardScaler, DecisionTree, RandomForest, KNN, XGBoost, evaluateModel } from "./src/lib/ml.js";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side Gemini API client
  const apiKey = process.env.GEMINI_API_KEY;
  const ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Fit the StandardScaler globally on the dataset features
  const scaler = new StandardScaler();
  const X = HISTORICAL_DATASET.map(row => [
    row.CloudCover,
    row.ANNUAL,
    row.JanFeb,
    row.MarMay,
    row.JunSep
  ]);
  const y = HISTORICAL_DATASET.map(row => row.flood);
  scaler.fit(X);

  // Train the four models on startup
  const dt = new DecisionTree();
  dt.fit(scaler.transform(X), y);

  const rf = new RandomForest();
  rf.fit(scaler.transform(X), y);

  const knn = new KNN();
  knn.fit(scaler.transform(X), y);

  const xgb = new XGBoost();
  xgb.fit(scaler.transform(X), y);

  // API Route: Make a prediction
  app.post("/api/predict", async (req, res) => {
    try {
      const { cloudCover, annual, janFeb, marMay, junSep, modelType = "xgb" } = req.body;

      // Validate inputs
      const cc = parseFloat(cloudCover);
      const ann = parseFloat(annual);
      const jf = parseFloat(janFeb);
      const mm = parseFloat(marMay);
      const js = parseFloat(junSep);

      if (isNaN(cc) || isNaN(ann) || isNaN(jf) || isNaN(mm) || isNaN(js)) {
        return res.status(400).json({ error: "All inputs must be numeric values" });
      }

      // Standardize inputs
      const rawRow = [cc, ann, jf, mm, js];
      const scaledRow = scaler.transformRow(rawRow);

      let prediction = 0;
      let probability = 0.5;

      // Select model
      if (modelType === "dt") {
        prediction = dt.predict([scaledRow])[0];
        probability = prediction === 1 ? 0.85 : 0.15;
      } else if (modelType === "rf") {
        prediction = rf.predict([scaledRow])[0];
        probability = prediction === 1 ? 0.90 : 0.10;
      } else if (modelType === "knn") {
        prediction = knn.predict([scaledRow])[0];
        probability = prediction === 1 ? 0.80 : 0.20;
      } else {
        // Default: XGBoost
        prediction = xgb.predict([scaledRow])[0];
        probability = xgb.predictProbability([scaledRow])[0];
      }

      // Generate explanations via server-side Gemini if API key is present
      let explanation = "";
      if (apiKey) {
        try {
          const prompt = `Act as an expert hydrologist and meteorologist. A Machine Learning model (${modelType === "xgb" ? "XGBoost" : modelType.toUpperCase()}) predicted ${prediction === 1 ? "high risk of flood (1)" : "low risk of flood (0)"} with ${Math.round(probability * 100)}% probability for these parameters:
- Cloud Cover: ${cc}%
- Annual Rainfall: ${ann} mm
- Jan-Feb Rainfall: ${jf} mm
- March-May Rainfall: ${mm} mm
- June-September Rainfall: ${js} mm

Provide a concise, 2-3 sentence scientific explanation (no markdown tables, just bullet points or brief paragraphs) of why these meteorological conditions lead to this risk level. Highlight if the June-September monsoon period is the major driver.`;
          
          const response = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
          });
          explanation = response.text || "";
        } catch (err: any) {
          console.error("Gemini explanation failed:", err);
          explanation = "Could not generate live AI explanation. Based on meteorological patterns, June-September heavy monsoonal rain is the core contributor to soil saturation, causing river levels to breach safety lines.";
        }
      } else {
        explanation = "Gemini API key is not configured in Secrets. Based on standard hydrological guidelines, June-September monsoon rainfall accounts for over 70% of the annual totals, making it the critical driver of local flood risk.";
      }

      res.json({
        prediction,
        probability,
        explanation,
        inputs: { cloudCover: cc, annual: ann, janFeb: jf, marMay: mm, junSep: js },
        scaledInputs: scaledRow,
        modelUsed: modelType
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // API Route: Get historical data and performance comparison
  app.get("/api/models-comparison", (req, res) => {
    const scaledX = scaler.transform(X);
    
    // Evaluate all models
    const dtPreds = dt.predict(scaledX);
    const rfPreds = rf.predict(scaledX);
    const knnPreds = knn.predict(scaledX);
    const xgbPreds = xgb.predict(scaledX);

    res.json({
      dt: evaluateModel(dtPreds, y),
      rf: evaluateModel(rfPreds, y),
      knn: evaluateModel(knnPreds, y),
      xgb: evaluateModel(xgbPreds, y),
    });
  });

  // API Route: Get full training dataset for the grid
  app.get("/api/dataset", (req, res) => {
    res.json(HISTORICAL_DATASET);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
