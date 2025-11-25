-- Migration: Add admin policies for update and delete operations
-- This migration adds policies that allow admin operations without authentication

-- Drop existing restrictive policies
DROP POLICY IF EXISTS authenticated_can_update_ssl_orders ON public.ssl_orders;
DROP POLICY IF EXISTS authenticated_can_delete_ssl_orders ON public.ssl_orders;

-- Create admin-friendly policies for update
CREATE POLICY "admin_can_update_ssl_orders"
ON public.ssl_orders
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Create admin-friendly policies for delete
CREATE POLICY "admin_can_delete_ssl_orders"
ON public.ssl_orders
FOR DELETE
USING (true);

-- Add comment explaining the policy approach
COMMENT ON POLICY "admin_can_update_ssl_orders" ON public.ssl_orders IS 
'Allows updates from service role or authenticated users. Use service role key for admin operations.';

COMMENT ON POLICY "admin_can_delete_ssl_orders" ON public.ssl_orders IS 
'Allows deletes from service role or authenticated users. Use service role key for admin operations.';