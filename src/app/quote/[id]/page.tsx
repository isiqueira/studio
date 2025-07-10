
import QuoteDetailPage from '@/components/quote-detail-page';
import { currentUser } from '@/data/user';
import QuoteDetailFooter from '@/components/quote-detail-footer';
import QuoteDetailHeader from '@/components/quote-detail-header';
import type { Quotation } from '@/types';
import { quoteDetailData } from '@/data/quote-details';
import logger from '@/lib/logger';

async function getQuoteData(id: string): Promise<Quotation | null> {
    // Always use local mock data for testing purposes, ignoring the ID.
    logger.info({ id }, '[Page] Fetching quote data from local mock file.');
    return Promise.resolve(quoteDetailData);
}

export default async function QuotePage({ params }: { params: { id: string } }) {
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
