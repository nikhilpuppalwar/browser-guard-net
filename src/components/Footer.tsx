import React from 'react';
import { Shield, Github, Mail, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Project Info */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-xl font-montserrat font-bold">URL Safety Research</h3>
                  <p className="text-sm text-background/70">Academic Demo</p>
                </div>
              </div>
              <p className="text-background/80 leading-relaxed mb-4">
                An interactive demonstration of machine learning techniques for detecting malicious URLs. 
                This research aims to enhance web safety through automated threat detection using 
                K-Nearest Neighbors and Random Forest algorithms.
              </p>
              <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-background/70 hover:text-background transition-all duration-300">
                    <Github className="w-5 h-5" />
                    <span className="text-sm">View Research</span>
                  </button>
                  <button className="flex items-center gap-2 text-background/70 hover:text-background transition-all duration-300">
                    <BookOpen className="w-5 h-5" />
                    <span className="text-sm">Documentation</span>
                  </button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <button 
                    onClick={() => document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/70 hover:text-background transition-all duration-300 text-sm"
                  >
                    URL Analyzer
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/70 hover:text-background transition-all duration-300 text-sm"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('metrics')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/70 hover:text-background transition-all duration-300 text-sm"
                  >
                    Performance Metrics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => document.getElementById('dataset')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-background/70 hover:text-background transition-all duration-300 text-sm"
                  >
                    Dataset
                  </button>
                </li>
              </ul>
            </div>

            {/* Research Info */}
            <div>
              <h4 className="font-montserrat font-semibold mb-4">Research</h4>
              <ul className="space-y-2 text-sm text-background/70">
                <li>Machine Learning Models</li>
                <li>Feature Engineering</li>
                <li>Cybersecurity Applications</li>
                <li>Web Safety Enhancement</li>
              </ul>
              
              <div className="mt-6">
                <h5 className="font-medium mb-2">Technologies Used</h5>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-background/10 rounded text-xs">React</span>
                  <span className="px-2 py-1 bg-background/10 rounded text-xs">TypeScript</span>
                  <span className="px-2 py-1 bg-background/10 rounded text-xs">ONNX</span>
                  <span className="px-2 py-1 bg-background/10 rounded text-xs">Chart.js</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 mt-8 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-sm text-background/70">
                  © 2024 Detection of Malicious URLs for Web Safety Enhancement
                </p>
                <p className="text-xs text-background/50 mt-1">
                  Academic Research Project - Educational Purposes Only
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-background/70">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs">Privacy-First Design</span>
                </div>
                <div className="text-background/50 text-xs">
                  All analysis runs locally
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;