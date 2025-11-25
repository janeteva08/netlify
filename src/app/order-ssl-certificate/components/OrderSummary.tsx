

interface OrderSummaryProps {
  selectedPlan: string;
  formData: {
    domain: string;
    email: string;
    organization: string;
    country: string;
  };
  validationMethod: string;
}

const planDetails: Record<string, { name: string; price: number }> = {
  single: { name: 'Single Domain SSL', price: 24 },
  wildcard: { name: 'Wildcard SSL', price: 90 },
  multi: { name: 'Multi-Domain SSL', price: 45 }
};

const validationNames: Record<string, string> = {
  email: 'Email Validation',
  dns: 'DNS Validation',
  file: 'File Upload Validation'
};

export default function OrderSummary({ selectedPlan, formData, validationMethod }: OrderSummaryProps) {
  const plan = planDetails[selectedPlan];
  const subtotal = plan?.price || 0;
  const tax = subtotal * 0.0;
  const total = subtotal + tax;

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-foreground mb-4">Order Summary</h3>
      
      <div className="space-y-4 mb-6">
        {plan && (
          <div className="pb-4 border-b border-border">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-foreground">{plan.name}</p>
                <p className="text-sm text-muted-foreground">1 Year Certificate</p>
              </div>
              <p className="font-semibold text-foreground">${plan.price}</p>
            </div>
          </div>
        )}

        {formData.domain && (
          <div className="pb-4 border-b border-border">
            <p className="text-sm font-medium text-muted-foreground mb-2">Domain</p>
            <p className="text-sm text-foreground font-medium">{formData.domain}</p>
          </div>
        )}

        {validationMethod && (
          <div className="pb-4 border-b border-border">
            <p className="text-sm font-medium text-muted-foreground mb-2">Validation Method</p>
            <p className="text-sm text-foreground">{validationNames[validationMethod]}</p>
          </div>
        )}

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground font-medium">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            
          </div>
          <div className="flex justify-between text-base font-semibold pt-2 border-t border-border">
            <span className="text-foreground">Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}