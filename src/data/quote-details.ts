import type { QuoteDetails } from '@/types';

export const quoteDetailsData: QuoteDetails = {
  "quotationId": 846,
  "companyInfo": {
    "phone": "+61 (02) 9299 4428",
    "email": "info@stbaustralia.com.au",
    "address": "Level 6 / 225 Clarence St - Sydney - NSW - 2000",
    "city": " Sydney"
  },
  "courses": [
    {
      "logo": "https://placehold.co/100x100.png",
      "name": "Advanced Diploma of Leadership and Management",
      "location": "SYDNEY",
      "period": "Start Date: 14/07/2025 - End Date:  09/07/2026",
      "prices": [
        {
          "description": "Tuition Fee",
          "price": 6000
        },
        {
          "description": "Material Fee",
          "price": 0
        },
        {
          "description": "Enrolment Fee",
          "price": 250
        },
        {
          "description": "Additional Fee",
          "price": 0
        }
      ],
      "school": {
        "name": '',
        "logo": '',
        "location": undefined
      }
    },
    {
      "logo": "https://placehold.co/100x100.png",
      "name": "Graduate Diploma of Management (learning)",
      "location": "SYDNEY",
      "period": "Start Date: 13/07/2026 - End Date:  10/07/2028",
      "prices": [
        {
          "description": "Tuition Fee",
          "price": 12000
        },
        {
          "description": "Material Fee",
          "price": 0
        },
        {
          "description": "Enrolment Fee",
          "price": 0
        },
        {
          "description": "Additional Fee",
          "price": 0
        }
      ],
      "school": {
        "name": '',
        "logo": '',
        "location": undefined
      }
    }
  ],
  "extras": [
    {
      "logo": "https://placehold.co/100x100.png",
      "name": "VISA Application",
      "period": "Student VISA Subclass 500",
      "price": 1622.4
    },
    {
      "logo": "https://placehold.co/100x100.png",
      "name": "VISA Application",
      "period": "Subsequent temporary application charge",
      "price": 709.8
    },
    {
      "logo": "https://placehold.co/100x100.png",
      "name": "Bupa OSHC",
      "period": "Single - Start Date: 14/07/2025 - End Date: 10/09/2028",
      "price": 2954
    }
  ],
  "paymentPlan": [
    {
      "dueDate": "30/06/2025",
      "firstPayment": true,
      "description": "",
      "payments": [
        {
          "description": "Advanced Diploma of Leadership and Management",
          "price": 1750
        },
        {
          "description": "Student VISA",
          "price": 1622.4
        },
        {
          "description": "Subsequent",
          "price": 709.8
        },
        {
          "description": "Bupa OSHC",
          "price": 2954
        }
      ]
    },
    {
      "dueDate": "01/10/2025",
      "firstPayment": false,
      "description": "Paid every 3 months until the end of the course",
      "payments": [
        {
          "description": "Advanced Diploma of Leadership and Management",
          "price": 1500
        }
      ]
    }
  ],
  "seller": {
    "name": "Lucas P. Rodrigues",
    "phone": "+61 479 132 985",
    "email": "operations@stbaustralia.com.au",
    "photo": "https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/fake_porfile_img.jpg"
  },
  "greetings": {
    "greeting": "Hi Geórgia,",
    "line1": "We prepared this quotation and it's valid until Thu, Jul 03, 2025.",
    "line2": "It was created on Thu, Jun 26, 2025.",
    "line3": " ",
    "line4": "You can read our Terms&Conditions about your quotation here."
  },
  "duration": "38 Months",
  "period": "Start Date: 14/07/2025 - End Date: 10/09/2028",
  "totalAmount": 8536.2
};
