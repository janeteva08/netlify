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
    
    </section>);

};

export default PartnerLogos;