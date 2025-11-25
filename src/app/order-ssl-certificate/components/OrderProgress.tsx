interface OrderProgressProps {
  currentStep: number;
}

const steps = [
  { number: 1, label: 'Select Plan' },
  { number: 2, label: 'Domain Details' },
  { number: 3, label: 'Validation' },
  { number: 4, label: 'Review & Pay' }
];

export default function OrderProgress({ currentStep }: OrderProgressProps) {
  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300 ${
                  currentStep >= step.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step.number}
              </div>
              <span
                className={`mt-2 text-xs font-medium transition-colors duration-300 ${
                  currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 -mt-8">
                <div
                  className={`h-full transition-all duration-300 ${
                    currentStep > step.number ? 'bg-primary' : 'bg-border'
                  }`}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}