import { ServiceSubmitBatchOptionalParamsModel } from "@azure/storage-blob";

export interface CoursePrice {
  description: string;
  price: number;
}

export interface Course {
  logo: string;
  name: string;
  location: string;
  period: string;
  school: School;  
  prices: CoursePrice[];
}

export interface Extra {
  logo: string;
  name: string;
  period: string;
  price: number;
}

export interface Payment {
  description: string;
  price: number;
}

export interface PaymentPlanInstallment {
  dueDate: string;
  firstPayment: boolean;
  description: string;
  payments: Payment[];
}

export type Quotation = {
  id: number;
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
    phone: string;
    email: string;
    address: string;
    city: string;
}

export interface Greetings {
    greeting: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
}

export interface Seller {
    name: string;
    phone: string;
    email: string;
    photo: string;
}

export interface QuoteDetails {
    quotationId: number;
    companyInfo: CompanyInfo;
    courses: Course[];
    extras: Extra[];
    paymentPlan: PaymentPlanInstallment[];
    seller: Seller;
    greetings: Greetings;
    duration: string;
    period: string;
    totalAmount: number;
}
