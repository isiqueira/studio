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
  };
};
