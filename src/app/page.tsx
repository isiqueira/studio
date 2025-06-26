import QuoteApp from '@/components/quote-app';
import { currentUser } from '@/data/user';

export default function Home() {
  return <QuoteApp user={currentUser} />;
}
