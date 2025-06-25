"use client";

import type { Quote } from '@/types';
import AddQuoteDialog from './add-quote-dialog';

interface QuoteHeaderProps {
  addQuote: (quote: Omit<Quote, 'id'>) => void;
}

export default function QuoteHeader({ addQuote }: QuoteHeaderProps) {
  return (
    <header className="flex justify-between items-center mb-12">
      <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground/90">Eloquent Echoes</h1>
      <AddQuoteDialog addQuote={addQuote} />
    </header>
  );
}
