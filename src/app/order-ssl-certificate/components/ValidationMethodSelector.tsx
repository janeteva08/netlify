import Icon from '@/components/ui/AppIcon';

interface ValidationMethod {
  id: string;
  name: string;
  description: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  icon: string;
}

interface ValidationMethodSelectorProps {
  selectedMethod: string;
  onMethodSelect: (methodId: string) => void;
}

const validationMethods: ValidationMethod[] = [
  {
    id: 'email',
    name: 'Email Validation',
    description: 'Receive a validation email at admin@yourdomain.com or other standard addresses',
    duration: '5-10 minutes',
    difficulty: 'Easy',
    icon: 'EnvelopeIcon'
  },
  {
    id: 'dns',
    name: 'DNS Validation',
    description: 'Add a TXT record to your domain\'s DNS settings for verification',
    duration: '10-30 minutes',
    difficulty: 'Medium',
    icon: 'GlobeAltIcon'
  },
  {
    id: 'file',
    name: 'File Upload Validation',
    description: 'Upload a verification file to your website\'s root directory',
    duration: '5-15 minutes',
    difficulty: 'Medium',
    icon: 'DocumentTextIcon'
  }
];

export default function ValidationMethodSelector({ selectedMethod, onMethodSelect }: ValidationMethodSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-foreground mb-4">Choose Validation Method</h2>
      <p className="text-sm text-muted-foreground mb-4">
        Select how you'd like to verify domain ownership. We recommend email validation for fastest processing.
      </p>
      
      <div className="space-y-3">
        {validationMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => onMethodSelect(method.id)}
            className={`w-full p-4 rounded-lg border-2 transition-all duration-300 text-left hover:shadow-md ${
              selectedMethod === method.id
                ? 'border-primary bg-trust-light' :'border-border bg-card hover:border-primary/50'
            }`}
          >
            <div className="flex items-start">
              <div className={`p-2 rounded-lg mr-4 ${
                selectedMethod === method.id ? 'bg-primary' : 'bg-muted'
              }`}>
                <Icon
                  name={method.icon as any}
                  size={24}
                  className={selectedMethod === method.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold text-foreground">{method.name}</h3>
                  {selectedMethod === method.id && (
                    <Icon name="CheckCircleIcon" variant="solid" size={20} className="text-primary" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                <div className="flex items-center space-x-4 text-xs">
                  <span className="flex items-center text-muted-foreground">
                    <Icon name="ClockIcon" size={14} className="mr-1" />
                    {method.duration}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full font-medium ${
                    method.difficulty === 'Easy' ?'bg-conversion-green/10 text-conversion-green'
                      : method.difficulty === 'Medium' ?'bg-warning/10 text-warning' :'bg-destructive/10 text-destructive'
                  }`}>
                    {method.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {selectedMethod === 'email' && (
        <div className="bg-muted rounded-lg p-4 mt-4">
          <p className="text-sm text-foreground font-medium mb-2">Available Email Addresses:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• admin@yourdomain.com</li>
            <li>• administrator@yourdomain.com</li>
            <li>• webmaster@yourdomain.com</li>
            <li>• hostmaster@yourdomain.com</li>
            <li>• postmaster@yourdomain.com</li>
          </ul>
        </div>
      )}
    </div>
  );
}