-- Location: supabase/migrations/20251123163411_ssl_orders_management.sql
-- Schema Analysis: Fresh project - no existing tables
-- Integration Type: NEW_MODULE - SSL Certificate Order Management
-- Dependencies: None - first migration

-- 1. Create enum types for SSL order management
CREATE TYPE public.ssl_certificate_type AS ENUM ('Standard SSL', 'Wildcard SSL', 'Multi-Domain SSL');
CREATE TYPE public.ssl_order_status AS ENUM ('Payment Pending', 'In Progress', 'Issued');
CREATE TYPE public.ssl_validation_method AS ENUM ('Email Validation', 'DNS Validation', 'File Upload Validation');

-- 2. Create ssl_orders table
CREATE TABLE public.ssl_orders (
    id TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    email TEXT NOT NULL,
    certificate_type public.ssl_certificate_type NOT NULL,
    status public.ssl_order_status DEFAULT 'Payment Pending'::public.ssl_order_status NOT NULL,
    order_date DATE NOT NULL,
    validation_method public.ssl_validation_method NOT NULL,
    csr_key TEXT,
    organization TEXT,
    country TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create indexes for performance
CREATE INDEX idx_ssl_orders_domain ON public.ssl_orders(domain);
CREATE INDEX idx_ssl_orders_email ON public.ssl_orders(email);
CREATE INDEX idx_ssl_orders_status ON public.ssl_orders(status);
CREATE INDEX idx_ssl_orders_order_date ON public.ssl_orders(order_date DESC);
CREATE INDEX idx_ssl_orders_created_at ON public.ssl_orders(created_at DESC);

-- 4. Enable Row Level Security
ALTER TABLE public.ssl_orders ENABLE ROW LEVEL SECURITY;

-- 5. Create RLS policies - Public read access for order tracking
CREATE POLICY "public_can_read_ssl_orders"
ON public.ssl_orders
FOR SELECT
TO public
USING (true);

-- 6. Create RLS policies - Authenticated users can insert orders
CREATE POLICY "authenticated_can_insert_ssl_orders"
ON public.ssl_orders
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 7. Create RLS policies - Authenticated users can update orders
CREATE POLICY "authenticated_can_update_ssl_orders"
ON public.ssl_orders
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 8. Create RLS policies - Authenticated users can delete orders
CREATE POLICY "authenticated_can_delete_ssl_orders"
ON public.ssl_orders
FOR DELETE
TO authenticated
USING (true);

-- 9. Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_ssl_orders_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$func$;

-- 10. Create trigger for updated_at
CREATE TRIGGER set_ssl_orders_updated_at
BEFORE UPDATE ON public.ssl_orders
FOR EACH ROW
EXECUTE FUNCTION public.update_ssl_orders_updated_at();

-- 11. Create mock data for development
DO $$
DECLARE
    order1_id TEXT := 'SSL-2025-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
    order2_id TEXT := 'SSL-2025-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
    order3_id TEXT := 'SSL-2025-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
BEGIN
    -- Insert sample SSL orders
    INSERT INTO public.ssl_orders (
        id, 
        domain, 
        email, 
        certificate_type, 
        status, 
        order_date, 
        validation_method,
        organization,
        country,
        csr_key
    ) VALUES
    (
        order1_id,
        'example.com',
        'admin@example.com',
        'Standard SSL'::public.ssl_certificate_type,
        'Payment Pending'::public.ssl_order_status,
        CURRENT_DATE,
        'Email Validation'::public.ssl_validation_method,
        'Example Corporation',
        'United States',
        NULL
    ),
    (
        order2_id,
        'testsite.com',
        'contact@testsite.com',
        'Wildcard SSL'::public.ssl_certificate_type,
        'In Progress'::public.ssl_order_status,
        CURRENT_DATE - INTERVAL '2 days',
        'DNS Validation'::public.ssl_validation_method,
        'Test Site Inc',
        'Canada',
        '-----BEGIN CERTIFICATE REQUEST-----\nMIICvjCCAaYCAQAweTELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWEx\n-----END CERTIFICATE REQUEST-----'
    ),
    (
        order3_id,
        'secureapp.io',
        'security@secureapp.io',
        'Multi-Domain SSL'::public.ssl_certificate_type,
        'Issued'::public.ssl_order_status,
        CURRENT_DATE - INTERVAL '5 days',
        'File Upload Validation'::public.ssl_validation_method,
        'SecureApp Technologies',
        'United Kingdom',
        '-----BEGIN CERTIFICATE REQUEST-----\nMIICwDCCAagCAQAwgYIxCzAJBgNVBAYTAlVLMRAwDgYDVQQIDADLb25kb24x\n-----END CERTIFICATE REQUEST-----'
    );
END $$;

-- 12. Create cleanup function for development
CREATE OR REPLACE FUNCTION public.cleanup_ssl_orders()
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $func$
BEGIN
    DELETE FROM public.ssl_orders 
    WHERE email LIKE '%@example.com' 
       OR email LIKE '%@testsite.com' 
       OR email LIKE '%@secureapp.io';
END;
$func$;