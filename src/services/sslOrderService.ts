import { supabase } from '../lib/supabase/client';

import type { Database } from '../types/database.types';
import type { SslOrder, CreateSslOrderInput, UpdateSslOrderInput } from '../types/models';

type SslOrderRow = Database['public']['Tables']['ssl_orders']['Row'];
type SslOrderInsert = Database['public']['Tables']['ssl_orders']['Insert'];
type SslOrderUpdate = Database['public']['Tables']['ssl_orders']['Update'];

// Helper function to convert snake_case database row to camelCase app model
function toSslOrder(row: SslOrderRow): SslOrder {
  return {
    id: row?.id ?? '',
    domain: row?.domain ?? '',
    email: row?.email ?? '',
    certificateType: row?.certificate_type ?? 'Standard SSL',
    status: row?.status ?? 'Payment Pending',
    orderDate: row?.order_date ?? '',
    validationMethod: row?.validation_method ?? 'Email Validation',
    csrKey: row?.csr_key ?? undefined,
    organization: row?.organization ?? undefined,
    country: row?.country ?? undefined,
    createdAt: row?.created_at ?? '',
    updatedAt: row?.updated_at ?? ''
  };
}

// Helper function to convert camelCase input to snake_case for database
function toInsertData(input: CreateSslOrderInput): SslOrderInsert {
  return {
    id: input?.id ?? '',
    domain: input?.domain ?? '',
    email: input?.email ?? '',
    certificate_type: input?.certificateType ?? 'Standard SSL',
    order_date: input?.orderDate ?? '',
    validation_method: input?.validationMethod ?? 'Email Validation',
    csr_key: input?.csrKey ?? null,
    organization: input?.organization ?? null,
    country: input?.country ?? null
  };
}

// Helper function to convert camelCase update to snake_case for database
function toUpdateData(input: UpdateSslOrderInput): SslOrderUpdate {
  const updateData: SslOrderUpdate = {};
  if (input?.status !== undefined) updateData.status = input.status;
  if (input?.csrKey !== undefined) updateData.csr_key = input.csrKey;
  if (input?.organization !== undefined) updateData.organization = input.organization;
  if (input?.country !== undefined) updateData.country = input.country;
  return updateData;
}

export const sslOrderService = {
  // Create new SSL order
  async create(orderInput: CreateSslOrderInput): Promise<{ data: SslOrder | null; error: Error | null }> {
    try {
      const insertData = toInsertData(orderInput);
      
      const { data, error } = await supabase
        .from('ssl_orders')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      return { data: data ? toSslOrder(data) : null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  // Get all SSL orders (admin view)
  async getAll(): Promise<{ data: SslOrder[] | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('ssl_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return { 
        data: data?.map?.(row => toSslOrder(row)) ?? [], 
        error: null 
      };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  // Find order by domain or email (client lookup)
  async findByDomainOrEmail(domain?: string, email?: string): Promise<{ data: SslOrder | null; error: Error | null }> {
    try {
      let query = supabase.from('ssl_orders').select('*');

      if (domain) {
        query = query.ilike('domain', domain);
      } else if (email) {
        query = query.ilike('email', email);
      } else {
        throw new Error('Either domain or email must be provided');
      }

      const { data, error } = await query
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return { data: null, error: new Error('No order found with the provided information') };
        }
        throw error;
      }

      return { data: data ? toSslOrder(data) : null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  // Get order by ID
  async getById(orderId: string): Promise<{ data: SslOrder | null; error: Error | null }> {
    try {
      const { data, error } = await supabase
        .from('ssl_orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      return { data: data ? toSslOrder(data) : null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  // Update order status (admin function)
  async updateStatus(
    orderId: string, 
    status: 'Payment Pending' | 'In Progress' | 'Issued'
  ): Promise<{ data: SslOrder | null; error: Error | null }> {
    try {
      // Use regular client - RLS policies allow admin updates
      const { data, error } = await supabase
        .from('ssl_orders')
        .update({ status })
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return { data: data ? toSslOrder(data) : null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  // Update order details (admin function)
  async update(
    orderId: string, 
    updates: UpdateSslOrderInput
  ): Promise<{ data: SslOrder | null; error: Error | null }> {
    try {
      const updateData = toUpdateData(updates);
      
      // Use regular client - RLS policies allow admin updates
      const { data, error } = await supabase
        .from('ssl_orders')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw error;
      return { data: data ? toSslOrder(data) : null, error: null };
    } catch (error) {
      return { data: null, error: error as Error };
    }
  },

  // Delete order (admin function)
  async delete(orderId: string): Promise<{ error: Error | null }> {
    try {
      // Use regular client - RLS policies allow admin deletes
      const { error } = await supabase
        .from('ssl_orders')
        .delete()
        .eq('id', orderId);

      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  },

  // Subscribe to order changes (real-time)
  subscribeToOrderChanges(
    callback: (order: SslOrder | null, event: 'INSERT' | 'UPDATE' | 'DELETE') => void
  ) {
    const channel = supabase
      .channel('ssl_orders_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'ssl_orders'
        },
        (payload: any) => {
          // Handle different event types
          if (payload?.eventType === 'DELETE' && payload?.old) {
            // For DELETE events, pass the old data and event type
            callback(toSslOrder(payload.old), 'DELETE');
          } else if (payload?.new) {
            // For INSERT/UPDATE events, pass the new data
            callback(toSslOrder(payload.new), payload?.eventType as 'INSERT' | 'UPDATE');
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }
};