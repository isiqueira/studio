import QuoteDetailPage from '@/components/quote-detail-page';
import { currentUser } from '@/data/user';
import QuoteDetailFooter from '@/components/quote-detail-footer';
import QuoteDetailHeader from '@/components/quote-detail-header';
import type { Quotation } from '@/types';
import { FROM_API } from '@/lib/feature-flags';
import { quoteDetailData } from '@/data/quote-details';
import logger from '@/lib/logger';

async function getQuoteData(id: string): Promise<Quotation | null> {
  if (FROM_API) {
    try {
      // On the server, we need to use the full URL.
      // In a production environment, you should use an environment variable for the base URL.
      const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
        ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
        : 'http://localhost:3000';
        
      const res = await fetch(`${baseUrl}/api/quote/${id}`);

      if (!res.ok) {
        // This will catch 404s and other non-200 responses from the API
        logger.warn({ status: res.status, statusText: res.statusText, id }, 'Failed to fetch quote data from API.');
        return null;
      }
      
      const data = await res.json();
      return data;
    } catch (error) {
      logger.error({ err: error, id }, 'Error fetching quote data');
      return null;
    }
  } else {
    // Use local mock data.
    // NOTE: The mock data only contains one detailed quote, so this will only work for its ID.
    const numericId = parseInt(id, 10);
    if (numericId === quoteDetailData.id) {
      return Promise.resolve(quoteDetailData);
    }
    return Promise.resolve(null);
  }
}

export default async function QuotePage({ params }: { params: { id: string } }) {
  const quoteData = await getQuoteData(params.id);
  const user = currentUser;

  if (!quoteData) {
    logger.warn({ id: params.id }, `[Page] Quote not found. Rendering 'not found' page.`);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Quote not found</h1>
        <p className="text-muted-foreground">Could not retrieve the quote details for ID: {params.id}.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      {quoteData.companyInfo && <QuoteDetailHeader companyInfo={quoteData.companyInfo} />}
      <main className="flex-grow">
        <QuoteDetailPage quote={quoteData} user={user} />
      </main>
      {quoteData.seller && <QuoteDetailFooter seller={quoteData.seller} />}
    </div>
  );
}
