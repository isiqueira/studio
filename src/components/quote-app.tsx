"use client";

import { useState } from 'react';
import { initialQuotes } from '@/data/quotes';
import type { Quote } from '@/types';
import QuoteHeader from '@/components/quote-header';
import QuoteGallery from '@/components/quote-gallery';

export default function QuoteApp() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);

  const addQuote = (quote: Omit<Quote, 'id'>) => {
    const newQuote: Quote = {
      ...quote,
      id: crypto.randomUUID(),
    };
    setQuotes((prevQuotes) => [newQuote, ...prevQuotes]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteHeader addQuote={addQuote} quoteCount={quotes.length} />
      <QuoteGallery quotes={quotes} />
    </div>
  );
}
