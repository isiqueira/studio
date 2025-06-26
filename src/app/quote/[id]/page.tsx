import QuoteDetailPage from '@/components/quote-detail-page';
import { quoteDetailsData } from '@/data/quote-details';
import { currentUser } from '@/data/user';

export default function QuotePage({ params }: { params: { id: string } }) {
  // In a real app, you would use params.id to fetch the specific quote data.
  // For this example, we'll use the mock data directly.
  const quoteData = quoteDetailsData;
  const user = currentUser;

  return <QuoteDetailPage quote={quoteData} user={user} />;
}
