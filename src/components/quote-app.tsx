"use client";

import { useState } from 'react';
import { initialQuotes } from '@/data/quotes';
import type { Quote } from '@/types';
import QuoteHeader from '@/components/quote-header';
import QuoteGallery from '@/components/quote-gallery';

export default function QuoteApp() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteHeader quoteCount={quotes.length} />
      <QuoteGallery quotes={quotes} />
    </div>
  );
}
