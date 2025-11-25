'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PlanCard from './PlanCard';
import ComparisonTable from './ComparisonTable';
import UseCaseCard from './UseCaseCard';
import PriceCalculator from './PriceCalculator';
import TestimonialCard from './TestimonialCard';
import FAQSection from './FAQSection';
import TrustBadges from './TrustBadges';
import Icon from '@/components/ui/AppIcon';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  description: string;
  price: string;
  billingPeriod: string;
  features: PlanFeature[];
  recommended?: boolean;
}

interface ComparisonFeature {
  name: string;
  singleDomain: boolean | string;
  multiDomain: boolean | string;
  wildcard: boolean | string;
}

interface UseCase {
  icon: string;
  title: string;
  description: string;
  recommendedPlan: string;
  examples: string[];
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  alt: string;
  rating: number;
  text: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface TrustBadge {
  icon: string;
  title: string;
  description: string;
}

interface SSLPlansInteractiveProps {
  plans: Plan[];
  comparisonFeatures: ComparisonFeature[];
  useCases: UseCase[];
  testimonials: Testimonial[];
  faqs: FAQ[];
  trustBadges: TrustBadge[];
}

export default function SSLPlansInteractive({
  plans,
  comparisonFeatures,
  useCases,
  testimonials,
  faqs,
  trustBadges
}: SSLPlansInteractiveProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleOrderClick = (planId: string) => {
    router.push(`/order-ssl-certificate?plan=${planId}`);
  };

  const basePrices = {
    singleDomain: 24,
    multiDomain: 45,
    wildcard: 90
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          SSL Certificate Plans & Pricing
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Choose the perfect SSL certificate for your website. All plans include 256-bit encryption, 
    and 24/7 support.
        </p>
      </section>

      {/* Trust Badges */}
      <section>
        <TrustBadges badges={trustBadges} />
      </section>

      {/* Plans Grid */}
      <section>
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          Choose Your Protection Level
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              billingPeriod={plan.billingPeriod}
              features={plan.features}
              recommended={plan.recommended}
              onOrderClick={() => handleOrderClick(plan.id)}
            />
          ))}
        </div>
      </section>

      {/* Price Calculator */}
      

      {/* Use Cases */}
      <section className="bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            Which Certificate Is Right for You?
          </h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            Find the perfect SSL certificate based on your specific business needs and website structure.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <UseCaseCard
                key={index}
                icon={useCase.icon}
                title={useCase.title}
                description={useCase.description}
                recommendedPlan={useCase.recommendedPlan}
                examples={useCase.examples}
              />
            ))}
          </div>
        </div>
      </section>

      

      {/* Testimonials */}
      <section className="bg-muted/30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground text-center mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground text-center mb-12">
            Join thousands of satisfied customers who trust ShieldxSSL for their security needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                name={testimonial.name}
                role={testimonial.role}
                company={testimonial.company}
                image={testimonial.image}
                alt={testimonial.alt}
                rating={testimonial.rating}
                text={testimonial.text}
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-foreground text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-muted-foreground text-center mb-8">
          Find answers to common questions about our SSL certificate plans.
        </p>
        
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative">
            <Icon
              name="MagnifyingGlassIcon"
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-foreground"
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <FAQSection faqs={filteredFAQs} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-primary-foreground mb-4">
          Ready to Secure Your Website?
        </h2>
        <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
          Get started with ShieldxSSL today and protect your website with industry-leading encryption.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push('/order-ssl-certificate')}
            className="px-8 py-4 bg-conversion-orange text-conversion-orange-foreground rounded-lg font-semibold hover:bg-conversion-orange/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Order Certificate Now
          </button>
          <button
            onClick={() => router.push('/support-center')}
            className="px-8 py-4 bg-card text-foreground border-2 border-card rounded-lg font-semibold hover:bg-card/90 transition-all duration-300"
          >
            Contact Sales
          </button>
        </div>
      </section>
    </div>
  );
}