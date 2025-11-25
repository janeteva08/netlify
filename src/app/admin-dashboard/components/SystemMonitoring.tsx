'use client';

import { useState, useEffect } from 'react';

export default function SystemMonitoring() {
  const [systemMetrics, setSystemMetrics] = useState({
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 38,
    activeConnections: 234,
    apiResponseTime: 145,
    databaseQueries: 1247
  });

  useEffect(() => {
    // Simulate real-time monitoring updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        cpuUsage: Math.max(20, Math.min(90, prev.cpuUsage + Math.floor(Math.random() * 10 - 5))),
        memoryUsage: Math.max(30, Math.min(85, prev.memoryUsage + Math.floor(Math.random() * 8 - 4))),
        diskUsage: Math.max(30, Math.min(80, prev.diskUsage + Math.floor(Math.random() * 4 - 2))),
        activeConnections: Math.max(100, prev.activeConnections + Math.floor(Math.random() * 20 - 10)),
        apiResponseTime: Math.max(100, Math.min(300, prev.apiResponseTime + Math.floor(Math.random() * 30 - 15))),
        databaseQueries: prev.databaseQueries + Math.floor(Math.random() * 5)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getUsageColor = (usage: number) => {
    if (usage < 50) return 'bg-green-500';
    if (usage < 75) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="text-2xl">🖥️</span>
          System Health Monitoring
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CPU Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">CPU Usage</span>
              <span className="text-lg font-bold text-foreground">{systemMetrics.cpuUsage}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-3">
              <div 
                className={`${getUsageColor(systemMetrics.cpuUsage)} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${systemMetrics.cpuUsage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.cpuUsage < 50 ? '✅ Optimal' : systemMetrics.cpuUsage < 75 ? '⚠️ Moderate' : '🔴 High'}
            </p>
          </div>

          {/* Memory Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Memory Usage</span>
              <span className="text-lg font-bold text-foreground">{systemMetrics.memoryUsage}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-3">
              <div 
                className={`${getUsageColor(systemMetrics.memoryUsage)} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${systemMetrics.memoryUsage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.memoryUsage < 50 ? '✅ Optimal' : systemMetrics.memoryUsage < 75 ? '⚠️ Moderate' : '🔴 High'}
            </p>
          </div>

          {/* Disk Usage */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">Disk Usage</span>
              <span className="text-lg font-bold text-foreground">{systemMetrics.diskUsage}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-3">
              <div 
                className={`${getUsageColor(systemMetrics.diskUsage)} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${systemMetrics.diskUsage}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground">
              {systemMetrics.diskUsage < 50 ? '✅ Optimal' : systemMetrics.diskUsage < 75 ? '⚠️ Moderate' : '🔴 High'}
            </p>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Active Connections</h3>
            <span className="text-2xl">🔌</span>
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">{systemMetrics.activeConnections}</p>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span>+12.5% from last hour</span>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">API Response Time</h3>
            <span className="text-2xl">⚡</span>
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">{systemMetrics.apiResponseTime}ms</p>
          <div className="flex items-center gap-2 text-sm text-green-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            <span>-8.3% improvement</span>
          </div>
        </div>

        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-muted-foreground">Database Queries</h3>
            <span className="text-2xl">💾</span>
          </div>
          <p className="text-3xl font-bold text-foreground mb-2">{systemMetrics.databaseQueries}</p>
          <div className="flex items-center gap-2 text-sm text-blue-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>All queries successful</span>
          </div>
        </div>
      </div>

      {/* Security Monitoring */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="text-2xl">🔒</span>
          Security Monitoring
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">SSL Certificates Valid</p>
                  <p className="text-xs text-muted-foreground">All certificates up to date</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">✓</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">No Security Threats</p>
                  <p className="text-xs text-muted-foreground">Last scan: 5 minutes ago</p>
                </div>
              </div>
              <span className="text-lg font-bold text-green-600">0</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Failed Login Attempts</p>
                  <p className="text-xs text-muted-foreground">Last 24 hours</p>
                </div>
              </div>
              <span className="text-lg font-bold text-yellow-600">3</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-background rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Firewall Status</p>
                  <p className="text-xs text-muted-foreground">Active and monitoring</p>
                </div>
              </div>
              <span className="text-lg font-bold text-blue-600">✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* System Alerts */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
          <span className="text-2xl">⚠️</span>
          Recent System Alerts
        </h2>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-900">System backup completed successfully</p>
              <p className="text-xs text-green-700">10 minutes ago</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900">Database optimization completed</p>
              <p className="text-xs text-blue-700">1 hour ago</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-yellow-900">Certificate renewal reminder: 5 certificates expiring in 30 days</p>
              <p className="text-xs text-yellow-700">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}