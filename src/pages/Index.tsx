import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import URLAnalyzer from '../components/URLAnalyzer';
import FeaturesSection from '../components/FeaturesSection';
import MetricsDashboard from '../components/MetricsDashboard';
import DatasetVisualization from '../components/DatasetVisualization';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        <Hero />
        <URLAnalyzer />
        <FeaturesSection />
        <MetricsDashboard />
        <DatasetVisualization />
        <ContactSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;