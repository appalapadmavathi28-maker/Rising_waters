/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  AlertTriangle,
  CheckCircle2,
  CloudRain,
  Database,
  Activity,
  FileText,
  BarChart3,
  RefreshCw,
  Sliders,
  ArrowRight,
  GitFork,
  Layers,
  Compass,
  BookOpen,
  Info,
  Brain,
  Cpu,
  TrendingUp,
  LineChart,
  Grid
} from "lucide-react";
import { TabType, WeatherInputs, PredictionResult, ComparisonData } from "./types";
import satelliteNormalUrl from "./assets/images/satellite_normal_1783922975402.jpg";
import satelliteFloodedUrl from "./assets/images/satellite_flooded_1783922993193.jpg";
import satelliteRadarUrl from "./assets/images/satellite_radar_1783923007468.jpg";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("predictor");
  const [inputs, setInputs] = useState<WeatherInputs>({
    cloudCover: "38",
    annual: "2708",
    janFeb: "16.5",
    marMay: "342.1",
    junSep: "1914.3",
    modelType: "xgb"
  });
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [dataset, setDataset] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Preprocessing sandbox state
  const [sandboxInputs, setSandboxInputs] = useState({
    cloudCover: "50", // higher than typical limit to test capping
    janFeb: "120"
  });

  // Satellite Imagery view state
  const [satelliteView, setSatelliteView] = useState<"visible" | "radar">("visible");
  const [showFloodedSatellite, setShowFloodedSatellite] = useState<boolean>(false);

  // Load baseline statistics and comparison data on load
  useEffect(() => {
    fetch("/api/models-comparison")
      .then(res => res.json())
      .then(data => setComparisonData(data))
      .catch(err => console.error("Error fetching comparison metrics:", err));

    fetch("/api/dataset")
      .then(res => res.json())
      .then(data => setDataset(data))
      .catch(err => console.error("Error fetching dataset:", err));
  }, []);

  const handlePredict = async (e: FormEvent) => {
    e.preventDefault();
    setIsPredicting(true);

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inputs)
      });
      const data = await response.json();
      if (response.ok) {
        setPredictionResult(data);
        setShowFloodedSatellite(data.prediction === 1);
      } else {
        alert(data.error || "Prediction failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error contacting the prediction service.");
    } finally {
      setIsPredicting(false);
    }
  };

  // IQR Outlier capping limits (computed from historical dataset)
  // Cloud Cover: Q1=34, Q3=43, IQR=9 -> Upper cap = Q3 + 1.5*IQR = 56.5, Lower cap = 20.5
  // Jan-Feb: Q1=10, Q3=23, IQR=13 -> Upper cap = 42.5, Lower cap = -9.5 (capped at 0)
  const capOutliers = (val: number, min: number, max: number) => {
    if (val > max) return { value: max, capped: true };
    if (val < min) return { value: min, capped: true };
    return { value: val, capped: false };
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col antialiased">
      {/* Upper Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-teal-600 text-white p-2 rounded-xl shadow-md shadow-teal-600/10">
              <CloudRain className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight text-slate-900 block">
                RISING WATERS
              </span>
              <span className="text-[10px] font-mono tracking-widest text-teal-600 block uppercase font-semibold">
                Flood Prediction Engine
              </span>
            </div>
          </div>

          <nav className="flex space-x-1 sm:space-x-2 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("predictor")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "predictor"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Activity className="h-3.5 w-3.5 text-teal-600" />
              <span>Predictor</span>
            </button>

            <button
              onClick={() => setActiveTab("workspace")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "workspace"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <Brain className="h-3.5 w-3.5 text-indigo-600" />
              <span>ML Workspace</span>
            </button>

            <button
              onClick={() => setActiveTab("er")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "er"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <GitFork className="h-3.5 w-3.5 text-emerald-600" />
              <span>ER Model</span>
            </button>

            <button
              onClick={() => setActiveTab("about")}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                activeTab === "about"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 text-amber-600" />
              <span>About</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          {activeTab === "predictor" && (
            <motion.div
              key="predictor"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Side: Form Inputs */}
              <div className="lg:col-span-5 flex flex-col space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <h2 className="text-lg font-display font-semibold text-slate-900 mb-1 flex items-center space-x-2">
                    <Sliders className="h-5 w-5 text-teal-600" />
                    <span>Meteorological Parameters</span>
                  </h2>
                  <p className="text-xs text-slate-500 mb-6">
                    Enter the meteorological variables below to test for monsoonal flood risks.
                  </p>

                  <form onSubmit={handlePredict} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Cloud Cover (%)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="0.1"
                        required
                        value={inputs.cloudCover}
                        onChange={e => setInputs({ ...inputs, cloudCover: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                        placeholder="Cloud cover percentage (e.g. 38)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Annual Rainfall (mm)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="10000"
                        required
                        value={inputs.annual}
                        onChange={e => setInputs({ ...inputs, annual: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                        placeholder="Total annual rain in mm (e.g. 3100)"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Jan-Feb (mm)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="2000"
                          step="0.1"
                          required
                          value={inputs.janFeb}
                          onChange={e => setInputs({ ...inputs, janFeb: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                          placeholder="e.g. 15.2"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                          Mar-May (mm)
                        </label>
                        <input
                          type="number"
                          min="0"
                          max="4000"
                          step="0.1"
                          required
                          value={inputs.marMay}
                          onChange={e => setInputs({ ...inputs, marMay: e.target.value })}
                          className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                          placeholder="e.g. 330"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        June-September Monsoon (mm)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="8000"
                        step="0.1"
                        required
                        value={inputs.junSep}
                        onChange={e => setInputs({ ...inputs, junSep: e.target.value })}
                        className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
                        placeholder="Heavy monsoon period (e.g. 2300)"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                        Machine Learning Classifier Model
                      </label>
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        {[
                          { id: "xgb", name: "XGBoost", desc: "Gradient boosting" },
                          { id: "rf", name: "Random Forest", desc: "Tree ensemble" },
                          { id: "dt", name: "Decision Tree", desc: "Single conditions" },
                          { id: "knn", name: "KNN (K=5)", desc: "Instance-based" }
                        ].map(model => (
                          <label
                            key={model.id}
                            className={`flex flex-col p-2.5 rounded-xl border cursor-pointer transition text-left ${
                              inputs.modelType === model.id
                                ? "border-teal-500 bg-teal-50/50"
                                : "border-slate-200 hover:border-slate-300"
                            }`}
                          >
                            <input
                              type="radio"
                              name="modelType"
                              value={model.id}
                              checked={inputs.modelType === model.id}
                              onChange={e => setInputs({ ...inputs, modelType: e.target.value })}
                              className="sr-only"
                            />
                            <span className="text-xs font-bold text-slate-800">{model.name}</span>
                            <span className="text-[10px] text-slate-500">{model.desc}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isPredicting}
                      className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white py-3 px-4 rounded-xl font-medium text-sm transition-all shadow-md shadow-teal-600/15 flex items-center justify-center space-x-2 disabled:bg-teal-400"
                    >
                      {isPredicting ? (
                        <>
                          <RefreshCw className="h-4 w-4 animate-spin" />
                          <span>Executing ML Pipeline...</span>
                        </>
                      ) : (
                        <>
                          <span>Predict Flood Risk</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Helpful tips */}
                <div className="bg-slate-100 p-4 rounded-xl border border-slate-200/60 flex items-start space-x-3 text-xs text-slate-600">
                  <Info className="h-4 w-4 text-teal-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block mb-0.5">Hydrological Correlation Guide</span>
                    The June-September monsoon period is the core driver of soil saturation. Total annual rainfall above 3300mm combined with &gt;2400mm monsoon yields a highly elevated probability of flooding.
                  </div>
                </div>
              </div>

              {/* Right Side: Output Result panel */}
              <div className="lg:col-span-7 flex flex-col space-y-6">
                <AnimatePresence mode="wait">
                  {predictionResult ? (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex flex-col space-y-6"
                    >
                      {/* Prediction Banner Card */}
                      <div
                        className={`p-6 rounded-2xl border ${
                          predictionResult.prediction === 1
                            ? "bg-rose-50/50 border-rose-200 text-rose-950 shadow-sm"
                            : "bg-emerald-50/50 border-emerald-200 text-emerald-950 shadow-sm"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`p-2.5 rounded-xl text-white shadow-md ${
                                predictionResult.prediction === 1 ? "bg-rose-600" : "bg-emerald-600"
                              }`}
                            >
                              {predictionResult.prediction === 1 ? (
                                <AlertTriangle className="h-6 w-6" />
                              ) : (
                                <CheckCircle2 className="h-6 w-6" />
                              )}
                            </div>
                            <div>
                              <span className="text-xs uppercase tracking-widest font-bold block opacity-70">
                                Output Prediction Label
                              </span>
                              <h3 className="font-display font-bold text-2xl tracking-tight">
                                {predictionResult.prediction === 1
                                  ? "HIGH RISK OF FLOOD"
                                  : "LOW RISK / SAFE CONDITIONS"}
                              </h3>
                            </div>
                          </div>

                          <div className="text-right">
                            <span className="text-[10px] font-semibold text-slate-500 uppercase block">
                              Model Probability
                            </span>
                            <span className="text-2xl font-mono font-bold block text-slate-800">
                              {Math.round(predictionResult.probability * 100)}%
                            </span>
                          </div>
                        </div>

                        {/* Probability visualization bar */}
                        <div className="mt-6">
                          <div className="flex justify-between text-xs text-slate-500 mb-1">
                            <span>0% Low Chance</span>
                            <span>100% Certainty</span>
                          </div>
                          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                predictionResult.prediction === 1 ? "bg-rose-600" : "bg-emerald-600"
                              }`}
                              style={{ width: `${predictionResult.probability * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Scientific AI-Explanation Card */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
                        <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-2">
                          <Brain className="h-4.5 w-4.5 text-indigo-600 animate-pulse" />
                          <span>Meteorological Explanation</span>
                        </h4>
                        <div className="text-sm text-slate-600 leading-relaxed border-l-2 border-indigo-200 pl-4 py-1 italic">
                          "{predictionResult.explanation}"
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                          <span>Grounding: Real-time analysis compiled with</span>
                          <span className="font-semibold text-indigo-600">Google Gemini 3.5 Flash</span>
                        </div>
                      </div>

                      {/* Data Preprocessing Audit */}
                      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                        <h4 className="text-sm font-bold text-slate-800 mb-4 flex items-center space-x-2">
                          <Sliders className="h-4.5 w-4.5 text-teal-600" />
                          <span>StandardScaler Preprocessing Audit</span>
                        </h4>
                        <p className="text-xs text-slate-500 mb-4">
                          Features are scaled to zero mean and unit variance before feeding into the classifier:
                          <code className="bg-slate-100 text-slate-700 px-1 py-0.5 rounded font-mono text-[10px] ml-1">z = (x - μ) / σ</code>
                        </p>

                        <div className="overflow-x-auto border border-slate-100 rounded-xl">
                          <table className="w-full text-left text-xs text-slate-600">
                            <thead className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-700 uppercase">
                              <tr>
                                <th className="px-3 py-2">Parameter</th>
                                <th className="px-3 py-2 text-right">Raw Input Value</th>
                                <th className="px-3 py-2 text-right">Scaled Value (z)</th>
                                <th className="px-3 py-2">Deviation Range</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                              {[
                                { name: "Cloud Cover", raw: `${predictionResult.inputs.cloudCover}%`, scaled: predictionResult.scaledInputs[0] },
                                { name: "Annual Rainfall", raw: `${predictionResult.inputs.annual} mm`, scaled: predictionResult.scaledInputs[1] },
                                { name: "Jan-Feb Rainfall", raw: `${predictionResult.inputs.janFeb} mm`, scaled: predictionResult.scaledInputs[2] },
                                { name: "Mar-May Rainfall", raw: `${predictionResult.inputs.marMay} mm`, scaled: predictionResult.scaledInputs[3] },
                                { name: "Jun-Sep Rainfall", raw: `${predictionResult.inputs.junSep} mm`, scaled: predictionResult.scaledInputs[4] }
                              ].map((f, i) => {
                                const scaledAbs = Math.abs(f.scaled);
                                const colorClass = scaledAbs > 1.5 ? "text-rose-600 font-semibold" : scaledAbs > 0.7 ? "text-amber-600" : "text-emerald-600";
                                return (
                                  <tr key={i}>
                                    <td className="px-3 py-2.5 font-sans font-medium text-slate-700">{f.name}</td>
                                    <td className="px-3 py-2.5 text-right font-medium">{f.raw}</td>
                                    <td className={`px-3 py-2.5 text-right ${colorClass}`}>{f.scaled.toFixed(4)}</td>
                                    <td className="px-3 py-2.5 font-sans">
                                      <div className="flex items-center space-x-2">
                                        <div className="h-1.5 w-16 bg-slate-100 rounded overflow-hidden">
                                          <div
                                            className={`h-full rounded ${scaledAbs > 1.5 ? "bg-rose-500" : "bg-emerald-500"}`}
                                            style={{ width: `${Math.min(100, Math.max(10, scaledAbs * 30))}%` }}
                                          />
                                        </div>
                                        <span className="text-[10px] text-slate-400">
                                          {f.scaled > 0 ? "+" : ""}{f.scaled.toFixed(1)} SD
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center flex flex-col items-center justify-center space-y-4"
                      style={{ minHeight: "360px" }}
                    >
                      <div className="bg-slate-100 p-4 rounded-2xl text-slate-400">
                        <Activity className="h-8 w-8 animate-pulse text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-display font-semibold text-slate-800 text-lg">
                          Real-time Flood Prediction Pipeline
                        </h3>
                        <p className="text-sm text-slate-500 max-w-sm mx-auto mt-1">
                          Configure the meteorological inputs on the left, select your classifier model, and run the predictive pipeline to receive live outcomes and hydrological explanations.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {activeTab === "workspace" && (
            <motion.div
              key="workspace"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col space-y-8"
            >
              {/* Epics Progression Tab-within-Tab */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 h-40 w-40 bg-teal-500/10 rounded-full blur-2xl" />
                <div className="relative">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold">
                    Supervised ML Pipeline
                  </span>
                  <h2 className="font-display font-bold text-2xl tracking-tight text-white mt-1">
                    Flood Prediction Training & Model Exploration
                  </h2>
                  <p className="text-sm text-slate-300 mt-2 max-w-2xl">
                    Explore the complete step-by-step pipeline from raw Excel data, distribution analysis, and StandardScaler normalization, to training our ensembles and comparing evaluation metrics.
                  </p>
                </div>
              </div>

              {/* Grid of ML Epics Explorer */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Right Side: Visualizing Metrics & Results */}
                <div className="lg:col-span-8 flex flex-col space-y-8">
                  {/* Epic 1: Raw dataset grid */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-display font-semibold text-slate-900 text-md flex items-center space-x-2">
                        <Database className="h-5 w-5 text-teal-600" />
                        <span>Epic 1: Data Collection & Data Exploration</span>
                      </h3>
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                        {dataset.length} samples loaded
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      The core dataset collects annual and seasonal rainfall parameters alongside Temperature, Humidity, and Cloud Cover. The binary <code className="font-mono text-indigo-600">flood</code> column acts as our ground truth category.
                    </p>

                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 text-[10px] font-bold text-slate-700 uppercase border-b border-slate-100">
                          <tr>
                            <th className="px-3 py-2 text-center">#</th>
                            <th className="px-3 py-2 text-right">Temp</th>
                            <th className="px-3 py-2 text-right">Humidity</th>
                            <th className="px-3 py-2 text-right">Cloud Cover</th>
                            <th className="px-3 py-2 text-right">ANNUAL</th>
                            <th className="px-3 py-2 text-right">Jun-Sep</th>
                            <th className="px-3 py-2 text-center">Class</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-mono text-[11px] text-slate-600">
                          {dataset.length > 0 ? (
                            dataset
                              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                              .map((row, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition">
                                  <td className="px-3 py-2 text-center text-slate-400 font-sans">
                                    {(currentPage - 1) * itemsPerPage + idx + 1}
                                  </td>
                                  <td className="px-3 py-2 text-right">{row.Temp}°C</td>
                                  <td className="px-3 py-2 text-right">{row.Humidity}%</td>
                                  <td className="px-3 py-2 text-right">{row.CloudCover}%</td>
                                  <td className="px-3 py-2 text-right font-medium text-slate-800">{row.ANNUAL.toFixed(1)}</td>
                                  <td className="px-3 py-2 text-right text-teal-600">{row.JunSep.toFixed(1)}</td>
                                  <td className="px-3 py-2 text-center">
                                    <span
                                      className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-sans font-bold leading-none ${
                                        row.flood === 1
                                          ? "bg-rose-100 text-rose-800"
                                          : "bg-emerald-100 text-emerald-800"
                                      }`}
                                    >
                                      {row.flood === 1 ? "Flood" : "Safe"}
                                    </span>
                                  </td>
                                </tr>
                              ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="px-3 py-8 text-center text-slate-400 font-sans">
                                Loading historical database...
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Pagination Controls */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <span className="text-[11px] text-slate-500">
                        Showing page <b>{currentPage}</b> of <b>{Math.ceil(dataset.length / itemsPerPage)}</b>
                      </span>
                      <div className="flex space-x-1">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                          disabled={currentPage === 1}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-xs transition"
                        >
                          Prev
                        </button>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(Math.ceil(dataset.length / itemsPerPage), prev + 1))}
                          disabled={currentPage === Math.ceil(dataset.length / itemsPerPage)}
                          className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-xs transition"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Epic 2: Visualizations */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-6">
                    <h3 className="font-display font-semibold text-slate-900 text-md flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5 text-indigo-600" />
                      <span>Epic 2: Visualizing & Analysing Weather Distributions</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Distribution chart */}
                      <div className="border border-slate-100 rounded-xl p-4 flex flex-col space-y-2">
                        <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                          <TrendingUp className="h-3.5 w-3.5 text-indigo-600" />
                          <span>Univariate Analysis: Temperature Distribution</span>
                        </span>
                        <p className="text-[11px] text-slate-500 mb-2">
                          Matches Seaborn distplot showing frequency counts spanning 27°C to 31°C.
                        </p>
                        {/* Inline simple SVG chart mimicking distplot */}
                        <div className="h-36 w-full bg-slate-50 rounded border border-slate-200/60 flex items-end p-2 relative">
                          <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                            <path
                              d="M 5,40 Q 20,10 40,5 T 70,30 T 95,40"
                              fill="rgba(20, 184, 166, 0.15)"
                              stroke="#0d9488"
                              strokeWidth="1.5"
                            />
                            {/* Grid bars to simulate hist */}
                            <rect x="10" y="25" width="10" height="15" fill="#14b8a6" fillOpacity="0.25" stroke="#14b8a6" strokeWidth="0.5" />
                            <rect x="25" y="15" width="10" height="25" fill="#14b8a6" fillOpacity="0.25" stroke="#14b8a6" strokeWidth="0.5" />
                            <rect x="40" y="8" width="10" height="32" fill="#14b8a6" fillOpacity="0.25" stroke="#14b8a6" strokeWidth="0.5" />
                            <rect x="55" y="12" width="10" height="28" fill="#14b8a6" fillOpacity="0.25" stroke="#14b8a6" strokeWidth="0.5" />
                            <rect x="70" y="28" width="10" height="12" fill="#14b8a6" fillOpacity="0.25" stroke="#14b8a6" strokeWidth="0.5" />
                          </svg>
                          <div className="absolute bottom-1 left-2 text-[8px] font-mono text-slate-400">27°C</div>
                          <div className="absolute bottom-1 right-2 text-[8px] font-mono text-slate-400">31°C</div>
                        </div>
                      </div>

                      {/* Heatmap visualization */}
                      <div className="border border-slate-100 rounded-xl p-4 flex flex-col space-y-2">
                        <span className="text-xs font-bold text-slate-700 flex items-center space-x-1">
                          <LineChart className="h-3.5 w-3.5 text-indigo-600" />
                          <span>Multivariate Analysis: Feature Correlation</span>
                        </span>
                        <p className="text-[11px] text-slate-500 mb-2">
                          Heatmap correlating columns. June-September is highly correlated (+0.86) to overall Annual totals.
                        </p>
                        
                        {/* Correlation grid */}
                        <div className="grid grid-cols-5 gap-0.5 p-1 bg-slate-900 rounded text-center text-[9px] font-mono text-white">
                          {/* Headers */}
                          <div className="bg-slate-800 py-1 font-sans text-[7px] font-bold">Cloud</div>
                          <div className="bg-slate-800 py-1 font-sans text-[7px] font-bold">Annual</div>
                          <div className="bg-slate-800 py-1 font-sans text-[7px] font-bold">Jan-Feb</div>
                          <div className="bg-slate-800 py-1 font-sans text-[7px] font-bold">Mar-May</div>
                          <div className="bg-slate-800 py-1 font-sans text-[7px] font-bold">Jun-Sep</div>

                          {/* Row 1 */}
                          <div className="bg-teal-900 p-1">1.0</div>
                          <div className="bg-teal-950 p-1">0.05</div>
                          <div className="bg-teal-950 p-1">0.01</div>
                          <div className="bg-teal-950 p-1">0.39</div>
                          <div className="bg-teal-900 p-1 font-bold">0.86</div>

                          {/* Row 2 */}
                          <div className="bg-teal-950 p-1">0.05</div>
                          <div className="bg-teal-900 p-1">1.0</div>
                          <div className="bg-teal-950 p-1">0.03</div>
                          <div className="bg-teal-950 p-1">0.23</div>
                          <div className="bg-teal-900 p-1 font-bold">0.63</div>

                          {/* Row 3 */}
                          <div className="bg-teal-950 p-1">0.01</div>
                          <div className="bg-teal-950 p-1">0.03</div>
                          <div className="bg-teal-900 p-1">1.0</div>
                          <div className="bg-teal-950 p-1">0.14</div>
                          <div className="bg-teal-950 p-1">0.00</div>

                          {/* Row 4 */}
                          <div className="bg-teal-950 p-1">0.39</div>
                          <div className="bg-teal-950 p-1">0.23</div>
                          <div className="bg-teal-950 p-1">0.14</div>
                          <div className="bg-teal-900 p-1">1.0</div>
                          <div className="bg-teal-950 p-1">0.22</div>

                          {/* Row 5 */}
                          <div className="bg-teal-900 p-1 font-bold">0.86</div>
                          <div className="bg-teal-900 p-1 font-bold">0.63</div>
                          <div className="bg-teal-950 p-1">0.00</div>
                          <div className="bg-teal-950 p-1">0.22</div>
                          <div className="bg-teal-900 p-1">1.0</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Epic 4: Model building & comparison */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
                    <h3 className="font-display font-semibold text-slate-900 text-md flex items-center space-x-2">
                      <Cpu className="h-5 w-5 text-indigo-600" />
                      <span>Epic 4: Model Building & Evaluation Metrics Comparison</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Standard metrics collected across the validation subset. As reported, XGBoost has been chosen due to stable error boundaries and resilience to overfitting compared to single trees.
                    </p>

                    {comparisonData ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          {[
                            { name: "XGBoost (Selected)", key: "xgb", color: "border-teal-500 bg-teal-50/20" },
                            { name: "Random Forest", key: "rf", color: "border-indigo-100 hover:border-indigo-300" },
                            { name: "Decision Tree", key: "dt", color: "border-slate-100 hover:border-slate-300" },
                            { name: "KNN (K=5)", key: "knn", color: "border-slate-100 hover:border-slate-300" }
                          ].map(model => {
                            const metrics = comparisonData[model.key as keyof ComparisonData];
                            return (
                              <div key={model.key} className={`p-4 rounded-xl border flex flex-col justify-between ${model.color}`}>
                                <div>
                                  <span className="text-[10px] font-bold text-slate-500 block">MODEL CLASSIFIER</span>
                                  <h4 className="font-bold text-slate-800 text-sm mt-0.5">{model.name}</h4>
                                </div>
                                <div className="mt-4 flex items-baseline justify-between">
                                  <span className="text-xs text-slate-500">Accuracy</span>
                                  <span className="text-lg font-mono font-bold text-slate-900">
                                    {(metrics.accuracy * 100).toFixed(2)}%
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Complete confusion matrices */}
                        <div className="border border-slate-100 rounded-xl p-4">
                          <h4 className="text-xs font-bold text-slate-700 mb-3">Confusion Matrices Detail</h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                            {["xgb", "rf", "dt", "knn"].map(key => {
                              const matrix = comparisonData[key as keyof ComparisonData].confusionMatrix;
                              return (
                                <div key={key} className="bg-slate-50 p-2 rounded-lg border border-slate-200/50">
                                  <span className="text-[10px] font-mono font-semibold uppercase text-slate-500">{key.toUpperCase()}</span>
                                  <div className="grid grid-cols-2 gap-1 mt-1.5 text-[10px] font-mono text-white">
                                    <div className="bg-emerald-600 p-1.5 rounded" title="True Negatives">TN: {matrix.tn}</div>
                                    <div className="bg-rose-500/80 p-1.5 rounded" title="False Positives">FP: {matrix.fp}</div>
                                    <div className="bg-rose-500/80 p-1.5 rounded" title="False Negatives">FN: {matrix.fn}</div>
                                    <div className="bg-emerald-600 p-1.5 rounded" title="True Positives">TP: {matrix.tp}</div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="h-24 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 text-xs">
                        Loading comparison statistics...
                      </div>
                    )}
                  </div>
                </div>

                {/* Left Side: Pipeline Details & Sandboxing */}
                <div className="lg:col-span-4 flex flex-col space-y-6">
                  {/* Epic 3 Outliers & Scaling Sandbox */}
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
                    <h3 className="font-display font-semibold text-slate-900 text-md flex items-center space-x-2">
                      <Sliders className="h-5 w-5 text-indigo-600" />
                      <span>Epic 3: Pre-processing Sandbox</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Outliers are capped using Interquartile Range (IQR) capping before normalization to avoid training distortion. Type values below to see IQR boundary mapping.
                    </p>

                    <div className="space-y-4 pt-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                          Test Cloud Cover (%)
                        </label>
                        <input
                          type="number"
                          value={sandboxInputs.cloudCover}
                          onChange={e => setSandboxInputs({ ...sandboxInputs, cloudCover: e.target.value })}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                        <div className="mt-1.5 flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400">Capping Limit: 56.5%</span>
                          {(() => {
                            const val = parseFloat(sandboxInputs.cloudCover) || 0;
                            const res = capOutliers(val, 20.5, 56.5);
                            return res.capped ? (
                              <span className="text-amber-600 font-semibold">Capped to {res.value}%</span>
                            ) : (
                              <span className="text-emerald-600">Passed ({res.value}%)</span>
                            );
                          })()}
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                          Test Jan-Feb Rain (mm)
                        </label>
                        <input
                          type="number"
                          value={sandboxInputs.janFeb}
                          onChange={e => setSandboxInputs({ ...sandboxInputs, janFeb: e.target.value })}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                        />
                        <div className="mt-1.5 flex justify-between text-[10px] font-mono">
                          <span className="text-slate-400">Capping Limit: 42.5mm</span>
                          {(() => {
                            const val = parseFloat(sandboxInputs.janFeb) || 0;
                            const res = capOutliers(val, 0, 42.5);
                            return res.capped ? (
                              <span className="text-amber-600 font-semibold">Capped to {res.value}mm</span>
                            ) : (
                              <span className="text-emerald-600">Passed ({res.value}mm)</span>
                            );
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Architecture & Libraries */}
                  <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200/60 flex flex-col space-y-4">
                    <h4 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
                      Local Python Tools Applied
                    </h4>
                    <div className="space-y-3">
                      {[
                        { name: "Anaconda Navigator", desc: "Package manager and GUI desktop environment" },
                        { name: "NumPy & Pandas", desc: "Matrix operations and dataframe cleaning" },
                        { name: "Scikit-Learn", desc: "Model splitting, confusion matrix, metrics evaluation" },
                        { name: "XGBoost Classifier", desc: "Ensemble Gradient boosting champion model" },
                        { name: "StandardScaler", desc: "Mean removal and variance scaling standardizer" }
                      ].map((tool, i) => (
                        <div key={i} className="flex items-start space-x-2 text-xs">
                          <div className="h-1.5 w-1.5 bg-teal-600 rounded-full mt-1.5 flex-shrink-0" />
                          <div>
                            <span className="font-bold text-slate-800 block">{tool.name}</span>
                            <span className="text-[11px] text-slate-500 leading-tight">{tool.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "er" && (
            <motion.div
              key="er"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Text explanation */}
              <div className="lg:col-span-4 flex flex-col space-y-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    System Architecture & Database Schema
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    This Entity-Relationship (ER) model defines how the application organizes environmental parameters, user logs, prediction models, and real-time outputs.
                  </p>
                  <p className="text-xs text-slate-500">
                    It facilitates robust auditing of weather submissions, helps track predictions made under different model parameters, and keeps track of algorithm accuracy configurations.
                  </p>
                </div>

                <div className="bg-slate-100 p-5 rounded-2xl border border-slate-200/50 flex flex-col space-y-3 text-xs text-slate-600">
                  <h4 className="font-bold text-slate-800">Relationships Flow</h4>
                  <ul className="space-y-2 leading-relaxed">
                    <li>
                      <b className="text-teal-700">User → Weather Data:</b> One User can submit multiple distinct meteorological records (One-to-Many).
                    </li>
                    <li>
                      <b className="text-indigo-700">Weather Data → Prediction:</b> Each specific weather entry corresponds to exactly one prediction outcome (One-to-One).
                    </li>
                    <li>
                      <b className="text-amber-700">ML Model → Prediction:</b> A single trained model can be executed to generate multiple predictions (One-to-Many).
                    </li>
                  </ul>
                </div>
              </div>

              {/* Dynamic Interactive Schema Graph */}
              <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative min-h-[460px]">
                <h3 className="font-display font-semibold text-slate-900 mb-6 text-md flex items-center space-x-2">
                  <Grid className="h-5 w-5 text-teal-600" />
                  <span>Interactive Entity-Relationship (ER) Diagram</span>
                </h3>

                {/* Conceptual Nodes Map */}
                <div className="relative w-full h-[400px] border border-slate-100 rounded-xl bg-slate-50 overflow-auto p-4 flex flex-col md:flex-row md:items-center md:justify-around space-y-6 md:space-y-0">
                  {/* Entity 1: User */}
                  <div className="bg-white p-4 rounded-xl border border-teal-200 shadow-sm w-44 flex flex-col space-y-2 z-10">
                    <span className="text-[10px] font-mono font-bold text-teal-600 uppercase block">1. USER ENTITY</span>
                    <h4 className="font-bold text-slate-800 text-sm">User</h4>
                    <div className="text-[10px] font-mono text-slate-500 space-y-1">
                      <div>🔑 User ID <span className="text-slate-400">(PK)</span></div>
                      <div>• User Name</div>
                      <div>• Email</div>
                      <div>• Role <span className="text-slate-400">(Admin/User)</span></div>
                    </div>
                  </div>

                  {/* Entity 2: Weather Data */}
                  <div className="bg-white p-4 rounded-xl border border-indigo-200 shadow-sm w-48 flex flex-col space-y-2 z-10">
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase block">2. METEOROLOGY ENTITY</span>
                    <h4 className="font-bold text-slate-800 text-sm">Weather Data</h4>
                    <div className="text-[10px] font-mono text-slate-500 space-y-1">
                      <div>🔑 Data ID <span className="text-slate-400">(PK)</span></div>
                      <div>🔗 User ID <span className="text-slate-400">(FK)</span></div>
                      <div>• Annual Rainfall</div>
                      <div>• Cloud Cover</div>
                      <div>• Seasonal Rainfall</div>
                      <div>• Temperature</div>
                    </div>
                  </div>

                  {/* Entity 3: Prediction */}
                  <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-sm w-48 flex flex-col space-y-2 z-10">
                    <span className="text-[10px] font-mono font-bold text-amber-600 uppercase block">3. FORECAST ENTITY</span>
                    <h4 className="font-bold text-slate-800 text-sm">Prediction</h4>
                    <div className="text-[10px] font-mono text-slate-500 space-y-1">
                      <div>🔑 Prediction ID <span className="text-slate-400">(PK)</span></div>
                      <div>🔗 Data ID <span className="text-slate-400">(FK)</span></div>
                      <div>🔗 Model ID <span className="text-slate-400">(FK)</span></div>
                      <div>• Result <span className="text-slate-400">(Chance/No)</span></div>
                      <div>• Probability (%)</div>
                      <div>• Timestamp</div>
                    </div>
                  </div>

                  {/* Entity 4: ML Model */}
                  <div className="bg-white p-4 rounded-xl border border-purple-200 shadow-sm w-48 flex flex-col space-y-2 z-10">
                    <span className="text-[10px] font-mono font-bold text-purple-600 uppercase block">4. ALGORITHM ENTITY</span>
                    <h4 className="font-bold text-slate-800 text-sm">ML Model</h4>
                    <div className="text-[10px] font-mono text-slate-500 space-y-1">
                      <div>🔑 Model ID <span className="text-slate-400">(PK)</span></div>
                      <div>• Model Name</div>
                      <div>• Algorithm Type</div>
                      <div>• Validation Accuracy</div>
                      <div>• Model File <span className="text-slate-400">(.save)</span></div>
                    </div>
                  </div>

                  {/* Connector lines overlays using pure CSS absolute positions or SVG background (simplest way is a brief descriptive schematic) */}
                  <div className="absolute inset-0 pointer-events-none hidden md:block">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                      {/* User to Weather: One to Many */}
                      <path d="M 180 200 L 210 200" stroke="#0d9488" strokeWidth="1.5" strokeDasharray="3 3" />
                      {/* Weather to Prediction: One to One */}
                      <path d="M 400 200 L 430 200" stroke="#4f46e5" strokeWidth="1.5" />
                      {/* Model to Prediction: One to Many */}
                      <path d="M 640 200 L 610 200" stroke="#9333ea" strokeWidth="1.5" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-4xl mx-auto flex flex-col space-y-8"
            >
              {/* Introduction header block */}
              <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-4">
                <span className="text-xs font-mono font-bold text-teal-600 tracking-wider uppercase">
                  Rising Waters Initiative
                </span>
                <h1 className="font-display font-bold text-3xl tracking-tight text-slate-900">
                  Data-Driven Flood Forecasting for Climate Resilience
                </h1>
                <p className="text-slate-600 leading-relaxed">
                  As factors like rapid urbanization, unpredictability of monsoons, and climate change drive increasingly frequent and severe flood threats, proactive disaster prevention becomes critical. Early warning mechanisms save human lives, secure livelihoods, and avoid millions in infrastructure losses.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  The **Rising Waters** platform demonstrates how advanced ensemble classifiers, such as XGBoost and Random Forests, can predict flood risks using straightforward meteorological metrics. Trained on historical rainfall, temperature, and cloud cover metrics, the system scales, caps, and computes predictions with high precision, mapping outcomes to clear explanations.
                </p>
              </div>

              {/* Grid cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-3">
                  <div className="bg-teal-50 text-teal-700 p-2 rounded-xl w-fit">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-800 text-base">Monsoonal Risk Mitigation</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    By pinpointing risks during the June-September peak monsoon period, government bodies and local authorities can optimize drainage gates, prepare evacuation corridors, and deploy response personnel in advance.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col space-y-3">
                  <div className="bg-indigo-50 text-indigo-700 p-2 rounded-xl w-fit">
                    <Database className="h-5 w-5" />
                  </div>
                  <h3 className="font-display font-semibold text-slate-800 text-base">Mathematical Transparency</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Rather than operating as opaque black boxes, our workspace illustrates exactly how StandardScaler centers data (zero mean, unit variance) and outlines the Decision boundaries used by tree ensembles.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Page Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs">
          <span>© 2026 Rising Waters. Compiled under meteorological standard guidelines.</span>
          <span className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Powered by</span>
            <span className="font-semibold text-teal-600">Google AI Studio</span>
          </span>
        </div>
      </footer>
    </div>
  );
}
