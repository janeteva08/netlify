'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQSectionProps {
  className?: string;
}

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = ({ className = '' }: FAQSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const faqs: FAQ[] = [
    {
      question: 'What is an SSL certificate and why do I need one?',
      answer: 'An SSL certificate encrypts data transmitted between your website and visitors, protecting sensitive information like passwords and credit card details. It also displays the padlock icon in browsers, builds customer trust, improves SEO rankings, and is required for PCI compliance if you process payments.',
    },
    {
      question: 'How long does it take to get my SSL certificate?',
      answer: 'Most SSL certificates are issued within 30 minutes after domain validation.',
    },
    {
      question: 'What is the difference between Single Domain, Multi-Domain, and Wildcard certificates?',
      answer: 'Single Domain certificates protect one specific domain (e.g., example.com). Multi-Domain certificates protect up to 3 different domains under one certificate. If you protect only the main domains like example.com, example1.com, and example3.com, it won’t include the www versions. So www.example.com, www.example1.com, and www.example3.com will not be protected unless you add them separately. Wildcard certificates protect unlimited subdomains of a single domain (e.g., *.example.com covers blog.example.com, shop.example.com, etc.).',
    },
    {
      question: 'Can I transfer my SSL certificate to a different server?',
      answer: 'Yes, SSL certificates are portable. You can transfer your certificate to a different server by exporting the private key and certificate files from your current server and importing them to the new one.',
    },
    {
      question: 'What happens if my SSL certificate expires?',
      answer: 'When an SSL certificate expires, browsers will display security warnings to visitors, potentially causing them to leave your site. We send renewal reminders 30, 14, and 7 days before expiration. You can renew anytime within 90 days of expiration without losing any remaining time on your current certificate.',
    },
    {
      question: 'Do you offer installation support?',
      answer: 'Yes! We provide comprehensive installation guides for all major server types and control panels. If you need hands-on assistance, our support team is available 24/7 to guide you through the installation process. Premium customers receive free installation service.',
    },
  ];

  const toggleFAQ = (index: number) => {
    if (!isHydrated) return;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`bg-background py-16 lg:py-24 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about SSL certificates and our services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card rounded-xl border border-border overflow-hidden hover:border-primary transition-colors duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                disabled={!isHydrated}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-muted transition-colors duration-300 disabled:cursor-default"
              >
                <span className="text-lg font-semibold text-foreground pr-4">
                  {faq.question}
                </span>
                <Icon
                  name="ChevronDownIcon"
                  size={24}
                  className={`flex-shrink-0 text-primary transition-transform duration-300 ${
                    isHydrated && openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {isHydrated && openIndex === index && (
                <div className="px-6 pb-6 text-muted-foreground leading-relaxed animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Still have questions? We&apos;re here to help!
          </p>
          <a
            href="/support-center"
            className="inline-flex items-center text-primary hover:text-primary/80 font-semibold transition-colors duration-300"
          >
            Visit Support Center
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;