import type { QuoteDetails } from '@/types';

export const quoteDetailsData: QuoteDetails = {
  validUntil: '2025-06-16',
  createdAt: '2025-06-09',
  termsLink: '#',
  courses: [
    {
      id: 1,
      logo: 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/uec-logo.png',
      name: 'General English',
      location: 'SYDNEY',
      startDate: '2026-01-12',
      endDate: '2026-06-26',
      prices: [
        { label: 'Tuition Fee', amount: 5280, currency: 'AUD' },
        { label: 'Material Fee', amount: 80, currency: 'AUD' },
        { label: 'Enrolment Fee', amount: 250, currency: 'AUD' },
        { label: 'Additional Fee', amount: 0, currency: 'AUD' },
      ],
      total: 5610,
      currency: 'AUD',
    },
    {
      id: 2,
      logo: 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/nsw-logo.png',
      name: 'High School - Dependent VISA',
      location: 'NSW',
      terms: ['Term 2: 2025-10-13', 'Term 3'],
      prices: [],
      total: 8100,
      currency: 'AUD',
      included: [
        'School Tuition fees',
        'School registration fee',
        'STB/Australia Administration fee',
        'Final school report at the end of the programme'
      ],
      notIncluded: [
        'Any additional costs associated with a co-existing school, such as school uniform, class materials, exam fees, lockers hire fees, camping and day trips, private tuition, instrument usage, transportation to and from excursions in excess of non-refundable activities. Student’s personal expenses, such as personal belongings, travel costs, telephone bills, and spending money. The student must have sufficient funds for daily expenses. In Australia | Flight tickets and visa fee'
      ]
    },
  ],
  extras: [
    {
      id: 1,
      logo: 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/visa-logo.png',
      name: 'VISA Application',
      description: 'Student VISA Subclass 500',
      price: 1622.4,
      currency: 'AUD',
    },
    {
      id: 2,
      logo: 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/visa-logo.png',
      name: 'VISA Application',
      description: 'Additional applicant charge under 18',
      price: 305.46,
      currency: 'AUD',
    },
    {
      id: 3,
      logo: 'https://bgnaezcaazpvxiiflzek.supabase.co/storage/v1/object/public/quote-images/bupa-logo.png',
      name: 'Bupa OSHC',
      description: 'Couple - Start Date: 12/01/2026 - End Date: 19/12/2026',
      price: 100,
      currency: 'AUD',
    },
  ],
  paymentPlan: {
    duration: '11 Months',
    startDate: '2025-07-21',
    endDate: '2026-06-26',
    totalAmount: 15957.86,
    currency: 'AUD',
    dueDate: '2025-08-20',
    items: [
      { description: 'General English', amount: 5610, currency: 'AUD' },
      { description: 'High School - Dependent VISA', amount: 8100, currency: 'AUD' },
      { description: 'Student VISA', amount: 1622.4, currency: 'AUD' },
      { description: 'Additional Applicant', amount: 305.46, currency: 'AUD' },
      { description: 'Off Shore Admin VISA Fee', amount: 250, currency: 'AUD' },
    ],
    totalFirstPayment: 15887.86,
  },
};
