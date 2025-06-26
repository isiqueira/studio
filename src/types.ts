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
  };
};

export type User = {
  name: string;
  email: string;
  avatarUrl: string;
  avatarFallback: string;
};

// New types for quote detail page
type PriceItem = {
  label: string;
  amount: number;
  currency: string;
};

export type Course = {
  id: number;
  logo: string;
  name: string;
  location: string;
  startDate?: string;
  endDate?: string;
  terms?: string[];
  prices: PriceItem[];
  total: number;
  currency: string;
  included?: string[];
  notIncluded?: string[];
};

export type Extra = {
  id: number;
  logo: string;
  name: string;
  description: string;
  price: number;
  currency: string;
};

type PaymentPlanItem = {
  description: string;
  amount: number;
  currency: string;
};

export type PaymentPlanDetails = {
  duration: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  currency: string;
  dueDate: string;
  items: PaymentPlanItem[];
  totalFirstPayment: number;
};

export type QuoteDetails = {
  validUntil: string;
  createdAt: string;
  termsLink: string;
  courses: Course[];
  extras: Extra[];
  paymentPlan: PaymentPlanDetails;
};
