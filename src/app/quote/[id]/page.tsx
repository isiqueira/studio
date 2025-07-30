
import QuoteDetailPage from '@/components/quote-detail-page';
import { currentUser } from '@/data/user';
import QuoteDetailFooter from '@/components/quote-detail-footer';
import QuoteDetailHeader from '@/components/quote-detail-header';
import type { Quotation } from '@/types';
import { quoteDetailData } from '@/data/quote-details';
import logger from '@/lib/logger';

async function getQuoteData(id: string): Promise<Quotation | null> {
    console.log(`[QuotePage] Fetching quote data for ID: ${id}`);
    const url = 'https://proposalcpqstb.blob.core.windows.net/propostas/multi-quote/quotes/quotation2.json';
    logger.info(`[QuoteApp] Fetching quotations data from: ${url}`);
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        console.log(`[ProposalsPage] Fetch response status: ${res.status}`);
        if (!res.ok) {
            const errorText = await res.text();
            logger.warn({ status: res.status, statusText: res.statusText, body: errorText }, 'Failed to fetch proposals data from URL.');
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        console.log(`[QuotePage] Fetching quote data from: ${url}`);
        const data = await res.json();
        return Promise.resolve(data);
        
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while fetching data.';

      logger.error({ err }, 'Error fetching or processing quotations data');
      console.error('[QuoteApp] Error fetching or processing quotations data:', err);
    } 
    
    return Promise.resolve(null);
}

export default async function QuotePage({ params }: { params: { id: string } }) {
  console.log(`[QuotePage] Rendering quote page for ID: ${params.id}`);
  const quoteData = await getQuoteData(params.id);
  const user = currentUser;

  if (!quoteData) {
    logger.warn({ id: params.id }, `[Page] Quote not found. This should not happen with the current mock setup.`);
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
