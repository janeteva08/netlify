import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import OrderCertificateInteractive from './components/OrderCertificateInteractive';

export const metadata: Metadata = {
  title: 'Order SSL Certificate - ShieldxSSL',
  description: 'Secure your website with our streamlined SSL certificate ordering process. Choose from Single Domain, Wildcard, or Multi-Domain certificates with instant validation and 24/7 support.',
};

export default function OrderSSLCertificatePage() {
  return (
    <>
      <Header />
      <OrderCertificateInteractive />
    </>
  );
}