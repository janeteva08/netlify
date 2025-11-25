'use client';

import { useState, useEffect } from 'react';
import { sslOrderService } from '@/services/sslOrderService';
import type { SslOrder } from '@/types/models';

export default function OrderManagement() {
  const [orders, setOrders] = useState<SslOrder[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<SslOrder | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string>('');

  // Load orders from Supabase on component mount
  useEffect(() => {
    loadOrders();

    // Set up real-time subscription with proper DELETE handling
    const unsubscribe = sslOrderService.subscribeToOrderChanges((updatedOrder, event) => {
      if (event === 'DELETE' && updatedOrder) {
        // Remove deleted order from state
        setOrders(current => current?.filter?.(o => o?.id !== updatedOrder?.id) ?? []);
      } else if (event === 'INSERT' && updatedOrder) {
        // Add new order to state
        setOrders(current => [updatedOrder, ...current] ?? []);
      } else if (event === 'UPDATE' && updatedOrder) {
        // Update existing order in state
        setOrders(current => 
          current?.map?.(o => o?.id === updatedOrder?.id ? updatedOrder : o) ?? []
        );
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data, error } = await sslOrderService.getAll();
      
      if (error) {
        setError(error?.message ?? 'Failed to load orders');
        return;
      }
      
      setOrders(data ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrders = orders?.filter?.(order => {
    const matchesSearch = 
      order?.domain?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.() ?? '') ||
      order?.email?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.() ?? '') ||
      order?.id?.toLowerCase?.()?.includes?.(searchTerm?.toLowerCase?.() ?? '');
    
    const matchesFilter = filterStatus === 'all' || order?.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  }) ?? [];

  const handleStatusUpdate = async (orderId: string, newStatus: SslOrder['status']) => {
    try {
      const { error } = await sslOrderService.updateStatus(orderId, newStatus);
      
      if (error) {
        setError(error?.message ?? 'Failed to update status');
        return;
      }

      // Update local state
      setOrders(current => 
        current?.map?.(order => 
          order?.id === orderId ? { ...order, status: newStatus } : order
        ) ?? []
      );
      
      // Update selected order if it's the one being modified
      if (selectedOrder && selectedOrder?.id === orderId) {
        setSelectedOrder({ ...selectedOrder, status: newStatus });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    setDeleteError('');

    try {
      const { error } = await sslOrderService.delete(orderId);

      if (error) {
        setDeleteError(error?.message ?? 'Failed to delete order');
        return;
      }

      // Remove from local state
      setOrders(current => current?.filter?.(order => order?.id !== orderId) ?? []);
      
      // Close modal if deleted order was selected
      if (selectedOrder && selectedOrder?.id === orderId) {
        setShowEditModal(false);
        setSelectedOrder(null);
      }
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete order');
    } finally {
      setIsDeleting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Payment Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Issued': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-card rounded-xl shadow-lg border border-border p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-12 bg-muted rounded"></div>
            <div className="h-12 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="bg-card rounded-xl shadow-lg border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="text-2xl">📋</span>
          SSL Order Management
        </h2>
        
        {error && (
          <div className="mb-4 bg-destructive/10 border border-destructive/20 rounded-lg p-4">
            <p className="text-destructive text-sm font-medium">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Search Orders
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value ?? '')}
              placeholder="Search by domain, email, or order ID..."
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Filter by Status
            </label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value ?? 'all')}
              className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
            >
              <option value="all">All Orders</option>
              <option value="Payment Pending">Payment Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Issued">Issued</option>
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredOrders?.length ?? 0} of {orders?.length ?? 0} orders
          </p>
          <button
            onClick={loadOrders}
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            <span>🔄</span> Refresh
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-accent/50 border-b border-border">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order ID</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Domain</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Certificate Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Order Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders?.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                    No orders found
                  </td>
                </tr>
              ) : (
                filteredOrders?.map?.((order) => (
                  <tr key={order?.id} className="hover:bg-accent/30 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm font-medium text-foreground">{order?.id}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order?.domain}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order?.email}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{order?.certificateType}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order?.status ?? '')}`}>
                        {order?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{order?.orderDate}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowEditModal(true);
                            setDeleteError('');
                          }}
                          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-md transition-all duration-300"
                        >
                          View Details
                        </button>
                        <select
                          value={order?.status}
                          onChange={(e) => handleStatusUpdate(order?.id ?? '', e?.target?.value as SslOrder['status'])}
                          className="px-2 py-1 text-xs border border-border rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="Payment Pending">Payment Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Issued">Issued</option>
                        </select>
                        <button
                          onClick={() => handleDeleteOrder(order?.id ?? '')}
                          disabled={isDeleting}
                          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-md transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showEditModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <h3 className="text-xl font-bold text-foreground">Order Details</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setDeleteError('');
                }}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-4">
              {deleteError && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-destructive text-sm font-medium">{deleteError}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Order ID</p>
                  <p className="text-base font-semibold text-foreground">{selectedOrder?.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Status</p>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(selectedOrder?.status ?? '')}`}>
                    {selectedOrder?.status}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Domain Name</p>
                <p className="text-base font-semibold text-foreground">{selectedOrder?.domain}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Contact Email</p>
                <p className="text-base text-foreground">{selectedOrder?.email}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Certificate Type</p>
                <p className="text-base text-foreground">{selectedOrder?.certificateType}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Validation Method</p>
                <p className="text-base text-foreground">{selectedOrder?.validationMethod}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Order Date</p>
                <p className="text-base text-foreground">{selectedOrder?.orderDate}</p>
              </div>

              {selectedOrder?.csrKey && (
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-2">CSR Key</p>
                  <div className="bg-background border border-border rounded-lg p-4 max-h-40 overflow-y-auto">
                    <code className="text-xs text-foreground font-mono whitespace-pre-wrap break-all">
                      {selectedOrder.csrKey}
                    </code>
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-border flex gap-3">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    Update Order Status
                  </label>
                  <select
                    value={selectedOrder?.status}
                    onChange={(e) => {
                      handleStatusUpdate(selectedOrder?.id ?? '', e?.target?.value as SslOrder['status']);
                      setSelectedOrder({ ...selectedOrder, status: e?.target?.value as SslOrder['status'] });
                    }}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300"
                  >
                    <option value="Payment Pending">Payment Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Issued">Issued</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => handleDeleteOrder(selectedOrder?.id ?? '')}
                    disabled={isDeleting}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                  >
                    {isDeleting ? 'Deleting...' : 'Delete Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}