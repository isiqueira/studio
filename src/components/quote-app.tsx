
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

        const url = 'https://proposalcpqstb.blob.core.windows.net/propostas/multi-quote/proposals/quotationfinished.json';
        console.log(`[ProposalsPage] Fetching proposals data from: ${url}`);
        logger.info(`Fetching proposals data from ${url}`);
        
        try {
            const res = await fetch(url, { cache: 'no-store' });
            console.log(`[ProposalsPage] Fetch response status: ${res.status}`);
    
            if (!res.ok) {
                logger.warn({ status: res.status, statusText: res.statusText }, 'Failed to fetch proposals data from URL.');
                console.error(`[ProposalsPage] Failed to fetch proposals data. Status: ${res.status}`);
            }
    
            const data = await res.json();
            console.log('[ProposalsPage] Fetched data:', JSON.stringify(data, null, 2));
            
            // Transform the data to match the Proposal type
            if (Array.isArray(data)) {
                data.map((item: any) => ({
                    proposal_id: item.quotationId || item.quotationHash,
                    name: item.name,
                    created_at: item.createdAt || new Date().toISOString(),
                    valid_until: item.validUntil || new Date().toISOString(),
                    quotations_count: (item.courses?.length || 0) + (item.extras?.length || 0),
                }));
              setQuotations(data);
              setLoading(false);
            }
        } catch (error) {
          logger.error({ err: error }, 'Error fetching or processing proposals data');
          console.error('[ProposalsPage] Error fetching or processing proposals data:', error);
        }
        // Use local mock data when feature flag is off
        logger.info('Using local mock data for quotations');
        // setQuotations(initialQuotations);
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
