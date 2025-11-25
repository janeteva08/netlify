'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface CSRGeneratorProps {
  onCSRGenerated: (csr: string) => void;
}

export default function CSRGenerator({ onCSRGenerated }: CSRGeneratorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [csrValue, setCSRValue] = useState('');

  const handleCSRChange = (value: string) => {
    setCSRValue(value);
    onCSRGenerated(value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(csrValue);
  };

  const handleClear = () => {
    setCSRValue('');
    onCSRGenerated('');
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted transition-colors duration-300"
      >
        <div className="flex items-center">
          <Icon name="KeyIcon" size={20} className="text-primary mr-3" />
          <div className="text-left">
            <h3 className="text-base font-semibold text-foreground">Have a CSR? (Optional)</h3>
            <p className="text-sm text-muted-foreground">Paste your Certificate Signing Request here if you already have one</p>
          </div>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={20}
          className={`text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              Certificate Signing Request (CSR)
            </label>
            <textarea
              value={csrValue}
              onChange={(e) => handleCSRChange(e.target.value)}
              placeholder="-----BEGIN CERTIFICATE REQUEST-----
MIICvDCCAaQCAQAwdzELMAkGA1UEBhMCVVMxCzAJBgNVBAgMAk5Z...
-----END CERTIFICATE REQUEST-----"
              rows={8}
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-sm font-mono resize-none"
            />
            <p className="mt-2 text-xs text-muted-foreground">
              If you don't have a CSR yet, you can generate one later or let us generate it for you during certificate issuance.
            </p>
          </div>

          {csrValue && (
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="flex items-center px-4 py-2 text-sm text-primary hover:text-primary/80 border border-primary rounded-lg hover:bg-primary/10 transition-colors duration-300"
              >
                <Icon name="ClipboardDocumentIcon" size={16} className="mr-2" />
                Copy CSR
              </button>
              <button
                onClick={handleClear}
                className="flex items-center px-4 py-2 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-muted transition-colors duration-300"
              >
                <Icon name="XMarkIcon" size={16} className="mr-2" />
                Clear
              </button>
            </div>
          )}

          <div className="mt-4 bg-trust-light border border-primary/20 rounded-lg p-4">
            <div className="flex items-start">
              <Icon name="InformationCircleIcon" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-trust-light-foreground">
                <p className="font-medium mb-1">About CSR</p>
                <p>
                  A Certificate Signing Request contains your public key and identifying information. 
                  You can provide your own CSR or skip this step and we'll help you generate one during certificate issuance.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}