
import QuoteDetailPage from '@/components/quote-detail-page';
import { currentUser } from '@/data/user';
import QuoteDetailFooter from '@/components/quote-detail-footer';
import QuoteDetailHeader from '@/components/quote-detail-header';
import type { Quotation } from '@/types';
import logger from '@/lib/logger';

async function getQuoteData(id: string): Promise<Quotation | null> {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:9002';

    const url = `https://proposalcpqstb.blob.core.windows.net/propostas/multi-quote/quotes/${id}.json`;
    logger.info(`[QuotePage] Fetching quote data for ID: ${id} from ${url}`);
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        
        if (!res.ok) {
            const errorText = await res.text();
            logger.warn({ status: res.status, statusText: res.statusText, body: errorText }, `Failed to fetch quote data from API for ID: ${id}.`);
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();
        return data as Quotation;
        
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while fetching data.';
      logger.error({ err, id }, `[QuotePage] Error fetching or processing quotation data: ${errorMessage}`);
      console.error('[QuotePage] Error fetching or processing quotation data:', err);
      return null;
    } 
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
