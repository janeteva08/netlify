import Icon from '@/components/ui/AppIcon';

interface OrderDetailsProps {
  orderId: string;
  domain: string;
  certificateType: string;
  orderDate: string;
  validationMethod: string;
  status: string;
}

const OrderDetails = ({
  orderId,
  domain,
  certificateType,
  orderDate,
  validationMethod,
  status,
}: OrderDetailsProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'in progress':
        return 'text-warning bg-warning/10';
      case 'pending':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Order Details</h2>
        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <Icon name="IdentificationIcon" size={20} className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Order ID</p>
            <p className="text-base font-semibold text-foreground">{orderId}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Icon name="GlobeAltIcon" size={20} className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Domain Name</p>
            <p className="text-base font-semibold text-foreground break-all">{domain}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheckIcon" size={20} className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Certificate Type</p>
            <p className="text-base font-semibold text-foreground">{certificateType}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Icon name="CalendarIcon" size={20} className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Order Date</p>
            <p className="text-base font-semibold text-foreground">{orderDate}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Icon name="CheckBadgeIcon" size={20} className="text-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground">Validation Method</p>
            <p className="text-base font-semibold text-foreground">{validationMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;