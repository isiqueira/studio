
export interface CoursePrice {
  priceId?: number;
  description: string;
  price: number;
}

export interface School {
  school_id?: number;
  name: string;
  logo: string;
  location?: string;
  videoUrl?: string;
  images?: string[];
}

export interface Course {
  courseId?: number;
  logo: string;
  name: string;
  firstPaymentAmount:string; // This field is not in the original data, but added for consistency
  location: string;
  period: string;
  periodStart: string; // Start date in DD/MM/YYYY format
  periodEnd: string; // End date in DD/MM/YYYY format
  school?: School;  
  prices: CoursePrice[];
}

export interface Extra {
  extraId?: number;
  logo: string;
  name: string;
  period: string;
  price: number;
}

export interface Payment {
  paymentId?: number;
  description: string;
  price: number;
}

export interface PaymentPlanInstallment {
  installmentId?: number;
  dueDate: string;
  firstPayment: boolean;
  description:string;
  prices: Payment[];
}

export interface CompanyInfo {
    id?: number;
    phone: string;
    email: string;
    address: string;
    city: string;
}

export interface Greetings {
    id?: number;
    greeting: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    videoUrl?: string;
}

export interface Seller {
    seller_id?: number;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

// A unified Quotation type for both list and detail views.
export interface Quotation {
  quotationId: string;
  name: string;
  totalAmount: number;
  firstPaymentAmount: string;
  courses: Course[];
  extras: Extra[];
  paymentPlan?: PaymentPlanInstallment[];
  
  // Optional fields, mainly for the detail view
  quotationHash?: string;
  duration?: string;
  period?: string;
  validUntil?: string;
  createdAt?: string;
  companyInfo?: CompanyInfo;
  seller?: Seller;
  greetings?: Greetings;
}

export interface Proposal {
  proposal_id: number;
  name: string;
  valid_until: string;
  created_at: string;
  seller_id?: number;
  company_info_id?: number;
  greetings_id?: number;
  seller?: Seller;
  companyInfo?: CompanyInfo;
  greetings?: Greetings;
  quotations?: Quotation[]; // Now uses the unified Quotation type
  quotations_count?: number;
}

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallback: string;
  phone: string;
};
