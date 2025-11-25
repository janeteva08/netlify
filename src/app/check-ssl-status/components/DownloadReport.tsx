'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface DownloadReportProps {
  orderId: string;
  domain: string;
}

const DownloadReport = ({ orderId, domain }: DownloadReportProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-12 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const handleDownload = (format: 'pdf' | 'csv') => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      alert(`Downloading ${format.toUpperCase()} report for order ${orderId}`);
    }, 1500);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="DocumentArrowDownIcon" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Download Status Report</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Download a detailed status report for your records or to share with your team.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleDownload('pdf')}
          disabled={isDownloading}
          className="flex items-center justify-center space-x-3 px-6 py-4 bg-muted hover:bg-muted/80 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="DocumentTextIcon" size={24} className="text-primary" />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">PDF Report</p>
            <p className="text-xs text-muted-foreground">Detailed status document</p>
          </div>
        </button>

        <button
          onClick={() => handleDownload('csv')}
          disabled={isDownloading}
          className="flex items-center justify-center space-x-3 px-6 py-4 bg-muted hover:bg-muted/80 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name="TableCellsIcon" size={24} className="text-primary" />
          <div className="text-left">
            <p className="text-sm font-semibold text-foreground">CSV Export</p>
            <p className="text-xs text-muted-foreground">Spreadsheet format</p>
          </div>
        </button>
      </div>

      {isDownloading && (
        <div className="mt-4 flex items-center justify-center space-x-2 text-primary">
          <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
          <span className="text-sm font-medium">Preparing download...</span>
        </div>
      )}
    </div>
  );
};

export default DownloadReport;