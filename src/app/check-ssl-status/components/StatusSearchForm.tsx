'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StatusSearchFormProps {
  onSearch: (domain: string, email: string) => void;
}

const StatusSearchForm = ({ onSearch }: StatusSearchFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [domain, setDomain] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ domain: '', email: '' });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-12 bg-muted rounded"></div>
          <div className="h-12 bg-muted rounded w-1/3"></div>
        </div>
      </div>
    );
  }

  const validateDomain = (value: string): boolean => {
    const domainRegex = /^(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    return domainRegex.test(value);
  };

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = { domain: '', email: '' };
    let isValid = true;

    // At least one of domain or email must be provided
    if (!domain.trim() && !email.trim()) {
      newErrors.domain = 'Either domain name or email is required';
      newErrors.email = 'Either domain name or email is required';
      isValid = false;
    } else {
      // Validate domain format if provided
      if (domain.trim() && !validateDomain(domain)) {
        newErrors.domain = 'Please enter a valid domain name (e.g., example.com)';
        isValid = false;
      }

      // Validate email format if provided
      if (email.trim() && !validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
    }

    setErrors(newErrors);

    if (isValid) {
      onSearch(domain, email);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <h2 className="text-xl font-semibold text-foreground mb-6">Track Your SSL Certificate</h2>
      
      <div className="bg-trust-light border border-primary/20 rounded-lg p-4 mb-6">
        <div className="flex items-start">
          <Icon name="InformationCircleIcon" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-trust-light-foreground">
            <p className="font-medium mb-1">Flexible Search</p>
            <p>
              You can search using either your domain name OR email address. At least one is required to locate your order.
            </p>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-foreground mb-2">
            Domain Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="GlobeAltIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="example.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.domain
                  ? 'border-error focus:ring-error' :'border-input focus:ring-primary'
              }`}
            />
          </div>
          {errors.domain && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.domain}</span>
            </p>
          )}
        </div>

        <div className="flex items-center justify-center text-muted-foreground my-4">
          <div className="h-px bg-border flex-1"></div>
          <span className="px-4 text-sm font-medium">OR</span>
          <div className="h-px bg-border flex-1"></div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Icon name="EnvelopeIcon" size={20} className="text-muted-foreground" />
            </div>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.email
                  ? 'border-error focus:ring-error' :'border-input focus:ring-primary'
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-2 text-sm text-error flex items-center space-x-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
        >
          Check Status
        </button>
      </form>

      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="InformationCircleIcon" size={20} className="text-primary mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              Enter either the domain name or email address you used when ordering your SSL certificate. We'll retrieve your order status instantly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusSearchForm;