'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface NotificationPreferencesProps {
  email: string;
}

const NotificationPreferences = ({ email }: NotificationPreferencesProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [preferences, setPreferences] = useState({
    statusUpdates: true,
    completionNotice: true,
    renewalReminders: true,
    securityAlerts: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-12 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 lg:p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="BellIcon" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Email Notifications</h2>
      </div>

      <p className="text-sm text-muted-foreground mb-6">
        Manage your notification preferences for <span className="font-semibold text-foreground">{email}</span>
      </p>

      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">Status Updates</h3>
            <p className="text-sm text-muted-foreground">Receive updates when your certificate status changes</p>
          </div>
          <button
            onClick={() => handleToggle('statusUpdates')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              preferences.statusUpdates ? 'bg-success' : 'bg-border'
            }`}
            aria-label="Toggle status updates"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                preferences.statusUpdates ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">Completion Notice</h3>
            <p className="text-sm text-muted-foreground">Get notified when your certificate is ready</p>
          </div>
          <button
            onClick={() => handleToggle('completionNotice')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              preferences.completionNotice ? 'bg-success' : 'bg-border'
            }`}
            aria-label="Toggle completion notice"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                preferences.completionNotice ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">Renewal Reminders</h3>
            <p className="text-sm text-muted-foreground">Receive reminders before your certificate expires</p>
          </div>
          <button
            onClick={() => handleToggle('renewalReminders')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              preferences.renewalReminders ? 'bg-success' : 'bg-border'
            }`}
            aria-label="Toggle renewal reminders"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                preferences.renewalReminders ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-foreground mb-1">Security Alerts</h3>
            <p className="text-sm text-muted-foreground">Important security updates and alerts</p>
          </div>
          <button
            onClick={() => handleToggle('securityAlerts')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
              preferences.securityAlerts ? 'bg-success' : 'bg-border'
            }`}
            aria-label="Toggle security alerts"
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                preferences.securityAlerts ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
        
        {showSuccess && (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="CheckCircleIcon" size={20} />
            <span className="text-sm font-medium">Preferences saved successfully</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPreferences;