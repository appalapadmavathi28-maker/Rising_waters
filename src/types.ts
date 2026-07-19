/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type TabType = "predictor" | "workspace" | "er" | "about";

export interface WeatherInputs {
  cloudCover: string;
  annual: string;
  janFeb: string;
  marMay: string;
  junSep: string;
  modelType: string;
}

export interface PredictionResult {
  prediction: number;
  probability: number;
  explanation: string;
  inputs: {
    cloudCover: number;
    annual: number;
    janFeb: number;
    marMay: number;
    junSep: number;
  };
  scaledInputs: number[];
  modelUsed: string;
}

export interface ModelMetrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  confusionMatrix: {
    tp: number;
    tn: number;
    fp: number;
    fn: number;
  };
}

export interface ComparisonData {
  dt: ModelMetrics;
  rf: ModelMetrics;
  knn: ModelMetrics;
  xgb: ModelMetrics;
}
