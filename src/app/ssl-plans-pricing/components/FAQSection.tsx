'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors duration-200"
          >
            <span className="font-semibold text-foreground pr-4">{faq.question}</span>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className={`text-primary flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openIndex === index && (
            <div className="px-6 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">
              {faq.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}