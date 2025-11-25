import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface Milestone {
  id: number;
  year: string;
  title: string;
  description: string;
  icon: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    year: "2018",
    title: "Company Founded",
    description: "ShieldxSSL  was established with a mission to make enterprise-level security accessible to businesses of all sizes.",
    icon: "RocketLaunchIcon"
  },
  {
    id: 2,
    year: "2019",
    title: "ISO 27001 Certification",
    description: "Achieved our first major security certification, demonstrating commitment to information security management.",
    icon: "ShieldCheckIcon"
  },
  {
    id: 3,
    year: "2020",
    title: "10,000 Certificates Issued",
    description: "Reached a major milestone in protecting businesses worldwide with our SSL certificate solutions.",
    icon: "DocumentCheckIcon"
  },
  {
    id: 4,
    year: "2021",
    title: "SOC 2 Type II Compliance",
    description: "Obtained SOC 2 Type II certification, reinforcing our dedication to security, availability, and confidentiality.",
    icon: "CheckBadgeIcon"
  },
  {
    id: 5,
    year: "2022",
    title: "Global Expansion",
    description: "Extended our services to support businesses in over 50 countries with localized support teams.",
    icon: "GlobeAltIcon"
  },
  {
    id: 6,
    year: "2023",
    title: "Advanced Security Features",
    description: "Launched real-time monitoring dashboard and automated renewal system for enhanced customer experience.",
    icon: "BoltIcon"
  },
  {
    id: 7,
    year: "2024",
    title: "Industry Recognition",
    description: "Received multiple awards for excellence in cybersecurity services and customer satisfaction.",
    icon: "TrophyIcon"
  }
];

const CompanyMilestones = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            A timeline of achievements, certifications, and milestones that define our commitment to security excellence.
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-border" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } flex-col lg:gap-8`}
              >
                <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                  <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'lg:justify-end' : 'lg:justify-start'} justify-start`}>
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name={milestone.icon as any} size={20} className="text-primary" />
                      </div>
                      <span className="text-2xl font-bold text-primary">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background z-10" />

                <div className="w-full lg:w-5/12" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mb-4">
              <Icon name="UserGroupIcon" size={24} className="text-success" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">50,000+</div>
            <div className="text-sm text-muted-foreground">Active Customers</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-4">
              <Icon name="DocumentCheckIcon" size={24} className="text-primary" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">200,000+</div>
            <div className="text-sm text-muted-foreground">Certificates Issued</div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-4">
              <Icon name="GlobeAltIcon" size={24} className="text-accent" />
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Countries Served</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyMilestones;