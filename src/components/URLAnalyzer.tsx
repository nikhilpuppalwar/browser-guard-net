import React, { useState } from 'react';
import { AlertCircle, CheckCircle, Clock, Download, Shield } from 'lucide-react';
import { extractFeatures, predictURL, ModelType } from '../utils/mlUtils';
import { useToast } from '../hooks/use-toast';

interface PredictionResult {
  model: ModelType;
  label: string;
  confidence: number;
  predictionTime: number;
  topFeatures: Array<{ name: string; value: number; icon: string }>;
}

const URLAnalyzer = () => {
  const [url, setUrl] = useState('');
  const [selectedModel, setSelectedModel] = useState<ModelType>('random_forest');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<PredictionResult[]>([]);
  const [urlError, setUrlError] = useState('');
  const { toast } = useToast();

  const validateURL = (url: string): boolean => {
    try {
      new URL(url.startsWith('http') ? url : `http://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  const handleURLChange = (value: string) => {
    setUrl(value);
    if (value && !validateURL(value)) {
      setUrlError('Please enter a valid URL');
    } else {
      setUrlError('');
    }
  };

  const analyzeURL = async () => {
    if (!url || urlError) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL to analyze",
        variant: "destructive"
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const startTime = performance.now();
      
      // Extract features
      const features = extractFeatures(url);
      
      // Run prediction
      const prediction = await predictURL(features, selectedModel);
      const endTime = performance.now();
      
      const result: PredictionResult = {
        model: selectedModel,
        label: prediction.label,
        confidence: prediction.confidence,
        predictionTime: Math.round(endTime - startTime),
        topFeatures: prediction.topFeatures
      };
      
      setResults([result]);
      
      // Save to session storage
      const history = JSON.parse(sessionStorage.getItem('urlHistory') || '[]');
      const historyEntry = {
        url: url.substring(0, 50) + (url.length > 50 ? '...' : ''),
        timestamp: new Date().toISOString(),
        model: selectedModel,
        label: prediction.label,
        confidence: prediction.confidence
      };
      
      history.unshift(historyEntry);
      sessionStorage.setItem('urlHistory', JSON.stringify(history.slice(0, 10)));
      
      toast({
        title: "Analysis Complete",
        description: `URL classified as ${prediction.label} with ${Math.round(prediction.confidence * 100)}% confidence`,
      });
      
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing the URL. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const exportResults = () => {
    const data = {
      url,
      timestamp: new Date().toISOString(),
      results,
      features: extractFeatures(url)
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url_download = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_download;
    a.download = `url-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url_download);
  };

  const getResultIcon = (label: string) => {
    return label === 'benign' ? CheckCircle : AlertCircle;
  };

  const getResultColor = (label: string) => {
    return label === 'benign' ? 'result-tag benign' : 'result-tag malicious';
  };

  return (
    <section id="tool" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-montserrat font-bold text-primary mb-4">
              Analyze a URL
            </h2>
            <p className="text-muted-foreground text-lg">
              Enter a URL below to analyze its safety using our trained machine learning models
            </p>
          </div>

          {/* URL Input Section */}
          <div className="academic-card p-8 mb-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="url-input" className="block text-sm font-medium text-foreground mb-2">
                  URL to Analyze
                </label>
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={(e) => handleURLChange(e.target.value)}
                  placeholder="Enter URL here..."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 text-lg"
                  disabled={isAnalyzing}
                />
                {urlError && (
                  <p className="text-accent-danger text-sm mt-2">{urlError}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Machine Learning Model
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="knn"
                      checked={selectedModel === 'knn'}
                      onChange={(e) => setSelectedModel(e.target.value as ModelType)}
                      className="mr-2"
                      disabled={isAnalyzing}
                    />
                    <span>K-Nearest Neighbors</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="random_forest"
                      checked={selectedModel === 'random_forest'}
                      onChange={(e) => setSelectedModel(e.target.value as ModelType)}
                      className="mr-2"
                      disabled={isAnalyzing}
                    />
                    <span>Random Forest</span>
                  </label>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={analyzeURL}
                  disabled={isAnalyzing || !url || !!urlError}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      Classify URL
                    </>
                  )}
                </button>

                <p className="text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    This analysis runs locally in your browser; submitted URLs are not sent to any server.
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {results.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-montserrat font-bold text-foreground">
                  Analysis Results
                </h3>
                <button
                  onClick={exportResults}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Results
                </button>
              </div>

              {results.map((result, index) => {
                const IconComponent = getResultIcon(result.label);
                return (
                  <div key={index} className="academic-card p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-8 h-8 ${result.label === 'benign' ? 'text-accent-success' : 'text-accent-danger'}`} />
                        <div>
                          <h4 className="text-lg font-montserrat font-semibold text-foreground">
                            {result.model === 'knn' ? 'K-Nearest Neighbors' : 'Random Forest'}
                          </h4>
                          <span className={getResultColor(result.label)}>
                            {result.label.toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {result.predictionTime}ms
                        </div>
                        <div className="text-lg font-semibold text-foreground">
                          {Math.round(result.confidence * 100)}% confidence
                        </div>
                      </div>
                    </div>

                    <div>
                      <h5 className="font-medium text-foreground mb-2">Top Contributing Features:</h5>
                      <div className="grid grid-cols-3 gap-3">
                        {result.topFeatures.map((feature, idx) => (
                          <div key={idx} className="text-center p-3 bg-secondary rounded-lg">
                            <div className="text-2xl mb-1">{feature.icon}</div>
                            <div className="text-sm font-medium text-foreground">{feature.name}</div>
                            <div className="text-xs text-muted-foreground">{feature.value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default URLAnalyzer;