import QuoteDetailPage from '@/components/quote-detail-page';
import { currentUser } from '@/data/user';
import QuoteDetailFooter from '@/components/quote-detail-footer';
import QuoteDetailHeader from '@/components/quote-detail-header';
import type { Quotation } from '@/types';

async function getQuoteData(id: string): Promise<Quotation | null> {
  try {
    // On the server, we need to use the full URL.
    // In a production environment, you should use an environment variable for the base URL.
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL 
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` 
      : 'http://localhost:3000';
      
    const res = await fetch(`${baseUrl}/api/quote/${id}`);

    if (!res.ok) {
      console.error(`Failed to fetch quote: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching quote data:', error);
    return null;
  }
}

export default async function QuotePage({ params }: { params: { id: string } }) {
  const quoteData = await getQuoteData(params.id);
  const user = currentUser;

  if (!quoteData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Quote not found</h1>
        <p className="text-muted-foreground">Could not retrieve the quote details.</p>
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
