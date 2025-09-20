import React, { useState } from 'react';
import { FileText, ChevronLeft, ChevronRight, Download } from 'lucide-react';

// Mock dataset for demonstration
const mockDataset = [
  { id: 1, url: "br-icloud.com.br", type: "phishing", date_added: "2024-01-15" },
  { id: 2, url: "mp3raid.com/music/krizz_kaliko.html", type: "benign", date_added: "2024-01-15" },
  { id: 3, url: "bopsecrets.org/rexroth/cr/1.htm", type: "benign", date_added: "2024-01-16" },
  { id: 4, url: "http://www.garage-pirenne.be/index.php?option=...", type: "defacement", date_added: "2024-01-16" },
  { id: 5, url: "http://adventure-nicaragua.net/index.php?option=...", type: "defacement", date_added: "2024-01-17" },
  { id: 6, url: "phishing-bank-verify.suspicious-domain.com", type: "phishing", date_added: "2024-01-17" },
  { id: 7, url: "malware-download.badsite.net/payload.exe", type: "malware", date_added: "2024-01-18" },
  { id: 8, url: "google.com/search?q=machine+learning", type: "benign", date_added: "2024-01-18" },
  { id: 9, url: "github.com/microsoft/onnxruntime", type: "benign", date_added: "2024-01-19" },
  { id: 10, url: "fake-paypal-login.phishingsite.org", type: "phishing", date_added: "2024-01-19" },
  { id: 11, url: "malicious-redirect.compromised.com", type: "malware", date_added: "2024-01-20" },
  { id: 12, url: "wikipedia.org/wiki/Machine_learning", type: "benign", date_added: "2024-01-20" },
  { id: 13, url: "defaced-website.hacked.net/index.html", type: "defacement", date_added: "2024-01-21" },
  { id: 14, url: "amazon.com/dp/B08N5WRWNW", type: "benign", date_added: "2024-01-21" },
  { id: 15, url: "fake-microsoft-update.malware.org", type: "malware", date_added: "2024-01-22" }
];

// Mock word cloud descriptions (these would be actual images in production)
const wordClouds = [
  {
    type: "benign",
    description: "Common words: google, amazon, wikipedia, github, official, secure, https, com, org, net",
    color: "text-accent-success"
  },
  {
    type: "phishing", 
    description: "Common words: login, verify, account, update, secure, bank, paypal, suspicious, fake, credential",
    color: "text-accent-danger"
  },
  {
    type: "malware",
    description: "Common words: download, payload, exe, malicious, virus, trojan, redirect, infected, harmful",
    color: "text-accent-danger"
  },
  {
    type: "defacement",
    description: "Common words: hacked, defaced, compromised, index, modified, unauthorized, breach, altered",
    color: "text-accent-warning"
  }
];

const DatasetVisualization = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(mockDataset.length / itemsPerPage);
  
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return mockDataset.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'benign': return 'text-accent-success bg-accent-success/10 border border-accent-success/20';
      case 'phishing': return 'text-accent-danger bg-accent-danger/10 border border-accent-danger/20';
      case 'malware': return 'text-accent-danger bg-accent-danger/10 border border-accent-danger/20';
      case 'defacement': return 'text-orange-600 bg-orange-100 border border-orange-200';
      default: return 'text-muted-foreground bg-muted border border-border';
    }
  };

  const exportDataset = () => {
    const csv = [
      'URL,Type,Date Added',
      ...mockDataset.map(item => `"${item.url}",${item.type},${item.date_added}`)
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'malicious_urls_sample.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="dataset" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-montserrat font-bold text-primary mb-4">
              Dataset & Visualizations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore our comprehensive dataset of URLs and their classifications through visual analysis
            </p>
          </div>

          {/* Word Cloud Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-montserrat font-semibold text-foreground mb-8 text-center">
              Word Cloud Analysis by URL Type
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              {wordClouds.map((cloud, index) => (
                <div key={index} className="academic-card p-8">
                  <div className="text-center mb-6">
                    <div className="w-full h-40 bg-gradient-to-br from-muted to-secondary rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">Word Cloud Visualization</p>
                        <p className="text-xs text-muted-foreground">(Generated from URL patterns)</p>
                      </div>
                    </div>
                    
                    <h4 className={`text-xl font-montserrat font-semibold mb-2 ${cloud.color} capitalize`}>
                      {cloud.type} URLs
                    </h4>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <p className="text-sm text-foreground leading-relaxed">
                      {cloud.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dataset Table */}
          <div className="academic-card p-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-montserrat font-semibold text-foreground">
                Sample Dataset
              </h3>
              <button
                onClick={exportDataset}
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-foreground">URL</th>
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-foreground">Type</th>
                    <th className="text-left py-3 px-4 font-montserrat font-semibold text-foreground">Date Added</th>
                  </tr>
                </thead>
                <tbody>
                  {getCurrentPageData().map((item) => (
                    <tr key={item.id} className="border-b border-border/50 hover:bg-muted/30 transition-all duration-300">
                      <td className="py-3 px-4">
                        <div className="font-mono text-sm text-foreground max-w-md truncate">
                          {item.url}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                          {item.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {item.date_added}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, mockDataset.length)} of {mockDataset.length} entries
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg text-sm font-medium transition-smooth ${
                        page === currentPage 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-foreground hover:bg-muted'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dataset Statistics */}
          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Total URLs', value: '651,191', type: 'total' },
              { label: 'Benign URLs', value: '428,103', type: 'benign' },
              { label: 'Phishing URLs', value: '96,457', type: 'phishing' },
              { label: 'Malware URLs', value: '126,631', type: 'malware' }
            ].map((stat, index) => (
              <div key={index} className="academic-card p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DatasetVisualization;