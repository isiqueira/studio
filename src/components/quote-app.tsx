"use client";

import { useState } from 'react';
import { initialQuotations } from '@/data/quotes';
import type { Quotation, User } from '@/types';
import QuoteHeader from '@/components/quote-header';
import QuoteGallery from '@/components/quote-gallery';

interface QuoteAppProps {
  user: User;
}

export default function QuoteApp({ user }: QuoteAppProps) {
  const [quotations, setQuotations] = useState<Quotation[]>(initialQuotations);

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteHeader quoteCount={quotations.length} user={user} />
      <QuoteGallery quotations={quotations} />
    </div>
  );
}
