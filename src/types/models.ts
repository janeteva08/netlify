// Application models using camelCase
export interface SslOrder {
  id: string;
  domain: string;
  email: string;
  certificateType: 'Standard SSL' | 'Wildcard SSL' | 'Multi-Domain SSL';
  status: 'Payment Pending' | 'In Progress' | 'Issued';
  orderDate: string;
  validationMethod: 'Email Validation' | 'DNS Validation' | 'File Upload Validation';
  csrKey?: string;
  organization?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSslOrderInput {
  id: string;
  domain: string;
  email: string;
  certificateType: 'Standard SSL' | 'Wildcard SSL' | 'Multi-Domain SSL';
  orderDate: string;
  validationMethod: 'Email Validation' | 'DNS Validation' | 'File Upload Validation';
  csrKey?: string;
  organization?: string;
  country?: string;
}

export interface UpdateSslOrderInput {
  status?: 'Payment Pending' | 'In Progress' | 'Issued';
  csrKey?: string;
  organization?: string;
  country?: string;
}