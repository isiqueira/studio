import QuoteApp from '@/components/quote-app';
import { currentUser } from '@/data/user';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';

export default function Home({ params }: { params: { id: string } }) {
  console.log('[Home] Rendering Home component');
  console.log(`[Home] id: ${params.id}`);
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        <QuoteApp user={currentUser} proposalHash={params.id} />
      </main>
      <AppFooter />
    </div>
  );
}
