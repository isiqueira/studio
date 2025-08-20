"use client";

import { useState, useEffect } from 'react';
import type { Quotation, User } from '@/types';
import QuoteHeader from '@/components/quote-header';
import QuoteGallery from '@/components/quote-gallery';
import { Skeleton } from './ui/skeleton';
import logger from '@/lib/logger';

interface QuoteAppProps {
  user: User;
  proposalHash: string;
}

const QuoteAppSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <Skeleton key={i} className="h-[550px] w-full rounded-lg" />
      ))}
    </div>
  );

export default function QuoteApp({ user, proposalHash }: QuoteAppProps) {
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeUser, setActiveUser] = useState<User>(user);

  useEffect(() => {
    async function loadQuotations() {
      setLoading(true);
      setError(null);

      const url = `https://proposalcpqstb.blob.core.windows.net/propostas/multi-quote/proposals/${proposalHash}.json`;
      logger.info(`[QuoteApp] Fetching quotations data from: ${url}`);
      
      try {
          const res = await fetch(url, { cache: 'no-store' });
          logger.info(`[ProposalsPage] Fetch response status: ${res.status}`);
          if (!res.ok) {
              const errorText = await res.text();
              logger.warn({ status: res.status, statusText: res.statusText, body: errorText }, 'Failed to fetch proposals data from URL.');
              throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
          }

          const data = await res.json();

          if (Array.isArray(data)) {
            console.log('[QuoteApp] Fetched seller:', data[0].seller);
            if (data[0] && data[0].seller) {
              console.log('[QuoteApp] Fetching user data...');
                const receivedUser = {
                    name: data[0].seller.name,
                    email: data[0].seller.email,
                    avatarUrl: data[0].seller.photo,
                    avatarFallback: data[0].seller.name.substring(0,2),
                };
                setActiveUser(receivedUser);
                console.log('[QuoteApp] Fetched user:', receivedUser);
            }
            setQuotations(data);
          } else {
            throw new Error("Fetched data is not an array.");
          }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while fetching data.';
        setError(errorMessage);
        logger.error({ err }, 'Error fetching or processing quotations data');
        console.error('[QuoteApp] Error fetching or processing quotations data:', err);
      } finally {
          setLoading(false);
      }
    }
    
    if (proposalHash) {
      loadQuotations();
    } else {
      setLoading(false);
    }
  }, [proposalHash]);

  return (
    <div className="container mx-auto px-4 py-8">
      <QuoteHeader quoteCount={quotations.length} user={activeUser} />
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
