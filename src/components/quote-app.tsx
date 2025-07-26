
"use client";

import { useState, useEffect } from 'react';
import type { Quotation, User } from '@/types';
import QuoteHeader from '@/components/quote-header';
import QuoteGallery from '@/components/quote-gallery';
import { Skeleton } from './ui/skeleton';
import { FROM_API } from '@/lib/feature-flags';
import { initialQuotations } from '@/data/quotes';
import logger from '@/lib/logger';

interface QuoteAppProps {
  user: User;
}

const QuoteAppSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[550px] w-full rounded-lg" />
      ))}
    </div>
  );

export default function QuoteApp({ user }: QuoteAppProps) {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadQuotations() {
      setLoading(true);
      setError(null);
      
      if (FROM_API) {
        try {
          const res = await fetch('/api/quotations');
          if (!res.ok) {
            throw new Error('Failed to fetch quotations from the server.');
          }
          const data = await res.json();
          setQuotations(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unknown error occurred.');
        } finally {
          setLoading(false);
        }
      } else {
        // Use local mock data when feature flag is off
        logger.info('Using local mock data for quotations');
        setQuotations(initialQuotations);
        setLoading(false);
      }
    }
    logger.info({ 'mainPage': 'quote-app' }, '[Page] Fetching quote data from local mock file.');
    loadQuotations();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteHeader quoteCount={quotations.length} user={user} />
      {loading ? (
        <QuoteAppSkeleton />
      ) : error ? (
        <div className="text-center py-20 text-destructive">
          <h2 className="text-2xl font-headline">Failed to Load Quotations</h2>
          <p className="text-muted-foreground mt-2">{error}</p>
        </div>
      ) : (
        <QuoteGallery quotations={quotations} />
      )}
    </div>
  );
}
