import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import SSLPlansInteractive from './components/SSLPlansInteractive';

export const metadata: Metadata = {
  title: 'SSL Plans & Pricing - ShieldxSSL',
  description: 'Compare SSL certificate plans and choose the perfect protection for your website. Single Domain, Multi-Domain, and Wildcard options with transparent pricing and clear guidance.'
};

export default function SSLPlansPage() {
  const plans = [
  {
    id: 'single-domain',
    name: 'Single Domain',
    description: 'Perfect for individual websites and blogs',
    price: '24',
    billingPeriod: 'year',
    recommended: false,
    features: [
    { text: 'Secures one domain (e.g., example.com)', included: true },
    { text: '256-bit encryption', included: true },
    { text: 'Domain Validation (DV)', included: true },
    { text: 'Standard Trust Level ', included: true },
    { text: '24/7 customer support', included: true },
    { text: 'Issued within 30 minutes', included: true },
    { text: 'Compatible with all browsers', included: true },
    { text: 'Free reissues', included: true },
    { text: 'Multiple domain protection', included: false }]

  },
  {
    id: 'multi-domain',
    name: 'Multi-Domain',
    description: 'Ideal for businesses with multiple websites',
    price: '45',
    billingPeriod: 'year',
    recommended: true,
    features: [
    { text: 'Secures 3 domains', included: true },
    { text: '256-bit encryption', included: true },
    { text: 'Domain Validation (DV)', included: true },
    { text: 'Standard Trust Level ', included: true },
    { text: 'Priority 24/7 support', included: true },
    { text: 'Issued within 30 minutes', included: true },
    { text: 'Compatible with all browsers', included: true },
    { text: 'Free reissues', included: true },
    { text: 'Add additional domains anytime $10/SAN', included: true },
    { text: 'Free Installation', included: true }]

  },
  {
    id: 'wildcard',
    name: 'Wildcard',
    description: 'Best for sites with unlimited subdomains',
    price: '90',
    billingPeriod: 'year',
    recommended: false,
    features: [
    { text: 'Secures unlimited subdomains', included: true },
    { text: '256-bit encryption', included: true },
    { text: 'Domain Validation (DV)', included: true },
    { text: 'Standard Trust Level ', included: true },
    { text: 'VIP 24/7 support', included: true },
    { text: 'Issued within 30 minutes', included: true },
    { text: 'Compatible with all browsers', included: true },
    { text: 'Free reissues', included: true },
    { text: 'Protects *.example.com', included: true },
    { text: 'Perfect for SaaS platforms', included: true },
    

  }];


  const comparisonFeatures = [
  { name: 'Encryption Level', singleDomain: '256-bit', multiDomain: '256-bit', wildcard: '256-bit' },
  { name: 'Warranty Coverage', singleDomain: '$10,000', multiDomain: '$50,000', wildcard: '$100,000' },
  { name: 'Number of Domains', singleDomain: '1', multiDomain: 'Up to 5', wildcard: '1 + Unlimited Subdomains' },
  { name: 'Issuance Time', singleDomain: '30 minutes', multiDomain: '30 minutes', wildcard: '30 minutes' },
  { name: 'Browser Compatibility', singleDomain: true, multiDomain: true, wildcard: true },
  { name: 'Mobile Device Support', singleDomain: true, multiDomain: true, wildcard: true },
  { name: 'Trust Seal', singleDomain: true, multiDomain: true, wildcard: true },
  { name: 'Free Reissues', singleDomain: true, multiDomain: true, wildcard: true },
  { name: 'Subdomain Protection', singleDomain: false, multiDomain: false, wildcard: true },
  { name: 'Multiple Domain Support', singleDomain: false, multiDomain: true, wildcard: false },
  { name: 'Priority Support', singleDomain: false, multiDomain: true, wildcard: true },
  { name: 'Dedicated Account Manager', singleDomain: false, multiDomain: false, wildcard: true }];


  const useCases = [
  {
    icon: 'GlobeAltIcon',
    title: 'Single Website',
    description: 'You have one main website or blog that needs protection',
    recommendedPlan: 'Single Domain',
    examples: [
    'Personal blogs and portfolios',
    'Small business websites',
    'Landing pages',
    'Single e-commerce stores']

  },
  {
    icon: 'BuildingOfficeIcon',
    title: 'Multiple Websites',
    description: 'You manage several different domains for your business',
    recommendedPlan: 'Multi-Domain',
    examples: [
    'Multiple brand websites',
    'Regional business sites',
    'Product-specific domains',
    'Marketing campaign sites']

  },
  {
    icon: 'ServerIcon',
    title: 'SaaS Platform',
    description: 'You need to secure unlimited subdomains for your application',
    recommendedPlan: 'Wildcard',
    examples: [
    'Multi-tenant SaaS applications',
    'Customer portal systems',
    'API endpoints',
    'Development and staging environments']

  },
  {
    icon: 'ShoppingCartIcon',
    title: 'E-commerce Store',
    description: 'You run an online store with customer transactions',
    recommendedPlan: 'Single Domain or Multi-Domain',
    examples: [
    'Online retail stores',
    'Payment processing pages',
    'Customer account portals',
    'Checkout systems']

  },
  {
    icon: 'AcademicCapIcon',
    title: 'Educational Platform',
    description: 'You provide online learning or educational services',
    recommendedPlan: 'Wildcard',
    examples: [
    'Learning management systems',
    'Student portals',
    'Course delivery platforms',
    'Educational resource sites']

  },
  {
    icon: 'UserGroupIcon',
    title: 'Community Platform',
    description: 'You host a community or membership site',
    recommendedPlan: 'Wildcard',
    examples: [
    'Member-only content areas',
    'Forum and discussion boards',
    'Social networking sites',
    'User-generated content platforms']

  }];


  const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'E-commerce Manager',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a9e8814c-1763296696290.png",
    alt: 'Professional woman with brown hair in business attire smiling at camera',
    rating: 5,
    text: 'ShieldxSSL made securing our online store incredibly simple. The Multi-Domain certificate was perfect for our main site and regional stores. Setup took less than 30 minutes!'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_183fc715d-1763301362797.png",
    alt: 'Asian man with glasses in navy suit smiling confidently',
    rating: 5,
    text: 'The Wildcard certificate was exactly what we needed for our SaaS platform. Protecting unlimited subdomains with one certificate saves us time and money. Excellent service!'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Digital Marketing Director',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11504e941-1763295994346.png",
    alt: 'Hispanic woman with long dark hair in professional blazer smiling warmly',
    rating: 5,
    text: 'We manage multiple client websites and ShieldxSSL\'s pricing and support are unbeatable. The comparison tools helped us choose the right certificates for each client.'
  },
  {
    name: 'David Thompson',
    role: 'Small Business Owner',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_191a43c60-1763294769851.png",
    alt: 'Middle-aged man with gray beard in casual business attire smiling',
    rating: 5,
    text: 'As a small business owner, I was worried about the technical aspects of SSL. ShieldxSSL\'s team walked me through everything. Now my customers shop with confidence!'
  },
  {
    name: 'Jennifer Park',
    role: 'Web Developer',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a57c74dc-1763294365205.png",
    alt: 'Young Asian woman with short black hair in modern office setting',
    rating: 5,
    text: 'I recommend ShieldxSSL to all my clients. The certificates are affordable, installation is straightforward, and the support team is always responsive. Perfect for developers!'
  },
  {
    name: 'Robert Anderson',
    role: 'IT Manager',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_12aee3bb1-1763293581826.png",
    alt: 'Professional man in dark suit with confident expression',
    rating: 5,
    text: 'Security is critical in healthcare. ShieldxSSL\'s certificates meet all our compliance requirements, and their warranty coverage gives us peace of mind. Highly recommended!'
  }];


  const faqs = [
  {
    question: 'What is the difference between Single Domain, Multi-Domain, and Wildcard certificates?',
    answer: 'A Single Domain certificate secures one specific domain (e.g., example.com). A Multi-Domain certificate can secure up to 3 different domains by default with one certificate (e.g., example.com, example.net, mysite.com). A Wildcard certificate secures one domain and all its subdomains (e.g., example.com, blog.example.com, shop.example.com).'
  },
  {
    question: 'How long does it take to receive my SSL certificate?',
    answer: 'All our SSL certificates are issued within 30 minutes of order completion and domain validation. You will receive your certificate files via email immediately after validation is complete.'
  },
  
  {
    question: 'What validation methods do you support?',
    answer: 'We support three validation methods: Email Validation (fastest, completed in minutes), DNS Validation (ideal for automated deployments), and HTTP File Validation (perfect for standard web hosting). You can choose your preferred method during the order process.'
  },
  {
    question: 'Do you offer refunds?',
    answer: 'Yes, we offer money-back guarantee on all SSL certificates only if SSL is not Issued.'
  },
  {
    question: 'Are your certificates compatible with all browsers?',
    answer: 'Yes, all our SSL certificates are compatible with 99.9% of browsers and mobile devices, including Chrome, Firefox, Safari, Edge, and all major mobile browsers. Your customers will see the secure padlock icon regardless of their browser.'
  },
  {
    question: 'What happens when my certificate expires?',
    answer: 'We will send you renewal reminders 60, 30, and 7 days before your certificate expires. You can renew your certificate at any time, and we recommend renewing early to avoid any service interruption.'
  },
  {
    question: 'Can I use one certificate on multiple servers?',
    answer: 'Yes, you can install your SSL certificate on multiple servers as long as they are serving the same domain(s). This is useful for load-balanced environments or backup servers.'
  },
  {
    question: 'Do you provide installation support?',
    answer: 'Yes! We provide detailed installation guides for all major web servers and hosting platforms. Our 24/7 support team is also available to assist you with installation if needed.'
  },
  ];


  const trustBadges = [
  {
    icon: 'ShieldCheckIcon',
    title: '256-Bit Encryption',
    description: 'Industry-standard encryption protecting your data with the highest security level'
  },
  {
    icon: 'ClockIcon',
    title: '30-Minute Issuance',
    description: 'Get your SSL certificate issued and ready to install in just 30 minutes'
  },
  {
    icon: 'ChatBubbleLeftRightIcon',
    title: '24/7 Support',
    description: 'Expert support team available around the clock to assist with any questions'
  }];


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SSLPlansInteractive
          plans={plans}
          comparisonFeatures={comparisonFeatures}
          useCases={useCases}
          testimonials={testimonials}
          faqs={faqs}
          trustBadges={trustBadges} />

      </main>
    </div>);

}
