'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DomainDetailsFormProps {
  formData: {
    domain: string;
    email: string;
    organization: string;
    country: string;
  };
  onFormChange: (field: string, value: string) => void;
  errors: Record<string, string>;
}

export default function DomainDetailsForm({ formData, onFormChange, errors }: DomainDetailsFormProps) {
  const [domainValidation, setDomainValidation] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');

  const validateDomain = (domain: string) => {
    if (!domain) {
      setDomainValidation('idle');
      return;
    }

    setDomainValidation('checking');
    
    setTimeout(() => {
      const domainRegex = /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i;
      setDomainValidation(domainRegex.test(domain) ? 'valid' : 'invalid');
    }, 800);
  };

  const handleDomainChange = (value: string) => {
    onFormChange('domain', value);
    validateDomain(value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Domain & Contact Information</h2>
      
      <div className="bg-trust-light border border-primary/20 rounded-lg p-4 mb-4">
        <div className="flex items-start">
          <Icon name="InformationCircleIcon" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-trust-light-foreground">
            <p className="font-medium mb-1">Required Information</p>
            <p>
              Both domain name and contact email are mandatory for certificate issuance and validation. Please ensure both fields are filled accurately.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="domain" className="block text-sm font-medium text-foreground mb-2">
            Domain Name <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              id="domain"
              value={formData.domain}
              onChange={(e) => handleDomainChange(e.target.value)}
              placeholder="example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.domain
                  ? 'border-destructive focus:ring-destructive'
                  : domainValidation === 'valid' ?'border-conversion-green focus:ring-conversion-green' :'border-input focus:ring-ring'
              }`}
            />
            {domainValidation === 'checking' && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary"></div>
              </div>
            )}
            {domainValidation === 'valid' && (
              <Icon
                name="CheckCircleIcon"
                variant="solid"
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-conversion-green"
              />
            )}
            {domainValidation === 'invalid' && (
              <Icon
                name="XCircleIcon"
                variant="solid"
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-destructive"
              />
            )}
          </div>
          {errors.domain && <p className="mt-1 text-sm text-destructive">{errors.domain}</p>}
          {domainValidation === 'valid' && (
            <p className="mt-1 text-sm text-conversion-green flex items-center">
              <Icon name="CheckIcon" size={14} className="mr-1" />
              Domain format is valid
            </p>
          )}
        </div>

        <div className="flex items-center justify-center text-muted-foreground">
          <div className="h-px bg-border flex-1"></div>
          
          <div className="h-px bg-border flex-1"></div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Contact Email <span className="text-destructive">*</span>
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) => onFormChange('email', e.target.value)}
            placeholder="admin@example.com"
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-300 ${
              errors.email ? 'border-destructive' : 'border-input'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email}</p>}
          <p className="mt-1 text-sm text-muted-foreground">
            Validation emails will be sent to this address
          </p>
        </div>
      </div>

      <div className="bg-trust-light border border-primary/20 rounded-lg p-4">
        <div className="flex items-start">
          <Icon name="InformationCircleIcon" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-trust-light-foreground">
            <p className="font-medium mb-1">Domain Ownership Verification</p>
            <p>
              You'll need to verify domain ownership through email, DNS, or file upload. We'll guide you through the process after order submission.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}