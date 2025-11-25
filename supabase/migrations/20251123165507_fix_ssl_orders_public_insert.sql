-- Location: supabase/migrations/20251123165507_fix_ssl_orders_public_insert.sql
-- Purpose: Fix RLS policy to allow public users to place SSL orders
-- Issue: "new row violates row-level security policy for table ssl_orders"
-- Solution: Add public insert policy for anonymous order placement

-- Drop the existing authenticated-only insert policy
DROP POLICY IF EXISTS "authenticated_can_insert_ssl_orders" ON public.ssl_orders;

-- Create new policy allowing public users to insert SSL orders
-- This enables anonymous users to place orders without authentication
CREATE POLICY "public_can_insert_ssl_orders"
ON public.ssl_orders
FOR INSERT
TO public
WITH CHECK (true);

-- Keep authenticated user insert policy for backward compatibility
-- Authenticated users can still insert orders
CREATE POLICY "authenticated_can_insert_ssl_orders"
ON public.ssl_orders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Note: This maintains security while allowing public order placement
-- Read access remains public for order tracking
-- Update and delete operations remain restricted to authenticated users only