import type { Quotation } from '@/types';

// The raw data from the original mock file.
const rawData = [
  {
    "id": 1503074,
    "quote": {
      "id": 1435315,
      "validUntil": "2025-06-27T00:00:00.000Z",
      "created_at": "2025-06-05 14:32:53",
      "firstPaymentAmount": 710.25,
      "name": "General English Full Time",
      "quotationHash": "d851b157-1b3f-4242-88ac-aace4b6c6bf6",
      "courses": [
        {
          "logo": "",
          "name": "Full Time Program Evening 20 hrs/wk",
          "location": "LSC Brisbane",
          "period": "June 06, 2025 - December 12, 2025",
          "school": {
            "name": "APC - Australian Pacific College",
            "logo": "https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg"
          },          
          "prices": [
            { "description": "Programa", "price": 5800.00 },
            { "description": "Matrícula", "price": 240.00 },
            { "description": "Material", "price": 260.00 }
          ]
        },
        {
          "logo": "",
          "name": "Certificate IV in Project Management Practice (2025/26 Intakes)",
          "location": "APC Brisbane",
          "period": "June 06, 2025 - March 27, 2026",
          "school": {
            "name": "APC - Australian Pacific College",
            "logo": "https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg"
          },
          "prices": [
            { "description": "BANANA", "price": 4500.00 },
            { "description": "Matrícula", "price": 150.00 }
          ]
        }
      ],
      "extras": [
        { "logo": "", "name": "OSHC - SINGLE", "period": "Overseas Student Health Cover", "price": 1323.00 },
        { "logo": "", "name": "Student VISA Application - Subclass 500", "period": "Australian Government Fee", "price": 1632.00 },
        { "logo": "", "name": "Student VISA Application - Single Support", "period": "Administrative Support", "price": 300.00 }
      ],
      "paymentPlan": [],
      "totalAmount": 14205.00
    }
  },
  {
    "id": 1503075,
    "quote": {
      "id": 1435316,
      "validUntil": "2025-06-27T00:00:00.000Z",
      "created_at": "2025-06-05 14:32:53",
      "firstPaymentAmount": 710.25,
      "name": "General English Full Time",
      "quotationHash": "d851b157-1b3f-4242-88ac-aace4b6c6bf6",
      "courses": [
        {
          "logo": "",
          "name": "General English Day (20 hrs/wk)",
          "location": "ILSC Language Schools | LSC Brisbane",
          "period": "June 06, 2025 - December 12, 2025",
          "school": {
            "name": "ILSC Language Schools",
            "location": "LSC Brisbane",
            "logo": "https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg"
          },          
          "prices": [
            { "description": "Programa", "price": 5800.00 },
            { "description": "Matrícula", "price": 240.00 },
            { "description": "Material", "price": 260.00 }
          ]
        }
      ],
      "extras": [
        { "logo": "", "name": "OSHC - SINGLE", "period": "Overseas Student Health Cover", "price": 1323.00 },
        { "logo": "", "name": "Student VISA Application - Subclass 500", "period": "Australian Government Fee", "price": 1632.00 },
        { "logo": "", "name": "Student VISA Application - Single Support", "period": "Administrative Support", "price": 300.00 }
      ],
      "paymentPlan": [],
      "totalAmount": 14205.00
    }
  },
  {
    "id": 1503076,
    "quote": {
      "id": 1435317,
      "validUntil": "2025-06-27T00:00:00.000Z",
      "created_at": "2025-06-05 14:32:53",
      "firstPaymentAmount": 710.25,
      "name": "General English Full Time",
      "quotationHash": "d851b157-1b3f-4242-88ac-aace4b6c6bf6",
      "courses": [
        {
          "logo": "",
          "name": "Full Time Program Evening 20 hrs/wk",
          "location": "LSC Brisbane",
          "period": "June 06, 2025 - December 12, 2025",
          "school": {
            "name": "ILSC Language Schools",
            "logo": "https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg"
          },          
          "prices": [
            { "description": "Programa", "price": 5800.00 },
            { "description": "Matrícula", "price": 240.00 },
            { "description": "Material", "price": 260.00 }
          ]
        },
        {
          "logo": "",
          "name": "Certificate IV in Project Management Practice (2025/26 Intakes)",
          "location": "APC Brisbane",
          "period": "June 06, 2025 - March 27, 2026",
          "school": {
            "name": "APC - Australian Pacific College",
            "logo": "https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/school_7550.jpg"
          },
          "prices": [
            { "description": "Programa", "price": 4500.00 },
            { "description": "Matrícula", "price": 150.00 }
          ]
        }
      ],
      "extras": [
        { "logo": "", "name": "OSHC - SINGLE", "period": "Overseas Student Health Cover", "price": 1323.00 },
        { "logo": "", "name": "Student VISA Application - Subclass 500", "period": "Australian Government Fee", "price": 1632.00 },
        { "logo": "", "name": "Student VISA Application - Single Support", "period": "Administrative Support", "price": 300.00 }
      ],
      "paymentPlan": [],
      "totalAmount": 14205.00
    }
  }
];

// Transform the raw data to match the unified Quotation type.
export const initialQuotations: Quotation[] = rawData.map(item => ({
  id: item.id,
  name: item.quote.name,
  totalAmount: item.quote.totalAmount,
  firstPaymentAmount: item.quote.firstPaymentAmount,
  courses: item.quote.courses,
  extras: item.quote.extras,
  // Add optional fields for consistency, even if empty
  quotationHash: item.quote.quotationHash,
  validUntil: item.quote.validUntil,
  createdAt: item.quote.created_at,
  paymentPlan: item.quote.paymentPlan,
}));
