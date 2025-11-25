'use client';

import { useState, useEffect } from 'react';
import OrderProgress from './OrderProgress';
import PlanSelector from './PlanSelector';
import DomainDetailsForm from './DomainDetailsForm';
import ValidationMethodSelector from './ValidationMethodSelector';
import OrderSummary from './OrderSummary';
import CSRGenerator from './CSRGenerator';
import Icon from '@/components/ui/AppIcon';
import { sslOrderService } from '@/services/sslOrderService';

export default function OrderCertificateInteractive() {
  const [isHydrated, setIsHydrated] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [validationMethod, setValidationMethod] = useState('');
  const [generatedCSR, setGeneratedCSR] = useState('');
  const [formData, setFormData] = useState({
    domain: '',
    email: '',
    organization: '',
    country: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');

  useEffect(() => {
    setIsHydrated(true);
    
    const savedData = localStorage.getItem('sslOrderDraft');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSelectedPlan(parsed?.selectedPlan ?? '');
        setFormData(parsed?.formData ?? formData);
        setValidationMethod(parsed?.validationMethod ?? '');
        setCurrentStep(parsed?.currentStep ?? 1);
      } catch (e) {
        console.error('Failed to parse saved order data');
      }
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    const draftData = {
      selectedPlan,
      formData,
      validationMethod,
      currentStep
    };
    localStorage.setItem('sslOrderDraft', JSON.stringify(draftData));
  }, [selectedPlan, formData, validationMethod, currentStep, isHydrated]);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1 && !selectedPlan) {
      newErrors.plan = 'Please select an SSL certificate plan';
    }

    if (step === 2) {
      if (!formData?.domain || !formData.domain.trim()) {
        newErrors.domain = 'Domain name is required';
      } else if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]$/i.test(formData.domain)) {
        newErrors.domain = 'Please enter a valid domain name';
      }

      if (!formData?.email || !formData.email.trim()) {
        newErrors.email = 'Contact email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    if (step === 3 && !validationMethod) {
      newErrors.validation = 'Please select a validation method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors?.[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4)) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      // Generate unique order ID
      const orderId = `SSL-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
      const orderDate = new Date().toISOString().split('T')?.[0] ?? '';
      
      // Map plan selection to certificate type
      const certificateType = 
        selectedPlan === 'single' ? 'Standard SSL' :
        selectedPlan === 'wildcard' ? 'Wildcard SSL' :
        selectedPlan === 'multi' ? 'Multi-Domain SSL' : 'Standard SSL';

      // Map validation method
      const validationMethodMapped = 
        validationMethod === 'email' ? 'Email Validation' :
        validationMethod === 'dns' ? 'DNS Validation' :
        validationMethod === 'file' ? 'File Upload Validation' : 'Email Validation';

      // Create order via Supabase
      const { data, error } = await sslOrderService.create({
        id: orderId,
        domain: formData?.domain ?? '',
        email: formData?.email ?? '',
        certificateType: certificateType as any,
        orderDate: orderDate,
        validationMethod: validationMethodMapped as any,
        csrKey: generatedCSR || undefined,
        organization: formData?.organization || undefined,
        country: formData?.country || undefined
      });

      if (error) {
        setSubmitError(error?.message ?? 'Failed to create order. Please try again.');
        setIsSubmitting(false);
        return;
      }

      // Clear draft and show success
      localStorage.removeItem('sslOrderDraft');
      setShowSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="h-32 bg-muted rounded-lg"></div>
              <div className="h-96 bg-muted rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="w-20 h-20 bg-conversion-green/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCircleIcon" variant="solid" size={48} className="text-conversion-green" />
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-4">Order Submitted Successfully!</h1>
              <p className="text-lg text-muted-foreground mb-6">
                Your SSL certificate order has been received and is being processed.
              </p>
              <div className="bg-trust-light border border-primary/20 rounded-lg p-6 mb-6 text-left">
                <h3 className="font-semibold text-foreground mb-3">What happens next?</h3>
                <ul className="space-y-2 text-sm text-trust-light-foreground">
                  <li className="flex items-start">
                    <Icon name="CheckIcon" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>You will receive a confirmation email at <strong>{formData?.email}</strong> within 5 minutes</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckIcon" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Domain validation instructions will be sent based on your selected method</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckIcon" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Certificate will be issued within 24 hours after validation</span>
                  </li>
                  <li className="flex items-start">
                    <Icon name="CheckIcon" size={16} className="text-primary mr-2 mt-0.5 flex-shrink-0" />
                    <span>Installation instructions will be provided with your certificate</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/check-ssl-status"
                  className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-semibold"
                >
                  Track Order Status
                </a>
                <a
                  href="/homepage"
                  className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-300 font-semibold"
                >
                  Return to Homepage
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Order SSL Certificate</h1>
            <p className="text-muted-foreground">
              Secure your website in minutes with our streamlined ordering process
            </p>
          </div>

          <OrderProgress currentStep={currentStep} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {currentStep === 1 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <PlanSelector selectedPlan={selectedPlan} onPlanSelect={setSelectedPlan} />
                  {errors?.plan && (
                    <p className="mt-4 text-sm text-destructive flex items-center">
                      <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                      {errors.plan}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 2 && (
                <>
                  <div className="bg-card border border-border rounded-lg p-6">
                    <DomainDetailsForm
                      formData={formData}
                      onFormChange={handleFormChange}
                      errors={errors}
                    />
                  </div>
                  <CSRGenerator onCSRGenerated={setGeneratedCSR} />
                </>
              )}

              {currentStep === 3 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <ValidationMethodSelector
                    selectedMethod={validationMethod}
                    onMethodSelect={setValidationMethod}
                  />
                  {errors?.validation && (
                    <p className="mt-4 text-sm text-destructive flex items-center">
                      <Icon name="ExclamationCircleIcon" size={16} className="mr-1" />
                      {errors.validation}
                    </p>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-6">Review Your Order</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-muted rounded-lg p-4">
                      <h3 className="font-semibold text-foreground mb-3">Certificate Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plan:</span>
                          <span className="text-foreground font-medium">
                            {selectedPlan === 'single' && 'Single Domain SSL'}
                            {selectedPlan === 'wildcard' && 'Wildcard SSL'}
                            {selectedPlan === 'multi' && 'Multi-Domain SSL'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Domain:</span>
                          <span className="text-foreground font-medium">{formData?.domain}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Organization:</span>
                          <span className="text-foreground font-medium">{formData?.organization}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Validation:</span>
                          <span className="text-foreground font-medium">
                            {validationMethod === 'email' && 'Email Validation'}
                            {validationMethod === 'dns' && 'DNS Validation'}
                            {validationMethod === 'file' && 'File Upload Validation'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-trust-light border border-primary/20 rounded-lg p-4">
                      <div className="flex items-start">
                        <Icon name="InformationCircleIcon" size={20} className="text-primary mr-3 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-trust-light-foreground">
                          <p className="font-medium mb-2">Before you submit:</p>
                          <ul className="space-y-1 list-disc list-inside">
                            <li>Ensure your domain information is correct</li>
                            <li>Verify you have access to the validation email address</li>
                            <li>Review the total amount and billing details</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {submitError && (
                      <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                        <p className="text-destructive text-sm font-medium flex items-center">
                          <Icon name="ExclamationCircleIcon" size={16} className="mr-2" />
                          {submitError}
                        </p>
                      </div>
                    )}

                    <div className="flex items-start">
                     
                      
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-muted transition-colors duration-300 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  <Icon name="ChevronLeftIcon" size={20} className="mr-1" />
                  Back
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-300 font-semibold flex items-center"
                  >
                    Continue
                    <Icon name="ChevronRightIcon" size={20} className="ml-1" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-conversion-orange text-conversion-orange-foreground rounded-lg hover:bg-conversion-orange/90 transition-colors duration-300 font-semibold flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin mr-2">⏳</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Icon name="ShieldCheckIcon" size={20} className="mr-2" />
                        Complete Order
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <OrderSummary
                selectedPlan={selectedPlan}
                formData={formData}
                validationMethod={validationMethod}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}