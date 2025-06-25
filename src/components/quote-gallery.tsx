"use client";

import type { Quote } from '@/types';
import QuoteCard from './quote-card';

interface QuoteGalleryProps {
  quotes: Quote[];
}

export default function QuoteGallery({ quotes }: QuoteGalleryProps) {
  if (quotes.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-headline">No quotes yet.</h2>
        <p className="text-muted-foreground mt-2">Why not add one?</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotes.map((quote) => (
        <QuoteCard key={quote.id} quote={quote} />
      ))}
    </div>
  );
}
