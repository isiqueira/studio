import QuoteDetailPage from '@/components/quote-detail-page';
import { quoteDetailsData } from '@/data/quote-details';
import { currentUser } from '@/data/user';
import QuoteDetailFooter from '@/components/quote-detail-footer';
import QuoteDetailHeader from '@/components/quote-detail-header';
import { getBlobFile } from '@/lib/azure';


export default function QuotePage({ params }: { params: { id: string } }) {
  // In a real app, you would use params.id to fetch the specific quote data.
  // For this example, we'll use the mock data directly.
  const blobData = getBlobFile('propostas', params.id);
  console.log('blobData', blobData);
  const quoteData = quoteDetailsData;
  const user = currentUser;

  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <QuoteDetailHeader companyInfo={quoteData.companyInfo} />
      <main className="flex-grow">
        <QuoteDetailPage quote={quoteData} user={user} />
      </main>
      <QuoteDetailFooter seller={quoteData.seller} />
    </div>
  );
}
