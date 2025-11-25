'use client';

import { useState } from 'react';

interface Ticket {
  id: string;
  customer: string;
  email: string;
  subject: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  createdDate: string;
  lastUpdate: string;
  category: string;
}

export default function CustomerSupport() {
  const [tickets] = useState<Ticket[]>([
    {
      id: 'TICKET-001',
      customer: 'John Smith',
      email: 'john@example.com',
      subject: 'SSL installation issue on Apache server',
      priority: 'High',
      status: 'In Progress',
      createdDate: '2025-01-22',
      lastUpdate: '2 hours ago',
      category: 'Technical Support'
    },
    {
      id: 'TICKET-002',
      customer: 'Sarah Johnson',
      email: 'sarah@testsite.com',
      subject: 'Certificate renewal question',
      priority: 'Medium',
      status: 'Open',
      createdDate: '2025-01-23',
      lastUpdate: '30 minutes ago',
      category: 'Billing & Renewals'
    },
    {
      id: 'TICKET-003',
      customer: 'Michael Brown',
      email: 'michael@business.org',
      subject: 'Domain validation not working',
      priority: 'Critical',
      status: 'Open',
      createdDate: '2025-01-23',
      lastUpdate: '15 minutes ago',
      category: 'Technical Support'
    },
    {
      id: 'TICKET-004',
      customer: 'Emily Davis',
      email: 'emily@shop.com',
      subject: 'Need help with CSR generation',
      priority: 'Low',
      status: 'Resolved',
      createdDate: '2025-01-21',
      lastUpdate: '1 day ago',
      category: 'General Inquiry'
    }
  ]);

  const [filterPriority, setFilterPriority] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredTickets = tickets.filter(ticket => {
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesPriority && matchesStatus;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'In Progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'Closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Support Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🎫</span>
            <span className="text-sm font-medium text-muted-foreground">Total</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{tickets.length}</p>
          <p className="text-xs text-muted-foreground mt-1">Active Tickets</p>
        </div>

        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">🔴</span>
            <span className="text-sm font-medium text-muted-foreground">Critical</span>
          </div>
          <p className="text-3xl font-bold text-red-600">
            {tickets.filter(t => t.priority === 'Critical').length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">High Priority</p>
        </div>

        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">⏱️</span>
            <span className="text-sm font-medium text-muted-foreground">Response</span>
          </div>
          <p className="text-3xl font-bold text-foreground">2.4m</p>
          <p className="text-xs text-muted-foreground mt-1">Avg Response Time</p>
        </div>

        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">✅</span>
            <span className="text-sm font-medium text-muted-foreground">Today</span>
          </div>
          <p className="text-3xl font-bold text-green-600">
            {tickets.filter(t => t.status === 'Resolved').length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">Resolved Tickets</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="text-2xl">💬</span>
          Customer Support Tickets
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Filter by Priority
            </label>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            >
              <option value="all">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <div className="space-y-4">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-card rounded-xl shadow-lg border border-border p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm font-mono text-muted-foreground">{ticket.id}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2">{ticket.subject}</h3>
                
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {ticket.customer}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {ticket.email}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {ticket.category}
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <p className="text-xs text-muted-foreground">Last updated: {ticket.lastUpdate}</p>
                <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg transition-all duration-300 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTickets.length === 0 && (
        <div className="bg-card rounded-xl shadow-lg border border-border p-12 text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Tickets Found</h3>
          <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
        </div>
      )}
    </div>
  );
}