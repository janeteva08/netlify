'use client';

import { useState, useEffect } from 'react';

interface Order {
  id: string;
  status: 'Payment Pending' | 'In Progress' | 'Issued';
  orderDate: string;
}

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingPayment: 0,
    inProgress: 0,
    issued: 0,
    todayOrders: 0,
    weekRevenue: 0
  });

  useEffect(() => {
    const calculateStats = () => {
      const storedOrders = localStorage.getItem('sslSubmittedOrders');
      if (!storedOrders) {
        setStats({
          totalOrders: 0,
          pendingPayment: 0,
          inProgress: 0,
          issued: 0,
          todayOrders: 0,
          weekRevenue: 0
        });
        return;
      }

      try {
        const orders: Order[] = JSON.parse(storedOrders);
        const today = new Date().toISOString().split('T')[0];
        
        const newStats = {
          totalOrders: orders.length,
          pendingPayment: orders.filter(o => o.status === 'Payment Pending').length,
          inProgress: orders.filter(o => o.status === 'In Progress').length,
          issued: orders.filter(o => o.status === 'Issued').length,
          todayOrders: orders.filter(o => o.orderDate === today).length,
          weekRevenue: orders.length * 79 // Simplified calculation
        };
        
        setStats(newStats);
      } catch (error) {
        console.error('Failed to calculate stats:', error);
      }
    };

    calculateStats();

    // Update stats every 5 seconds
    const intervalId = setInterval(calculateStats, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Total Orders Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-conversion-green bg-conversion-green/10 px-2 py-1 rounded-full">
            Live
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{stats.totalOrders}</h3>
        <p className="text-sm text-muted-foreground">Total SSL Orders</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            <span className="text-primary font-semibold">+{stats.todayOrders}</span> orders today
          </p>
        </div>
      </div>

      {/* Pending Payment Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
            Pending
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{stats.pendingPayment}</h3>
        <p className="text-sm text-muted-foreground">Awaiting Payment</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Requires immediate attention
          </p>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
            Active
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{stats.inProgress}</h3>
        <p className="text-sm text-muted-foreground">In Progress</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Being processed
          </p>
        </div>
      </div>

      {/* Issued Certificates Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-conversion-green/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-conversion-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-conversion-green bg-conversion-green/10 px-2 py-1 rounded-full">
            Complete
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{stats.issued}</h3>
        <p className="text-sm text-muted-foreground">Issued Certificates</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Successfully delivered
          </p>
        </div>
      </div>

      {/* Revenue Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full">
            Revenue
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">${stats.weekRevenue.toLocaleString()}</h3>
        <p className="text-sm text-muted-foreground">This Week's Revenue</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            Average: ${stats.totalOrders > 0 ? Math.round(stats.weekRevenue / stats.totalOrders) : 0}/order
          </p>
        </div>
      </div>

      {/* System Status Card */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-shadow duration-300">
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 bg-conversion-green/10 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-conversion-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <span className="text-xs font-medium text-conversion-green bg-conversion-green/10 px-2 py-1 rounded-full">
            Online
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-1">100%</h3>
        <p className="text-sm text-muted-foreground">System Uptime</p>
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            All services operational
          </p>
        </div>
      </div>
    </div>
  );
}