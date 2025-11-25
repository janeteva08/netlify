import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface Partner {
  id: number;
  name: string;
  logo: string;
  alt: string;
  category: string;
}

const partners: Partner[] = [
{
  id: 1,
  name: "Amazon Web Services",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_17569da15-1763909720046.png",
  alt: "Amazon Web Services cloud computing logo with orange smile arrow on white background",
  category: "Cloud Infrastructure"
},
{
  id: 2,
  name: "Microsoft Azure",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15601fea0-1763909720899.png",
  alt: "Microsoft Azure cloud platform logo with blue gradient design on technology background",
  category: "Cloud Services"
},
{
  id: 3,
  name: "Google Cloud",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_187f46a77-1763909722167.png",
  alt: "Google Cloud Platform logo with multicolor design on modern tech workspace background",
  category: "Cloud Computing"
},
{
  id: 4,
  name: "Cloudflare",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_163ec2368-1763909720657.png",
  alt: "Cloudflare network security logo with orange cloud icon on digital infrastructure background",
  category: "Security & CDN"
},
{
  id: 5,
  name: "DigiCert",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_15960cc2c-1763909719797.png",
  alt: "DigiCert certificate authority logo with blue checkmark on security certificate background",
  category: "Certificate Authority"
},
{
  id: 6,
  name: "Sectigo",
  logo: "https://img.rocket.new/generatedImages/rocket_gen_img_192df18f3-1763909721068.png",
  alt: "Sectigo SSL certificate provider logo with shield design on cybersecurity background",
  category: "SSL Provider"
}];


const PartnerLogos = () => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Trusted Technology Partners
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We collaborate with industry-leading technology companies to deliver the most secure and reliable SSL certificate solutions.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) =>
          <div
            key={partner.id}
            className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col items-center justify-center">

              <div className="relative w-full h-20 mb-3 rounded-lg overflow-hidden bg-muted">
                <AppImage
                src={partner.logo}
                alt={partner.alt}
                className="w-full h-full object-contain p-2" />

              </div>
              <h3 className="text-sm font-semibold text-foreground text-center mb-1">
                {partner.name}
              </h3>
              <p className="text-xs text-muted-foreground text-center">
                {partner.category}
              </p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-trust-light border border-trust-blue/20 rounded-xl p-6 lg:p-8 text-center">
          <h3 className="text-xl font-bold text-foreground mb-3">
            Partnership Excellence
          </h3>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Our strategic partnerships with leading technology providers ensure that you receive SSL certificates backed by the most trusted names in cybersecurity. These collaborations enable us to offer enterprise-grade security solutions with seamless integration across all major platforms.
          </p>
        </div>
      </div>
    </section>);

};

export default PartnerLogos;