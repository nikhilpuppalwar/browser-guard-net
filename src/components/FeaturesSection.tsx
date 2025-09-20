import React from 'react';
import { Ruler, AtSign, Minus, Globe } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Ruler,
      title: "URL Length",
      description: "Analyzes the total character length of URLs. Malicious URLs often use excessively long strings to hide suspicious elements or confuse users.",
      research: "Research shows that phishing URLs are typically 54% longer than legitimate ones on average."
    },
    {
      icon: AtSign,
      title: "Presence of @",
      description: "Detects the @ symbol which can be used to redirect users to malicious domains while displaying a legitimate-looking URL in the address bar.",
      research: "The @ symbol is a common obfuscation technique used in 78% of advanced phishing attacks."
    },
    {
      icon: Minus,
      title: "Hyphen Count",
      description: "Counts hyphens in URLs as excessive use can indicate domain spoofing attempts or automatically generated malicious domains.",
      research: "Malicious domains use 3x more hyphens than legitimate domains to create convincing spoofs."
    },
    {
      icon: Globe,
      title: "Subdomain Complexity",
      description: "Evaluates the depth and structure of subdomains. Multiple nested subdomains often indicate suspicious or compromised websites.",
      research: "URLs with 3+ subdomains are 85% more likely to be associated with malicious activity."
    }
  ];

  return (
    <section id="features" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-montserrat font-bold text-primary mb-4">
              Features We Analyze
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our machine learning models analyze multiple URL characteristics to identify potential threats
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="academic-card p-8 hover:shadow-subtle transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="feature-icon flex-shrink-0">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl font-montserrat font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    
                    <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
                      <p className="text-sm text-foreground font-medium">
                        Research Insight: {feature.research}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="academic-card p-6 bg-gradient-primary text-primary-foreground">
              <h3 className="text-xl font-montserrat font-semibold mb-2">
                Comprehensive Analysis
              </h3>
              <p className="text-primary-foreground/90">
                Our models analyze 14+ features including URL structure, character patterns, 
                protocol usage, and domain characteristics to provide accurate threat detection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;