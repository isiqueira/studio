
export interface CoursePrice {
  description: string;
  price: number;
}

export interface Course {
  logo: string;
  name: string;
  location: string;
  period: string;
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
  quoteOnline_id: number;
  quote_id: number;
  like: null;
  view: number;
  quote: {
    id: number;
    officeCount: string;
    plugAndPlay: number;
    office_id: number;
    status: string;
    opportunity_id: number;
    dueDate: string;
    creator_id: number;
    created_at: string;
    converted_value: number;
    converted_currency: string;
    sold_at: string | null;
    logo: string | null;
    imageHeader: string | null;
    educationGroupLogo?: string;
    
    // Detailed information for the new card layout
    courses: Course[];
    extras: Extra[];
    paymentPlan: PaymentPlanInstallment[];
    totalAmount: number; // The original total in AUD
    entryRequirements?: string;
  };
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallback: string;
};
