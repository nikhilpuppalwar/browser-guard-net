import React from 'react';
import { Shield } from 'lucide-react';

const Hero = () => {
  const scrollToTool = () => {
    const element = document.getElementById('tool');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 pb-16 bg-gradient-to-br from-background to-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-foreground mb-6 leading-tight">
              Detection of Malicious URLs for 
              <span className="text-primary"> Web Safety Enhancement</span>
            </h1>
            
            <div className="max-w-2xl mx-auto space-y-4 text-lg text-muted-foreground">
              <p>
                In today's digital world, phishing attacks and malicious links have become a growing threat. 
              </p>
              <p>
                This tool is designed to identify and flag suspicious links in real-time to enhance digital safety.
              </p>
            </div>
          </div>
          
          <button 
            onClick={scrollToTool}
            className="btn-primary text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Try the URL Analyzer
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;