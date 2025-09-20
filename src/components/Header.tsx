import React from 'react';

const Header = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">U</span>
            </div>
            <h1 className="text-xl font-montserrat font-bold text-primary">
              Detection of Malicious URLs
            </h1>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-foreground hover:text-primary transition-all duration-300 font-medium"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('tool')}
              className="text-foreground hover:text-primary transition-all duration-300 font-medium"
            >
              Tool
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-foreground hover:text-primary transition-all duration-300 font-medium"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection('metrics')}
              className="text-foreground hover:text-primary transition-all duration-300 font-medium"
            >
              Metrics
            </button>
            <button 
              onClick={() => scrollToSection('dataset')}
              className="text-foreground hover:text-primary transition-all duration-300 font-medium"
            >
              Dataset
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-foreground hover:text-primary transition-all duration-300 font-medium"
            >
              Contact
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;