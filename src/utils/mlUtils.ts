// Machine Learning Utilities for URL Analysis
// This module handles feature extraction and model inference

export type ModelType = 'knn' | 'random_forest';

export interface URLFeatures {
  url_length: number;
  num_digits: number;
  num_special_chars: number;
  num_subdomains: number;
  has_ip: number;
  has_https: number;
  num_params: number;
  num_fragments: number;
  num_slashes: number;
  has_suspicious_words: number;
  tld_length: number;
  is_common_tld: number;
  has_hex: number;
  repeated_chars: number;
}

export interface PredictionResult {
  label: string;
  confidence: number;
  topFeatures: Array<{ name: string; value: number; icon: string }>;
}

// Suspicious keywords commonly found in phishing URLs
const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'verify', 'update', 'banking', 'account', 
  'secure', 'ebay', 'paypal', 'amazon', 'microsoft', 'apple'
];

// Common TLDs for validation
const COMMON_TLDS = ['com', 'org', 'net', 'edu', 'gov'];

// Feature extraction function - matches the Python implementation
export function extractFeatures(url: string): URLFeatures {
  // Normalize URL for analysis
  const normalizedUrl = url.toLowerCase();
  
  return {
    // Total length of the URL
    url_length: url.length,
    
    // Number of digits in the URL
    num_digits: (url.match(/\d/g) || []).length,
    
    // Number of special characters (punctuation)
    num_special_chars: (url.match(/[^\w\s]/g) || []).length,
    
    // Number of subdomains (dots minus 1, minimum 0)
    num_subdomains: Math.max(0, (url.match(/\./g) || []).length - 1),
    
    // Whether URL contains an IP address
    has_ip: /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(url) ? 1 : 0,
    
    // Whether URL uses HTTPS
    has_https: normalizedUrl.includes('https') ? 1 : 0,
    
    // Number of query parameters
    num_params: (url.match(/\?/g) || []).length,
    
    // Number of URL fragments
    num_fragments: (url.match(/#/g) || []).length,
    
    // Total number of slashes
    num_slashes: (url.match(/\//g) || []).length,
    
    // Whether URL contains suspicious keywords
    has_suspicious_words: SUSPICIOUS_KEYWORDS.some(word => 
      normalizedUrl.includes(word)
    ) ? 1 : 0,
    
    // Length of top-level domain
    tld_length: (() => {
      const parts = url.split('.');
      return parts.length > 0 ? parts[parts.length - 1].split(/[/?#]/)[0].length : 0;
    })(),
    
    // Whether TLD is common
    is_common_tld: (() => {
      const parts = url.split('.');
      if (parts.length === 0) return 0;
      const tld = parts[parts.length - 1].split(/[/?#]/)[0].toLowerCase();
      return COMMON_TLDS.includes(tld) ? 1 : 0;
    })(),
    
    // Whether URL contains hex encoding
    has_hex: /%[0-9a-fA-F]{2}/.test(url) ? 1 : 0,
    
    // Whether URL has repeated characters (4+ in a row)
    repeated_chars: /(.)\1{3,}/.test(url) ? 1 : 0
  };
}

// Simulate model prediction (since we can't load actual ONNX models in this demo)
export async function predictURL(features: URLFeatures, modelType: ModelType): Promise<PredictionResult> {
  // Simulate loading time
  await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));
  
  // Calculate a risk score based on features
  const riskFactors = [
    features.url_length > 75 ? 0.3 : 0,
    features.has_ip ? 0.4 : 0,
    features.has_suspicious_words ? 0.5 : 0,
    features.num_subdomains > 2 ? 0.2 : 0,
    features.has_https ? -0.1 : 0.1,
    features.repeated_chars ? 0.3 : 0,
    features.has_hex ? 0.2 : 0,
    features.num_special_chars > 20 ? 0.2 : 0
  ];
  
  const baseRiskScore = riskFactors.reduce((sum, factor) => sum + factor, 0);
  
  // Add some model-specific variation
  const modelVariation = modelType === 'knn' ? Math.random() * 0.1 - 0.05 : Math.random() * 0.15 - 0.075;
  const riskScore = Math.max(0, Math.min(1, baseRiskScore + modelVariation));
  
  // Determine label and confidence
  const isMalicious = riskScore > 0.5;
  const label = isMalicious ? 'malicious' : 'benign';
  const confidence = isMalicious ? riskScore : (1 - riskScore);
  
  // Get top contributing features
  const featureContributions = [
    { name: 'URL Length', value: features.url_length, icon: '📏', contribution: features.url_length > 75 ? 0.3 : 0 },
    { name: 'Has IP', value: features.has_ip, icon: '🌐', contribution: features.has_ip ? 0.4 : 0 },
    { name: 'Suspicious Words', value: features.has_suspicious_words, icon: '⚠️', contribution: features.has_suspicious_words ? 0.5 : 0 },
    { name: 'Subdomains', value: features.num_subdomains, icon: '🔗', contribution: features.num_subdomains > 2 ? 0.2 : 0 },
    { name: 'HTTPS', value: features.has_https, icon: '🔒', contribution: features.has_https ? -0.1 : 0.1 },
    { name: 'Special Chars', value: features.num_special_chars, icon: '🔤', contribution: features.num_special_chars > 20 ? 0.2 : 0 },
    { name: 'Hex Encoding', value: features.has_hex, icon: '🔢', contribution: features.has_hex ? 0.2 : 0 },
    { name: 'Repeated Chars', value: features.repeated_chars, icon: '🔄', contribution: features.repeated_chars ? 0.3 : 0 }
  ];
  
  // Sort by contribution and take top 3
  const topFeatures = featureContributions
    .sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    .slice(0, 3)
    .map(f => ({ name: f.name, value: f.value, icon: f.icon }));
  
  return {
    label,
    confidence,
    topFeatures
  };
}

// Export features to downloadable format
export function exportFeatures(url: string, features: URLFeatures): object {
  return {
    url,
    timestamp: new Date().toISOString(),
    features,
    featureDescriptions: {
      url_length: "Total character length of the URL",
      num_digits: "Count of numeric digits in the URL",
      num_special_chars: "Count of special characters and punctuation",
      num_subdomains: "Number of subdomains (dots minus 1)",
      has_ip: "Whether URL contains an IP address (1=yes, 0=no)",
      has_https: "Whether URL uses HTTPS protocol (1=yes, 0=no)",
      num_params: "Number of query parameters (?)",
      num_fragments: "Number of URL fragments (#)",
      num_slashes: "Total count of forward slashes",
      has_suspicious_words: "Contains known phishing keywords (1=yes, 0=no)",
      tld_length: "Length of the top-level domain",
      is_common_tld: "Whether TLD is common (.com, .org, etc.)",
      has_hex: "Contains hex encoding (1=yes, 0=no)",
      repeated_chars: "Has 4+ repeated characters in sequence (1=yes, 0=no)"
    }
  };
}