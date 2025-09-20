# Detection of Malicious URLs for Web Safety Enhancement

An interactive academic demonstration that classifies URLs (Benign / Phishing / Malware / Defacement) in-browser using pre-trained machine learning models and visualizes results and evaluation metrics.

## Project Overview

This is a frontend-only web application that demonstrates machine learning techniques for detecting malicious URLs. The application runs entirely in the browser with no backend dependencies, making it perfect for academic demonstrations and educational purposes.

## Features

- **Real-time URL Analysis**: Classify URLs using K-Nearest Neighbors and Random Forest models
- **Interactive Metrics Dashboard**: View ROC curves, confusion matrices, feature importance, and latency distributions
- **Privacy-First Design**: All analysis runs locally in the browser - no URLs are sent to external servers
- **Academic Visualizations**: Word clouds, dataset exploration, and comprehensive performance metrics
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Machine Learning**: ONNX Runtime Web for browser-based model inference
- **Charts**: Canvas-based custom visualizations
- **Design**: Academic minimalist design with Lato and Montserrat fonts
- **Build Tool**: Vite for fast development and optimized builds

## Getting Started

### Prerequisites

- Node.js 16 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd malicious-url-detection
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Project Structure

```
├── public/
│   ├── data/
│   │   ├── metrics.json          # Pre-computed model evaluation metrics
│   │   └── sample_data.csv       # Sample dataset for display
│   └── models/                   # ONNX model files (not included in this demo)
├── src/
│   ├── components/               # React components for each section
│   ├── utils/
│   │   └── mlUtils.ts           # Feature extraction and ML utilities
│   ├── pages/
│   │   └── Index.tsx            # Main page component
│   └── hooks/                   # Custom React hooks
├── index.html                   # Main HTML template
└── README.md                    # This file
```

## Model Implementation

### Feature Extraction

The application analyzes 14+ URL features including:

- **URL Length**: Total character count
- **Special Characters**: Punctuation and symbols
- **Subdomains**: Depth and complexity analysis
- **Protocol Analysis**: HTTPS vs HTTP usage
- **Suspicious Keywords**: Phishing-related terms
- **IP Address Detection**: Direct IP usage
- **Encoding Patterns**: Hex encoding and obfuscation
- **TLD Analysis**: Top-level domain characteristics

### Machine Learning Models

Two models are implemented for comparison:

1. **K-Nearest Neighbors (KNN)**
   - Simple, interpretable algorithm
   - Accuracy: ~89.1%
   - Fast inference for real-time analysis

2. **Random Forest**
   - Ensemble method with feature importance
   - Accuracy: ~93.6%
   - Provides detailed feature contribution analysis

### Model Training (Offline Process)

The models were trained using the following process:

1. **Data Preparation**: 650K+ URLs from various sources
2. **Feature Engineering**: Extract numerical features from URL strings
3. **Model Training**: Scikit-learn implementation with cross-validation
4. **Evaluation**: ROC/AUC, Precision-Recall, Confusion Matrix analysis
5. **Export**: Convert to ONNX format for browser deployment

## Performance Metrics

- **Random Forest Accuracy**: 93.6%
- **KNN Accuracy**: 89.1%
- **Average Prediction Time**: ~50ms (client-side)
- **Dataset Size**: 651,191 URLs across 4 categories

## Usage

1. **URL Analysis**: Enter any URL in the analysis tool
2. **Model Selection**: Choose between KNN and Random Forest
3. **Results Review**: View classification, confidence, and contributing features
4. **Export Data**: Download results as JSON for further analysis
5. **Explore Metrics**: Interactive charts show model performance
6. **Dataset Exploration**: Browse sample data and visualizations

## Privacy & Security

- **No Data Transmission**: All processing happens locally
- **Client-Side Storage**: Session storage for analysis history (optional)
- **No URL Following**: Only string analysis, never fetches URL content
- **Privacy Statement**: Clear disclosure of local processing

## Academic Applications

This tool is designed for:

- **Computer Science Education**: Demonstrating ML in cybersecurity
- **Research Presentations**: Interactive model comparison
- **Security Awareness**: Understanding URL-based threats
- **Technical Demonstrations**: Browser-based ML capabilities

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires modern browser with WebAssembly support for ONNX Runtime.

## Contributing

This is an academic demonstration project. For research collaborations or questions:

1. Review the methodology and implementation
2. Test with various URL types
3. Suggest improvements to feature extraction
4. Contribute to dataset expansion

## License

This project is for academic and educational purposes. Please cite appropriately if used in research.

## Citation

```
Detection of Malicious URLs for Web Safety Enhancement
Academic Research Project, 2024
Interactive Demo: [URL]
```

## Limitations

- **Demo Models**: Simplified for browser deployment
- **Dataset**: Sample data for demonstration purposes
- **Real-time Updates**: Models are static, not continuously learning
- **Scale**: Optimized for individual URL analysis, not batch processing

## Future Enhancements

- **Deep Learning Models**: Integration of neural networks
- **Real-time Training**: Online learning capabilities
- **Extended Features**: Content analysis, domain reputation
- **API Integration**: Optional cloud-based enhanced analysis

---

*This project demonstrates the intersection of web technologies, machine learning, and cybersecurity in an accessible, privacy-conscious format.*