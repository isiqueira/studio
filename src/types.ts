import { ServiceSubmitBatchOptionalParamsModel } from "@azure/storage-blob";

export interface CoursePrice {
  priceId?: number;
  description: string;
  price: number;
}

export interface Course {
  courseId?: number;
  logo: string;
  name: string;
  location: string;
  period: string;
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
  description: string;
  payments: Payment[];
}

export type Quotation = {
  id: number;
  quotation_id?: number; // From DB
  quote: {
    id: number;
    quotationHash: string;
    validUntil: string;
    created_at: string;
    name: string;
    courses: Course[];
    extras: Extra[];
    paymentPlan: PaymentPlanInstallment[];
    totalAmount: number; // The original total in AUD
    firstPaymentAmount: number;
  };
};
export type School = {
  school_id?: number;
  name: string;
  logo: string;
  location?: string;
  videoUrl?: string;
}

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallback: string;
};

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
}

export interface Seller {
    seller_id?: number;
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface QuoteDetails {
    quotationId: number | string;
    quotationHash?: string;
    companyInfo?: CompanyInfo;
    courses: Course[];
    extras: Extra[];
    paymentPlan: PaymentPlanInstallment[];
    seller?: Seller;
    greetings?: Greetings;
    duration: string;
    period: string;
    totalAmount: number;
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
  quotations?: Quotation[];
}
