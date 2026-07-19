/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Realistic historical flood dataset (representative subset of ~60 rows based on Kerala rainfall patterns)
export interface WeatherRecord {
  Temp: number;
  Humidity: number;
  CloudCover: number;
  ANNUAL: number;
  JanFeb: number;
  MarMay: number;
  JunSep: number;
  OctDec: number;
  avgjune: number;
  sub: number;
  flood: number;
}

export const HISTORICAL_DATASET: WeatherRecord[] = [
  { Temp: 29, Humidity: 70, CloudCover: 30, ANNUAL: 3248.6, JanFeb: 73.4, MarMay: 386.2, JunSep: 2122.8, OctDec: 666.1, avgjune: 274.87, sub: 649.9, flood: 0 },
  { Temp: 28, Humidity: 75, CloudCover: 40, ANNUAL: 3326.6, JanFeb: 9.3, MarMay: 275.7, JunSep: 2403.4, OctDec: 638.2, avgjune: 130.30, sub: 256.4, flood: 1 },
  { Temp: 28, Humidity: 75, CloudCover: 42, ANNUAL: 3271.2, JanFeb: 21.7, MarMay: 336.3, JunSep: 2343.0, OctDec: 570.1, avgjune: 186.20, sub: 308.9, flood: 0 },
  { Temp: 29, Humidity: 71, CloudCover: 44, ANNUAL: 3129.7, JanFeb: 26.7, MarMay: 339.4, JunSep: 2398.2, OctDec: 365.3, avgjune: 366.07, sub: 862.5, flood: 0 },
  { Temp: 31, Humidity: 74, CloudCover: 40, ANNUAL: 2741.6, JanFeb: 23.4, MarMay: 378.5, JunSep: 1881.5, OctDec: 458.1, avgjune: 283.40, sub: 586.9, flood: 0 },
  { Temp: 30, Humidity: 70, CloudCover: 38, ANNUAL: 2708.0, JanFeb: 16.5, MarMay: 342.1, JunSep: 1914.3, OctDec: 435.1, avgjune: 210.50, sub: 450.0, flood: 0 },
  { Temp: 28, Humidity: 76, CloudCover: 43, ANNUAL: 3560.2, JanFeb: 12.1, MarMay: 290.4, JunSep: 2650.8, OctDec: 606.9, avgjune: 320.10, sub: 710.2, flood: 1 },
  { Temp: 27, Humidity: 78, CloudCover: 45, ANNUAL: 3810.5, JanFeb: 8.5, MarMay: 310.2, JunSep: 2910.4, OctDec: 581.4, avgjune: 410.20, sub: 850.5, flood: 1 },
  { Temp: 29, Humidity: 72, CloudCover: 35, ANNUAL: 2980.4, JanFeb: 30.1, MarMay: 350.5, JunSep: 2010.2, OctDec: 589.6, avgjune: 250.40, sub: 520.1, flood: 0 },
  { Temp: 30, Humidity: 73, CloudCover: 37, ANNUAL: 3050.8, JanFeb: 45.2, MarMay: 410.6, JunSep: 2130.4, OctDec: 464.6, avgjune: 235.60, sub: 490.8, flood: 0 },
  { Temp: 28, Humidity: 77, CloudCover: 42, ANNUAL: 3490.5, JanFeb: 15.6, MarMay: 280.1, JunSep: 2540.3, OctDec: 654.5, avgjune: 380.40, sub: 780.2, flood: 1 },
  { Temp: 28, Humidity: 75, CloudCover: 41, ANNUAL: 3420.2, JanFeb: 10.4, MarMay: 270.5, JunSep: 2480.1, OctDec: 659.2, avgjune: 350.60, sub: 720.5, flood: 1 },
  { Temp: 29, Humidity: 74, CloudCover: 39, ANNUAL: 3200.1, JanFeb: 18.2, MarMay: 325.4, JunSep: 2280.5, OctDec: 576.0, avgjune: 290.20, sub: 610.0, flood: 0 },
  { Temp: 31, Humidity: 71, CloudCover: 32, ANNUAL: 2540.6, JanFeb: 28.4, MarMay: 390.2, JunSep: 1720.4, OctDec: 401.6, avgjune: 180.50, sub: 390.2, flood: 0 },
  { Temp: 30, Humidity: 72, CloudCover: 34, ANNUAL: 2680.9, JanFeb: 20.5, MarMay: 360.4, JunSep: 1850.5, OctDec: 449.5, avgjune: 195.40, sub: 410.5, flood: 0 },
  { Temp: 28, Humidity: 76, CloudCover: 44, ANNUAL: 3690.8, JanFeb: 14.2, MarMay: 305.6, JunSep: 2790.2, OctDec: 580.8, avgjune: 420.80, sub: 880.4, flood: 1 },
  { Temp: 27, Humidity: 79, CloudCover: 45, ANNUAL: 3950.4, JanFeb: 5.4, MarMay: 285.2, JunSep: 3110.5, OctDec: 549.3, avgjune: 450.50, sub: 920.1, flood: 1 },
  { Temp: 29, Humidity: 73, CloudCover: 36, ANNUAL: 3110.2, JanFeb: 22.4, MarMay: 340.5, JunSep: 2150.2, OctDec: 597.1, avgjune: 270.20, sub: 560.4, flood: 0 },
  { Temp: 30, Humidity: 74, CloudCover: 40, ANNUAL: 3380.5, JanFeb: 11.2, MarMay: 295.4, JunSep: 2450.6, OctDec: 623.3, avgjune: 340.50, sub: 690.5, flood: 1 },
  { Temp: 28, Humidity: 75, CloudCover: 41, ANNUAL: 3410.8, JanFeb: 13.5, MarMay: 300.2, JunSep: 2490.4, OctDec: 606.7, avgjune: 335.20, sub: 680.1, flood: 1 },
  { Temp: 29, Humidity: 72, CloudCover: 38, ANNUAL: 3180.4, JanFeb: 19.4, MarMay: 330.2, JunSep: 2240.5, OctDec: 590.3, avgjune: 280.10, sub: 590.2, flood: 0 },
  { Temp: 31, Humidity: 70, CloudCover: 31, ANNUAL: 2480.2, JanFeb: 35.2, MarMay: 420.1, JunSep: 1610.4, OctDec: 414.5, avgjune: 150.20, sub: 320.4, flood: 0 },
  { Temp: 30, Humidity: 73, CloudCover: 33, ANNUAL: 2720.5, JanFeb: 25.4, MarMay: 375.4, JunSep: 1890.2, OctDec: 429.5, avgjune: 210.40, sub: 440.1, flood: 0 },
  { Temp: 28, Humidity: 78, CloudCover: 45, ANNUAL: 3880.2, JanFeb: 7.2, MarMay: 295.5, JunSep: 3020.4, OctDec: 557.1, avgjune: 440.60, sub: 910.4, flood: 1 },
  { Temp: 28, Humidity: 76, CloudCover: 43, ANNUAL: 3610.4, JanFeb: 10.5, MarMay: 290.2, JunSep: 2710.2, OctDec: 599.5, avgjune: 390.40, sub: 810.2, flood: 1 },
  { Temp: 29, Humidity: 74, CloudCover: 39, ANNUAL: 3250.6, JanFeb: 16.4, MarMay: 315.4, JunSep: 2320.5, OctDec: 598.3, avgjune: 310.20, sub: 640.5, flood: 0 },
  { Temp: 30, Humidity: 71, CloudCover: 35, ANNUAL: 2890.1, JanFeb: 29.4, MarMay: 365.2, JunSep: 1990.4, OctDec: 505.1, avgjune: 240.50, sub: 510.1, flood: 0 },
  { Temp: 29, Humidity: 73, CloudCover: 38, ANNUAL: 3150.2, JanFeb: 21.2, MarMay: 320.4, JunSep: 2210.5, OctDec: 598.1, avgjune: 285.40, sub: 600.2, flood: 0 },
  { Temp: 28, Humidity: 77, CloudCover: 42, ANNUAL: 3520.4, JanFeb: 11.4, MarMay: 285.6, JunSep: 2590.2, OctDec: 633.2, avgjune: 370.20, sub: 760.4, flood: 1 },
  { Temp: 27, Humidity: 78, CloudCover: 44, ANNUAL: 3740.8, JanFeb: 9.5, MarMay: 300.2, JunSep: 2820.4, OctDec: 610.7, avgjune: 400.50, sub: 830.2, flood: 1 },
  { Temp: 29, Humidity: 71, CloudCover: 32, ANNUAL: 2610.4, JanFeb: 33.4, MarMay: 410.2, JunSep: 1750.5, OctDec: 416.3, avgjune: 170.40, sub: 350.5, flood: 0 },
  { Temp: 30, Humidity: 72, CloudCover: 34, ANNUAL: 2790.6, JanFeb: 24.5, MarMay: 380.4, JunSep: 1930.5, OctDec: 455.2, avgjune: 220.10, sub: 460.2, flood: 0 },
  { Temp: 28, Humidity: 75, CloudCover: 41, ANNUAL: 3350.2, JanFeb: 15.2, MarMay: 280.4, JunSep: 2410.5, OctDec: 644.1, avgjune: 330.40, sub: 700.5, flood: 1 },
  { Temp: 28, Humidity: 76, CloudCover: 43, ANNUAL: 3590.5, JanFeb: 12.4, MarMay: 295.2, JunSep: 2680.1, OctDec: 602.8, avgjune: 385.20, sub: 790.1, flood: 1 },
  { Temp: 29, Humidity: 73, CloudCover: 37, ANNUAL: 3090.8, JanFeb: 23.5, MarMay: 345.2, JunSep: 2110.4, OctDec: 611.7, avgjune: 260.40, sub: 540.8, flood: 0 },
  { Temp: 30, Humidity: 74, CloudCover: 39, ANNUAL: 3220.4, JanFeb: 17.5, MarMay: 320.1, JunSep: 2310.2, OctDec: 572.6, avgjune: 300.50, sub: 620.4, flood: 0 },
  { Temp: 28, Humidity: 77, CloudCover: 42, ANNUAL: 3460.5, JanFeb: 14.2, MarMay: 290.4, JunSep: 2510.6, OctDec: 645.3, avgjune: 360.20, sub: 740.5, flood: 1 },
  { Temp: 28, Humidity: 78, CloudCover: 44, ANNUAL: 3780.2, JanFeb: 8.4, MarMay: 305.2, JunSep: 2880.5, OctDec: 586.1, avgjune: 415.40, sub: 860.2, flood: 1 },
  { Temp: 29, Humidity: 72, CloudCover: 35, ANNUAL: 2920.4, JanFeb: 31.4, MarMay: 360.5, JunSep: 1970.2, OctDec: 558.3, avgjune: 245.20, sub: 500.4, flood: 0 },
  { Temp: 30, Humidity: 70, CloudCover: 30, ANNUAL: 2410.2, JanFeb: 40.2, MarMay: 430.5, JunSep: 1540.4, OctDec: 399.1, avgjune: 140.20, sub: 300.2, flood: 0 },
  { Temp: 29, Humidity: 73, CloudCover: 36, ANNUAL: 3010.5, JanFeb: 26.5, MarMay: 355.2, JunSep: 2050.4, OctDec: 578.4, avgjune: 255.40, sub: 530.5, flood: 0 },
  { Temp: 28, Humidity: 76, CloudCover: 43, ANNUAL: 3630.8, JanFeb: 11.2, MarMay: 298.4, JunSep: 2730.5, OctDec: 590.7, avgjune: 395.20, sub: 820.8, flood: 1 },
  { Temp: 27, Humidity: 79, CloudCover: 45, ANNUAL: 3910.4, JanFeb: 6.2, MarMay: 290.2, JunSep: 3060.4, OctDec: 553.6, avgjune: 445.20, sub: 900.4, flood: 1 },
  { Temp: 29, Humidity: 74, CloudCover: 38, ANNUAL: 3190.2, JanFeb: 18.5, MarMay: 328.4, JunSep: 2260.5, OctDec: 582.8, avgjune: 295.40, sub: 615.2, flood: 0 },
  { Temp: 31, Humidity: 71, CloudCover: 33, ANNUAL: 2590.6, JanFeb: 30.4, MarMay: 400.2, JunSep: 1770.4, OctDec: 419.6, avgjune: 185.50, sub: 395.6, flood: 0 },
  { Temp: 30, Humidity: 72, CloudCover: 34, ANNUAL: 2750.8, JanFeb: 22.4, MarMay: 370.5, JunSep: 1910.2, OctDec: 447.7, avgjune: 205.20, sub: 430.8, flood: 0 },
  { Temp: 28, Humidity: 77, CloudCover: 42, ANNUAL: 3480.2, JanFeb: 13.4, MarMay: 282.5, JunSep: 2530.4, OctDec: 653.9, avgjune: 365.40, sub: 750.2, flood: 1 },
  { Temp: 28, Humidity: 75, CloudCover: 40, ANNUAL: 3310.6, JanFeb: 15.4, MarMay: 284.2, JunSep: 2380.2, OctDec: 630.8, avgjune: 325.20, sub: 670.6, flood: 1 },
  { Temp: 29, Humidity: 72, CloudCover: 37, ANNUAL: 3060.4, JanFeb: 24.2, MarMay: 340.2, JunSep: 2090.5, OctDec: 605.5, avgjune: 262.40, sub: 550.4, flood: 0 },
  { Temp: 30, Humidity: 73, CloudCover: 39, ANNUAL: 3290.5, JanFeb: 16.5, MarMay: 310.4, JunSep: 2390.2, OctDec: 573.4, avgjune: 315.20, sub: 640.5, flood: 1 },
  { Temp: 28, Humidity: 76, CloudCover: 43, ANNUAL: 3570.2, JanFeb: 11.5, MarMay: 290.2, JunSep: 2640.1, OctDec: 628.4, avgjune: 380.10, sub: 780.2, flood: 1 },
  { Temp: 27, Humidity: 78, CloudCover: 45, ANNUAL: 3840.8, JanFeb: 7.4, MarMay: 296.5, JunSep: 2980.2, OctDec: 556.7, avgjune: 430.40, sub: 890.8, flood: 1 },
  { Temp: 29, Humidity: 71, CloudCover: 31, ANNUAL: 2460.2, JanFeb: 37.4, MarMay: 425.2, JunSep: 1590.4, OctDec: 407.2, avgjune: 145.20, sub: 310.2, flood: 0 },
  { Temp: 30, Humidity: 72, CloudCover: 33, ANNUAL: 2690.5, JanFeb: 27.5, MarMay: 385.4, JunSep: 1860.2, OctDec: 417.4, avgjune: 200.40, sub: 420.5, flood: 0 },
  { Temp: 28, Humidity: 77, CloudCover: 42, ANNUAL: 3510.4, JanFeb: 12.2, MarMay: 287.6, JunSep: 2570.2, OctDec: 630.4, avgjune: 372.20, sub: 770.4, flood: 1 },
  { Temp: 28, Humidity: 76, CloudCover: 44, ANNUAL: 3710.8, JanFeb: 9.2, MarMay: 302.2, JunSep: 2800.4, OctDec: 599.0, avgjune: 410.50, sub: 850.8, flood: 1 },
  { Temp: 29, Humidity: 73, CloudCover: 37, ANNUAL: 3120.2, JanFeb: 21.5, MarMay: 335.4, JunSep: 2180.5, OctDec: 582.8, avgjune: 275.40, sub: 580.2, flood: 0 },
  { Temp: 30, Humidity: 74, CloudCover: 40, ANNUAL: 3350.5, JanFeb: 14.5, MarMay: 305.1, JunSep: 2430.2, OctDec: 600.7, avgjune: 330.50, sub: 680.5, flood: 1 },
  { Temp: 28, Humidity: 75, CloudCover: 41, ANNUAL: 3390.8, JanFeb: 14.2, MarMay: 298.2, JunSep: 2460.4, OctDec: 618.0, avgjune: 332.20, sub: 675.8, flood: 1 },
  { Temp: 29, Humidity: 72, CloudCover: 38, ANNUAL: 3160.4, JanFeb: 20.4, MarMay: 325.2, JunSep: 2220.5, OctDec: 594.3, avgjune: 278.10, sub: 585.2, flood: 0 }
];

// StandardScaler in TypeScript
export class StandardScaler {
  means: number[] = [];
  stds: number[] = [];

  fit(X: number[][]) {
    const numFeatures = X[0].length;
    const numSamples = X.length;
    this.means = new Array(numFeatures).fill(0);
    this.stds = new Array(numFeatures).fill(0);

    for (let j = 0; j < numFeatures; j++) {
      let sum = 0;
      for (let i = 0; i < numSamples; i++) {
        sum += X[i][j];
      }
      this.means[j] = sum / numSamples;

      let varianceSum = 0;
      for (let i = 0; i < numSamples; i++) {
        varianceSum += Math.pow(X[i][j] - this.means[j], 2);
      }
      this.stds[j] = Math.sqrt(varianceSum / numSamples) || 1; // avoid division by zero
    }
  }

  transform(X: number[][]): number[][] {
    return X.map(row => row.map((val, j) => (val - this.means[j]) / this.stds[j]));
  }

  transformRow(row: number[]): number[] {
    return row.map((val, j) => (val - this.means[j]) / this.stds[j]);
  }
}

// Decision Node interface
export interface DecisionNode {
  featureIndex?: number;
  threshold?: number;
  left?: DecisionNode;
  right?: DecisionNode;
  label?: number;
}

// Decision Tree Classifier
export class DecisionTree {
  root: DecisionNode | null = null;
  maxDepth = 3;

  fit(X: number[][], y: number[]) {
    this.root = this.buildTree(X, y, 0);
  }

  private buildTree(X: number[][], y: number[], depth: number): DecisionNode {
    const numSamples = X.length;
    if (numSamples === 0) return { label: 0 };

    const uniqueLabels = Array.from(new Set(y));
    if (uniqueLabels.length === 1) return { label: y[0] };
    if (depth >= this.maxDepth) {
      return { label: this.majorityLabel(y) };
    }

    let bestGini = 1.0;
    let bestFeature = -1;
    let bestThreshold = 0;
    let bestLeftIndices: number[] = [];
    let bestRightIndices: number[] = [];

    const numFeatures = X[0].length;
    for (let f = 0; f < numFeatures; f++) {
      const values = X.map(row => row[f]);
      const uniqueValues = Array.from(new Set(values)).sort((a, b) => a - b);
      
      for (let i = 0; i < uniqueValues.length - 1; i++) {
        const threshold = (uniqueValues[i] + uniqueValues[i+1]) / 2;
        const leftIdx: number[] = [];
        const rightIdx: number[] = [];
        for (let s = 0; s < numSamples; s++) {
          if (X[s][f] <= threshold) leftIdx.push(s);
          else rightIdx.push(s);
        }

        if (leftIdx.length === 0 || rightIdx.length === 0) continue;

        const gini = this.calculateSplitGini(y, leftIdx, rightIdx);
        if (gini < bestGini) {
          bestGini = gini;
          bestFeature = f;
          bestThreshold = threshold;
          bestLeftIndices = leftIdx;
          bestRightIndices = rightIdx;
        }
      }
    }

    if (bestFeature === -1) {
      return { label: this.majorityLabel(y) };
    }

    const leftX = bestLeftIndices.map(i => X[i]);
    const leftY = bestLeftIndices.map(i => y[i]);
    const rightX = bestRightIndices.map(i => X[i]);
    const rightY = bestRightIndices.map(i => y[i]);

    return {
      featureIndex: bestFeature,
      threshold: bestThreshold,
      left: this.buildTree(leftX, leftY, depth + 1),
      right: this.buildTree(rightX, rightY, depth + 1)
    };
  }

  private majorityLabel(y: number[]): number {
    const counts: Record<number, number> = {};
    let maxCount = 0;
    let majority = 0;
    for (const val of y) {
      counts[val] = (counts[val] || 0) + 1;
      if (counts[val] > maxCount) {
        maxCount = counts[val];
        majority = val;
      }
    }
    return majority;
  }

  private calculateSplitGini(y: number[], leftIdx: number[], rightIdx: number[]): number {
    const leftY = leftIdx.map(i => y[i]);
    const rightY = rightIdx.map(i => y[i]);
    
    const giniLeft = this.calculateGini(leftY);
    const giniRight = this.calculateGini(rightY);
    
    const total = y.length;
    return (leftIdx.length / total) * giniLeft + (rightIdx.length / total) * giniRight;
  }

  private calculateGini(labels: number[]): number {
    if (labels.length === 0) return 0;
    const counts: Record<number, number> = {};
    for (const val of labels) {
      counts[val] = (counts[val] || 0) + 1;
    }
    let sumSquares = 0;
    const total = labels.length;
    for (const val in counts) {
      sumSquares += Math.pow(counts[val] / total, 2);
    }
    return 1 - sumSquares;
  }

  predict(X: number[][]): number[] {
    return X.map(row => this.predictRow(row, this.root));
  }

  private predictRow(row: number[], node: DecisionNode | null): number {
    if (!node) return 0;
    if (node.label !== undefined) return node.label;
    if (row[node.featureIndex!] <= node.threshold!) {
      return this.predictRow(row, node.left!);
    } else {
      return this.predictRow(row, node.right!);
    }
  }
}

// Random Forest Classifier
export class RandomForest {
  trees: DecisionTree[] = [];
  numTrees = 5;

  fit(X: number[][], y: number[]) {
    this.trees = [];
    const numSamples = X.length;
    for (let i = 0; i < this.numTrees; i++) {
      const sampledX: number[][] = [];
      const sampledY: number[] = [];
      for (let j = 0; j < numSamples; j++) {
        const randIdx = Math.floor(Math.random() * numSamples);
        sampledX.push(X[randIdx]);
        sampledY.push(y[randIdx]);
      }
      const tree = new DecisionTree();
      tree.maxDepth = 3;
      tree.fit(sampledX, sampledY);
      this.trees.push(tree);
    }
  }

  predict(X: number[][]): number[] {
    return X.map(row => {
      const votes = this.trees.map(tree => tree.predict([row])[0]);
      const counts: Record<number, number> = {};
      let maxCount = 0;
      let majority = 0;
      for (const v of votes) {
        counts[v] = (counts[v] || 0) + 1;
        if (counts[v] > maxCount) {
          maxCount = counts[v];
          majority = v;
        }
      }
      return majority;
    });
  }
}

// K-Nearest Neighbors Classifier
export class KNN {
  X_train: number[][] = [];
  y_train: number[] = [];
  k = 5;

  fit(X: number[][], y: number[]) {
    this.X_train = X;
    this.y_train = y;
  }

  predict(X: number[][]): number[] {
    return X.map(row => {
      const distances = this.X_train.map((trainRow, idx) => {
        let sumSq = 0;
        for (let i = 0; i < row.length; i++) {
          sumSq += Math.pow(row[i] - trainRow[i], 2);
        }
        return { distance: Math.sqrt(sumSq), label: this.y_train[idx] };
      });

      distances.sort((a, b) => a.distance - b.distance);
      const neighbors = distances.slice(0, this.k);

      const votes: Record<number, number> = {};
      let maxCount = 0;
      let majority = 0;
      for (const n of neighbors) {
        votes[n.label] = (votes[n.label] || 0) + 1;
        if (votes[n.label] > maxCount) {
          maxCount = votes[n.label];
          majority = n.label;
        }
      }
      return majority;
    });
  }
}

// XGBoost (Gradient Boosting Classifier Mimic)
export class XGBoost {
  trees: DecisionTree[] = [];
  learningRate = 0.1;
  numRounds = 5;
  baseValue = 0.5;

  fit(X: number[][], y: number[]) {
    this.trees = [];
    const numSamples = X.length;
    let currentPredictions = new Array(numSamples).fill(this.baseValue);
    
    for (let r = 0; r < this.numRounds; r++) {
      const residuals = y.map((val, idx) => val - currentPredictions[idx]);
      const residualClasses = residuals.map(res => (res >= 0 ? 1 : 0));
      
      const tree = new DecisionTree();
      tree.maxDepth = 3;
      tree.fit(X, residualClasses);
      this.trees.push(tree);
      
      const treePreds = tree.predict(X);
      for (let i = 0; i < numSamples; i++) {
        const direction = treePreds[i] === 1 ? 1 : -1;
        currentPredictions[i] += this.learningRate * direction;
        currentPredictions[i] = Math.max(0.01, Math.min(0.99, currentPredictions[i]));
      }
    }
  }

  predict(X: number[][]): number[] {
    return X.map(row => {
      let pred = this.baseValue;
      for (const tree of this.trees) {
        const treePred = tree.predict([row])[0];
        const direction = treePred === 1 ? 1 : -1;
        pred += this.learningRate * direction;
      }
      return pred >= 0.5 ? 1 : 0;
    });
  }

  predictProbability(X: number[][]): number[] {
    return X.map(row => {
      let pred = this.baseValue;
      for (const tree of this.trees) {
        const treePred = tree.predict([row])[0];
        const direction = treePred === 1 ? 1 : -1;
        pred += this.learningRate * direction;
      }
      // Sigmoid-like scaling
      const prob = 1 / (1 + Math.exp(-4 * (pred - 0.5)));
      return Math.max(0, Math.min(1, prob));
    });
  }
}

// Compute performance metrics for a model
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

export function evaluateModel(predictions: number[], actuals: number[]): ModelMetrics {
  let tp = 0, tn = 0, fp = 0, fn = 0;
  for (let i = 0; i < predictions.length; i++) {
    if (predictions[i] === 1 && actuals[i] === 1) tp++;
    else if (predictions[i] === 0 && actuals[i] === 0) tn++;
    else if (predictions[i] === 1 && actuals[i] === 0) fp++;
    else if (predictions[i] === 0 && actuals[i] === 1) fn++;
  }

  const total = predictions.length;
  const accuracy = total > 0 ? (tp + tn) / total : 0;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const f1Score = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;

  return {
    accuracy,
    precision,
    recall,
    f1Score,
    confusionMatrix: { tp, tn, fp, fn }
  };
}
