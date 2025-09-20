import React, { useState } from 'react';
import { Mail, User, MessageSquare, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for your message. We'll get back to you soon.",
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-montserrat font-bold text-primary mb-4">
              Contact Us
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Have questions about our URL detection research or want to collaborate? 
              We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-montserrat font-semibold text-foreground mb-6">
                  Get in Touch
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our research focuses on advancing web safety through machine learning. 
                  Whether you're interested in our methodology, want to contribute to the dataset, 
                  or have suggestions for improvement, we welcome your input.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Research Inquiries</h4>
                    <p className="text-muted-foreground">research@urlsafety.edu</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-success rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Collaboration</h4>
                    <p className="text-muted-foreground">Partnerships & Data Sharing</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent-warning rounded-lg flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-foreground">Technical Support</h4>
                    <p className="text-muted-foreground">Implementation & Integration</p>
                  </div>
                </div>
              </div>

              <div className="academic-card p-6 bg-primary/5 border-l-4 border-primary">
                <h4 className="font-montserrat font-semibold text-foreground mb-2">
                  Research Publication
                </h4>
                <p className="text-sm text-muted-foreground">
                  This work is part of ongoing academic research in cybersecurity and machine learning. 
                  Results and methodologies will be published in peer-reviewed journals.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="academic-card p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 ${
                        errors.name ? 'border-accent-danger' : 'border-border'
                      }`}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                    />
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                  {errors.name && (
                    <p className="text-accent-danger text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 ${
                        errors.email ? 'border-accent-danger' : 'border-border'
                      }`}
                      placeholder="your.email@example.com"
                      disabled={isSubmitting}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                  {errors.email && (
                    <p className="text-accent-danger text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message *
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={5}
                      className={`w-full px-4 py-3 pl-12 border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300 resize-none ${
                        errors.message ? 'border-accent-danger' : 'border-border'
                      }`}
                      placeholder="Tell us about your inquiry, research interests, or how you'd like to collaborate..."
                      disabled={isSubmitting}
                    />
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-muted-foreground" />
                  </div>
                  {errors.message && (
                    <p className="text-accent-danger text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-muted-foreground text-center">
                  This form uses client-side validation only. Your message will not be sent to an actual server in this demo.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;