"use client";

import { useState } from 'react';
import { initialQuotations } from '@/data/quotes';
import type { Quotation } from '@/types';
import QuoteHeader from '@/components/quote-header';
import QuoteGallery from '@/components/quote-gallery';

export default function QuoteApp() {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteHeader quoteCount={quotations.length} />
      <QuoteGallery quotations={quotations} />
    </div>
  );
}
