export interface Database {
  public: {
    Tables: {
      ssl_orders: {
        Row: {
          id: string;
          domain: string;
          email: string;
          certificate_type: 'Standard SSL' | 'Wildcard SSL' | 'Multi-Domain SSL';
          status: 'Payment Pending' | 'In Progress' | 'Issued';
          order_date: string;
          validation_method: 'Email Validation' | 'DNS Validation' | 'File Upload Validation';
          csr_key: string | null;
          organization: string | null;
          country: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          domain: string;
          email: string;
          certificate_type: 'Standard SSL' | 'Wildcard SSL' | 'Multi-Domain SSL';
          status?: 'Payment Pending' | 'In Progress' | 'Issued';
          order_date: string;
          validation_method: 'Email Validation' | 'DNS Validation' | 'File Upload Validation';
          csr_key?: string | null;
          organization?: string | null;
          country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          domain?: string;
          email?: string;
          certificate_type?: 'Standard SSL' | 'Wildcard SSL' | 'Multi-Domain SSL';
          status?: 'Payment Pending' | 'In Progress' | 'Issued';
          order_date?: string;
          validation_method?: 'Email Validation' | 'DNS Validation' | 'File Upload Validation';
          csr_key?: string | null;
          organization?: string | null;
          country?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
}