'use client';

import { useState, useEffect } from 'react';
import StatusSearchForm from './StatusSearchForm';
import StatusTracker from './StatusTracker';
import OrderDetails from './OrderDetails';
import NextSteps from './NextSteps';
import SupportContact from './SupportContact';
import { sslOrderService } from '@/services/sslOrderService';


interface StatusStep {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
  timestamp?: string;
  estimatedCompletion?: string;
}

interface NextStep {
  id: number;
  title: string;
  description: string;
  action?: string;
  actionLink?: string;
}

interface OrderData {
  orderId: string;
  domain: string;
  email: string;
  certificateType: string;
  orderDate: string;
  validationMethod: string;
  status: string;
  steps: StatusStep[];
  nextSteps: NextStep[];
}

// Helper function to map admin status to status steps
const getStatusSteps = (status: string, orderDate: string): StatusStep[] => {
  const baseSteps: StatusStep[] = [
    {
      id: 1,
      title: 'Order Received',
      description: 'Your SSL certificate order has been received and is being processed.',
      status: 'completed',
      timestamp: orderDate,
    },
  ];

  if (status === 'Payment Pending') {
    return [
      ...baseSteps,
      {
        id: 2,
        title: 'Payment Processing',
        description: 'Waiting for payment confirmation. Please complete your payment to proceed.',
        status: 'in-progress',
        estimatedCompletion: 'Awaiting payment',
      },
      {
        id: 3,
        title: 'Domain Validation',
        description: 'Domain ownership verification will begin after payment confirmation.',
        status: 'pending',
        estimatedCompletion: 'After payment',
      },
      {
        id: 4,
        title: 'Certificate Generation',
        description: 'SSL certificate will be generated once domain validation is complete.',
        status: 'pending',
        estimatedCompletion: '1-2 hours after validation',
      },
      {
        id: 5,
        title: 'Certificate Delivery',
        description: 'Your SSL certificate files will be delivered via email and available for download.',
        status: 'pending',
        estimatedCompletion: 'Immediately after generation',
      },
    ];
  }

  if (status === 'In Progress') {
    return [
      ...baseSteps,
      {
        id: 2,
        title: 'Payment Confirmed',
        description: 'Payment has been successfully processed and verified.',
        status: 'completed',
        timestamp: orderDate,
      },
      {
        id: 3,
        title: 'Domain Validation',
        description: 'Verifying domain ownership through the selected validation method. Please ensure you have completed the required steps.',
        status: 'in-progress',
        estimatedCompletion: 'Within 24 hours',
      },
      {
        id: 4,
        title: 'Certificate Generation',
        description: 'SSL certificate will be generated once domain validation is complete.',
        status: 'pending',
        estimatedCompletion: '1-2 hours after validation',
      },
      {
        id: 5,
        title: 'Certificate Delivery',
        description: 'Your SSL certificate files will be delivered via email',
        status: 'pending',
        estimatedCompletion: 'Immediately after generation',
      },
    ];
  }

  if (status === 'Issued') {
    return [
      ...baseSteps,
      {
        id: 2,
        title: 'Payment Confirmed',
        description: 'Payment has been successfully processed and verified.',
        status: 'completed',
        timestamp: orderDate,
      },
      {
        id: 3,
        title: 'Domain Validation',
        description: 'Domain ownership has been successfully verified.',
        status: 'completed',
        timestamp: orderDate,
      },
      {
        id: 4,
        title: 'Certificate Generation',
        description: 'SSL certificate has been successfully generated.',
        status: 'completed',
        timestamp: orderDate,
      },
      {
        id: 5,
        title: 'Certificate Delivery',
        description: 'Your SSL certificate has been issued and sent to your email. Check your inbox for installation instructions.',
        status: 'completed',
        timestamp: orderDate,
      },
    ];
  }

  return baseSteps;
};

// Helper function to get next steps based on status
const getNextSteps = (status: string): NextStep[] => {
  if (status === 'Payment Pending') {
    return [
      {
        id: 1,
        title: 'Complete Payment',
        description: 'Please complete your payment to proceed with the SSL certificate issuance process.',
        action: 'Make Payment',
        actionLink: '/payment',
      },
      {
        id: 2,
        title: 'Contact Support',
        description: 'If you have any questions about the payment process, our support team is here to help.',
        action: 'Contact Support',
        actionLink: '/support-center',
      },
    ];
  }

  if (status === 'In Progress') {
    return [
      {
        id: 1,
        title: 'Complete Validation',
        description: 'Add the required DNS record or complete the validation method you selected during order placement.',
        action: 'View Validation Instructions',
        actionLink: '/support-center',
      },
      {
        id: 2,
        title: 'Monitor Your Email',
        description: 'We will send you updates as your certificate progresses through each stage. Make sure to check your spam folder.',
      },
      {
        id: 3,
        title: 'Free Installation',
        description: 'Contact at support@shieldxssl.com for SSL Installation or Review our installation guides to prepare for certificate deployment once it is ready.',
        action: 'View Installation Guides',
        actionLink: '/support-center',
      },
    ];
  }

  if (status === 'Issued') {
    return [
      {
        id: 1,
        title: 'Download Certificate',
        description: 'Your SSL certificate files have been sent to your email. Download and save them securely.',
        action: 'Check Email',
        actionLink: 'mailto:',
      },
      {
        id: 2,
        title: 'Install Certificate',
        description: 'Follow our step-by-step installation guide to deploy your SSL certificate on your server.',
        action: 'Installation Guide',
        actionLink: '/support-center',
      },
      {
        id: 3,
        title: 'Test Your SSL',
        description: 'After installation, verify that your SSL certificate is working correctly across all browsers.',
        action: 'Test SSL',
        actionLink: '/support-center',
      },
    ];
  }

  return [];
};

const CheckSSLStatusInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string>('');

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Auto-refresh order data every 5 seconds using Supabase subscription
  useEffect(() => {
    if (!orderData) return;

    // Set up real-time subscription for the specific order
    const unsubscribe = sslOrderService.subscribeToOrderChanges((updatedOrder) => {
      if (updatedOrder?.id === orderData?.orderId && updatedOrder?.status !== orderData?.status) {
        // Status has changed, refresh the display
        const refreshedOrderData: OrderData = {
          orderId: updatedOrder?.id ?? '',
          domain: updatedOrder?.domain ?? '',
          email: updatedOrder?.email ?? '',
          certificateType: updatedOrder?.certificateType ?? '',
          orderDate: updatedOrder?.orderDate ?? '',
          validationMethod: updatedOrder?.validationMethod ?? '',
          status: updatedOrder?.status ?? '',
          steps: getStatusSteps(updatedOrder?.status ?? '', updatedOrder?.orderDate ?? ''),
          nextSteps: getNextSteps(updatedOrder?.status ?? ''),
        };
        setOrderData(refreshedOrderData);
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, [orderData]);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="w-full px-4 py-12 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-12 bg-muted rounded w-1/3"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleSearch = async (domain: string, email: string) => {
    setIsSearching(true);
    setSearchError('');
    
    try {
      // Search Supabase for order by domain or email
      const { data: foundOrder, error } = await sslOrderService.findByDomainOrEmail(
        domain || undefined,
        email || undefined
      );

      if (error || !foundOrder) {
        setSearchError(error?.message ?? 'No order found with the provided domain or email. Please check your information and try again.');
        setIsSearching(false);
        return;
      }

      // Map the found order to OrderData format
      const mappedOrderData: OrderData = {
        orderId: foundOrder?.id ?? '',
        domain: foundOrder?.domain ?? '',
        email: foundOrder?.email ?? '',
        certificateType: foundOrder?.certificateType ?? '',
        orderDate: foundOrder?.orderDate ?? '',
        validationMethod: foundOrder?.validationMethod ?? '',
        status: foundOrder?.status ?? '',
        steps: getStatusSteps(foundOrder?.status ?? '', foundOrder?.orderDate ?? ''),
        nextSteps: getNextSteps(foundOrder?.status ?? ''),
      };
      
      setOrderData(mappedOrderData);
      setIsSearching(false);
    } catch (error) {
      console.error('Error searching for order:', error);
      setSearchError('An error occurred while searching for your order. Please try again.');
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full">
      {!orderData ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Check Your SSL Certificate Status
            </h1>
            <p className="text-lg text-muted-foreground">
              Enter your domain or email to track your certificate order in real-time
            </p>
          </div>
          
          {isSearching ? (
            <div className="bg-card rounded-lg border border-border p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
              <p className="text-lg font-medium text-foreground">Retrieving your order status...</p>
            </div>
          ) : (
            <>
              <StatusSearchForm onSearch={handleSearch} />
              {searchError && (
                <div className="mt-4 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-destructive text-sm font-medium">{searchError}</p>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <div className="text-center lg:text-left">
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              SSL Certificate Status
            </h1>
            <p className="text-lg text-muted-foreground">
              Track your certificate progress and manage your order preferences
            </p>
            <div className="mt-2 inline-flex items-center px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse mr-2"></span>
              <span className="text-xs text-primary font-medium">Live updates via real-time subscription</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6 lg:space-y-8">
              <StatusTracker
                orderId={orderData?.orderId}
                domain={orderData?.domain}
                certificateType={orderData?.certificateType}
                steps={orderData?.steps}
              />
              
              <NextSteps steps={orderData?.nextSteps} />
              
            </div>

            <div className="space-y-6 lg:space-y-8">
              <OrderDetails
                orderId={orderData?.orderId}
                domain={orderData?.domain}
                certificateType={orderData?.certificateType}
                orderDate={orderData?.orderDate}
                validationMethod={orderData?.validationMethod}
                status={orderData?.status}
              />
              
              <SupportContact orderId={orderData?.orderId} />
              
              <button
                onClick={() => {
                  setOrderData(null);
                  setSearchError('');
                }}
                className="w-full px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/80 transition-all duration-300"
              >
                Check Another Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckSSLStatusInteractive;