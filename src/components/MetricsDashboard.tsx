import React, { useEffect, useRef, useState } from 'react';
import { BarChart3, TrendingUp, Target, Clock } from 'lucide-react';

// Mock metrics data (in a real implementation, this would come from /public/data/metrics.json)
const mockMetrics = {
  accuracies: {
    knn: 0.891,
    random_forest: 0.936
  },
  roc: {
    knn: {
      fpr: [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1.0],
      tpr: [0, 0.3, 0.6, 0.8, 0.9, 0.95, 1.0]
    },
    random_forest: {
      fpr: [0, 0.05, 0.1, 0.2, 0.4, 0.7, 1.0],
      tpr: [0, 0.4, 0.7, 0.85, 0.93, 0.97, 1.0]
    }
  },
  confusion: {
    knn: [[245, 12], [18, 225]],
    random_forest: [[251, 6], [10, 233]]
  },
  feature_importance: {
    random_forest: [
      { feature: 'url_length', importance: 0.18 },
      { feature: 'has_suspicious_words', importance: 0.16 },
      { feature: 'num_special_chars', importance: 0.14 },
      { feature: 'num_subdomains', importance: 0.12 },
      { feature: 'has_https', importance: 0.10 },
      { feature: 'has_ip', importance: 0.08 },
      { feature: 'tld_length', importance: 0.07 },
      { feature: 'num_digits', importance: 0.06 }
    ]
  },
  latency_samples: [45, 52, 48, 61, 39, 55, 43, 58, 46, 50, 53, 47, 59, 42, 56]
};

const MetricsDashboard = () => {
  const rocCanvasRef = useRef<HTMLCanvasElement>(null);
  const confusionCanvasRef = useRef<HTMLCanvasElement>(null);
  const featureCanvasRef = useRef<HTMLCanvasElement>(null);
  const latencyCanvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedModel, setSelectedModel] = useState<'knn' | 'random_forest'>('random_forest');

  useEffect(() => {
    // Initialize charts when component mounts
    initializeCharts();
  }, [selectedModel]);

  const initializeCharts = () => {
    drawROCCurve();
    drawConfusionMatrix();
    drawFeatureImportance();
    drawLatencyHistogram();
  };

  const drawROCCurve = () => {
    const canvas = rocCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#F5F5DC';
    ctx.fillRect(0, 0, width, height);

    // Draw axes
    ctx.strokeStyle = '#36454F';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(padding, padding);
    ctx.stroke();

    // Draw diagonal line (random classifier)
    ctx.strokeStyle = '#cccccc';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(padding, height - padding);
    ctx.lineTo(width - padding, padding);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw ROC curves
    const models: Array<{ key: 'knn' | 'random_forest'; color: string; name: string }> = [
      { key: 'knn', color: '#4CAF50', name: 'KNN' },
      { key: 'random_forest', color: '#4682B4', name: 'Random Forest' }
    ];

    models.forEach(model => {
      const data = mockMetrics.roc[model.key];
      ctx.strokeStyle = model.color;
      ctx.lineWidth = 3;
      ctx.beginPath();

      data.fpr.forEach((fpr, i) => {
        const x = padding + (fpr * (width - 2 * padding));
        const y = height - padding - (data.tpr[i] * (height - 2 * padding));
        
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    });

    // Add labels
    ctx.fillStyle = '#36454F';
    ctx.font = '14px Lato';
    ctx.textAlign = 'center';
    ctx.fillText('False Positive Rate', width / 2, height - 20);
    
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('True Positive Rate', 0, 0);
    ctx.restore();

    // Add title
    ctx.font = 'bold 16px Montserrat';
    ctx.fillText('ROC Curve Comparison', width / 2, 30);
  };

  const drawConfusionMatrix = () => {
    const canvas = confusionCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const matrix = mockMetrics.confusion[selectedModel];
    
    ctx.clearRect(0, 0, width, height);
    
    const cellSize = Math.min(width, height) / 3;
    const startX = (width - cellSize * 2) / 2;
    const startY = (height - cellSize * 2) / 2;

    // Draw matrix cells
    const maxVal = Math.max(...matrix.flat());
    
    matrix.forEach((row, i) => {
      row.forEach((val, j) => {
        const intensity = val / maxVal;
        const color = i === j ? 
          `rgba(76, 175, 80, ${0.3 + intensity * 0.7})` : // Green for correct predictions
          `rgba(198, 40, 40, ${0.3 + intensity * 0.7})`;   // Red for incorrect predictions
        
        const x = startX + j * cellSize;
        const y = startY + i * cellSize;
        
        ctx.fillStyle = color;
        ctx.fillRect(x, y, cellSize, cellSize);
        
        ctx.strokeStyle = '#36454F';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, cellSize, cellSize);
        
        // Add text
        ctx.fillStyle = '#36454F';
        ctx.font = 'bold 24px Montserrat';
        ctx.textAlign = 'center';
        ctx.fillText(val.toString(), x + cellSize/2, y + cellSize/2 + 8);
      });
    });

    // Add labels
    ctx.font = '14px Lato';
    const labels = ['Benign', 'Malicious'];
    
    // Predicted labels (top)
    labels.forEach((label, i) => {
      ctx.fillText(label, startX + cellSize/2 + i * cellSize, startY - 20);
    });
    
    // Actual labels (left)
    labels.forEach((label, i) => {
      ctx.save();
      ctx.translate(startX - 30, startY + cellSize/2 + i * cellSize);
      ctx.rotate(-Math.PI/2);
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });

    // Title
    ctx.font = 'bold 16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText(`Confusion Matrix - ${selectedModel.toUpperCase()}`, width / 2, 30);
  };

  const drawFeatureImportance = () => {
    const canvas = featureCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 80;
    
    ctx.clearRect(0, 0, width, height);
    
    const features = mockMetrics.feature_importance.random_forest;
    const maxImportance = Math.max(...features.map(f => f.importance));
    const barHeight = (height - 2 * padding) / features.length;

    features.forEach((feature, i) => {
      const barWidth = (feature.importance / maxImportance) * (width - 2 * padding);
      const y = padding + i * barHeight;
      
      // Draw bar
      ctx.fillStyle = '#4682B4';
      ctx.fillRect(padding, y + barHeight * 0.2, barWidth, barHeight * 0.6);
      
      // Draw feature name
      ctx.fillStyle = '#36454F';
      ctx.font = '12px Lato';
      ctx.textAlign = 'right';
      ctx.fillText(feature.feature.replace(/_/g, ' '), padding - 10, y + barHeight * 0.6);
      
      // Draw importance value
      ctx.textAlign = 'left';
      ctx.fillText((feature.importance * 100).toFixed(1) + '%', 
        padding + barWidth + 10, y + barHeight * 0.6);
    });

    // Title
    ctx.font = 'bold 16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('Feature Importance (Random Forest)', width / 2, 30);
  };

  const drawLatencyHistogram = () => {
    const canvas = latencyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const padding = 60;
    
    ctx.clearRect(0, 0, width, height);
    
    const samples = mockMetrics.latency_samples;
    const bins = 8;
    const minVal = Math.min(...samples);
    const maxVal = Math.max(...samples);
    const binSize = (maxVal - minVal) / bins;
    
    // Create histogram data
    const histogram = new Array(bins).fill(0);
    samples.forEach(sample => {
      const binIndex = Math.min(Math.floor((sample - minVal) / binSize), bins - 1);
      histogram[binIndex]++;
    });
    
    const maxCount = Math.max(...histogram);
    const barWidth = (width - 2 * padding) / bins;

    // Draw bars
    histogram.forEach((count, i) => {
      const barHeight = (count / maxCount) * (height - 2 * padding);
      const x = padding + i * barWidth;
      const y = height - padding - barHeight;
      
      ctx.fillStyle = '#4682B4';
      ctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      
      // Add bin labels
      ctx.fillStyle = '#36454F';
      ctx.font = '10px Lato';
      ctx.textAlign = 'center';
      const binStart = Math.round(minVal + i * binSize);
      ctx.fillText(binStart + 'ms', x + barWidth/2, height - padding + 20);
    });

    // Title
    ctx.font = 'bold 16px Montserrat';
    ctx.textAlign = 'center';
    ctx.fillText('Prediction Latency Distribution', width / 2, 30);
  };

  return (
    <section id="metrics" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-montserrat font-bold text-primary mb-4">
              Model Performance Metrics
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Comprehensive evaluation metrics showing the accuracy and performance of our machine learning models
            </p>
          </div>

          {/* Model Accuracy Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="academic-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-success rounded-lg flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-foreground">
                    K-Nearest Neighbors
                  </h3>
                  <p className="text-3xl font-bold text-accent-success">
                    {(mockMetrics.accuracies.knn * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </div>

            <div className="academic-card p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-semibold text-foreground">
                    Random Forest
                  </h3>
                  <p className="text-3xl font-bold text-primary">
                    {(mockMetrics.accuracies.random_forest * 100).toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Accuracy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Model Selection for Detailed Metrics */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-foreground font-medium">Select Model for Detailed Analysis:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedModel('knn')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedModel === 'knn' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  K-Nearest Neighbors
                </button>
                <button
                  onClick={() => setSelectedModel('random_forest')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedModel === 'random_forest' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary text-foreground hover:bg-muted'
                  }`}
                >
                  Random Forest
                </button>
              </div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="academic-card p-6">
              <canvas
                ref={rocCanvasRef}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>

            <div className="academic-card p-6">
              <canvas
                ref={confusionCanvasRef}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>

            <div className="academic-card p-6">
              <canvas
                ref={featureCanvasRef}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>

            <div className="academic-card p-6">
              <canvas
                ref={latencyCanvasRef}
                width={400}
                height={300}
                className="w-full h-auto"
              />
            </div>
          </div>

          {/* Performance Summary */}
          <div className="mt-12 academic-card p-8 bg-gradient-primary text-primary-foreground">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="flex items-center justify-center mb-3">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">93.6%</h3>
                <p className="text-primary-foreground/90">Best Accuracy</p>
                <p className="text-sm text-primary-foreground/75">Random Forest Model</p>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-3">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">~50ms</h3>
                <p className="text-primary-foreground/90">Avg. Prediction Time</p>
                <p className="text-sm text-primary-foreground/75">Client-side Inference</p>
              </div>
              
              <div>
                <div className="flex items-center justify-center mb-3">
                  <BarChart3 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">14+</h3>
                <p className="text-primary-foreground/90">Features Analyzed</p>
                <p className="text-sm text-primary-foreground/75">Comprehensive Analysis</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MetricsDashboard;