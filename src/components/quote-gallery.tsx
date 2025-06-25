"use client";

import type { Quotation } from '@/types';
import QuoteCard from './quote-card';

interface QuoteGalleryProps {
  quotations: Quotation[];
}

export default function QuoteGallery({ quotations }: QuoteGalleryProps) {
  if (quotations.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-headline">No quotations yet.</h2>
        <p className="text-muted-foreground mt-2">There are no quotations to display.</p>
      </div>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quotations.map((quotation, index) => (
        <QuoteCard key={quotation.id} quotation={quotation} index={index} />
      ))}
    </div>
  );
}
