'use client';

import { useState } from 'react';
import HeroSection from './HeroSection';
import ContactMethodsSection from './ContactMethodsSection';
import FAQSection from './FAQSection';
import SearchModal from './SearchModal';
import ContactFormModal from './ContactFormModal';
import LiveChatWidget from './LiveChatWidget';

interface ContactMethod {
  id: number;
  title: string;
  description: string;
  icon: string;
  availability: string;
  action: string;
  buttonText: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface SearchResult {
  id: number;
  title: string;
  category: string;
  excerpt: string;
}

export default function SupportCenterInteractive() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [contactFormType, setContactFormType] = useState<'email' | 'ticket' | 'callback'>('email');

  const contactMethods: ContactMethod[] = [
    {
      id: 1,
      title: "Email Support",
      description: "Get detailed assistance via email. Send email to support@shieldxssl.com",
      icon: "EnvelopeIcon",
      availability: "24/7 Available",
      
      buttonText: "Send Email"
    },
    
    
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: "How long does it take to issue an SSL certificate?",
      answer: "Domain Validated (DV) certificates are typically issued within 5-10 minutes after domain validation. Organization Validated (OV) certificates take 1-3 business days, and Extended Validation (EV) certificates require 3-5 business days for thorough verification.",
      category: "General"
    },
    {
      id: 2,
      question: "What validation methods are available for domain verification?",
      answer: "We offer three validation methods: Email validation (receive verification email at admin@yourdomain.com), DNS validation (add a TXT record to your DNS), and HTTP file validation (upload a verification file to your website). You can choose the method that works best for your setup.",
      category: "Validation"
    },
    {
      id: 3,
      question: "Can I install one SSL certificate on multiple servers?",
      answer: "Standard SSL certificates are licensed for a single server. However, our Multi-Domain (SAN) certificates can secure multiple domains, and Wildcard certificates can secure unlimited subdomains. For multiple server installations, consider our enterprise solutions.",
      category: "Installation"
    },
    {
      id: 4,
      question: "How to Contact ShieldxSSL?",
      answer: " You can send us an email at support@shieldxssl.com for any kind of support.",
      category: "General"
    },
    
    {
      id: 6,
      question: "How do I generate a Certificate Signing Request (CSR)?",
      answer: "A CSR can be generated through your web hosting control panel (cPanel, Plesk) or server command line. We provide detailed CSR generation guides for all major platforms in our knowledge base. Please send us an email for assistance.",
      category: "Technical"
    },
    {
      id: 7,
      question: "What's the difference between DV, OV, and EV certificates?",
      answer: "DV (Domain Validated) certificates verify domain ownership only and are issued quickly. OV (Organization Validated) certificates verify your organization's identity and take longer. EV (Extended Validation) certificates provide the highest level of validation, displaying your company name in the browser address bar.",
      category: "General"
    },
    
  ];

  const searchResults: SearchResult[] = [
    {
      id: 1,
      title: "How to Install SSL Certificate on Apache",
      category: "Installation",
      excerpt: "Step-by-step guide for installing SSL certificates on Apache web server with configuration examples..."
    },
    {
      id: 2,
      title: "Understanding SSL Certificate Validation Methods",
      category: "Validation",
      excerpt: "Learn about the three main validation methods: email, DNS, and HTTP file validation..."
    },
    {
      id: 3,
      title: "SSL Certificate Renewal Best Practices",
      category: "Renewal",
      excerpt: "Tips for managing certificate renewals, setting up reminders, and avoiding expiration..."
    }
  ];

  const handleContactMethodClick = (action: string) => {
    if (action === 'email') {
      setContactFormType('email');
      setIsContactFormOpen(true);
    } else if (action === 'ticket') {
      setContactFormType('ticket');
      setIsContactFormOpen(true);
    } else if (action === 'callback') {
      setContactFormType('callback');
      setIsContactFormOpen(true);
    } else if (action === 'phone') {
      window.location.href = 'tel:+18005551234';
    }
  };

  const handleSearch = (query: string) => {
    console.log('Search query:', query);
  };

  return (
    <>
      <HeroSection onSearchClick={() => setIsSearchOpen(true)} />
      <ContactMethodsSection methods={contactMethods} onMethodClick={handleContactMethodClick} />
      <FAQSection faqs={faqs} />
      
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        searchResults={searchResults}
        onSearch={handleSearch}
      />
      
      <ContactFormModal
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        formType={contactFormType}
      />
      
      <LiveChatWidget />
    </>
  );
}