
import ProposalDetailPage from '@/components/proposal-detail-page';
import { currentUser } from '@/data/user';
import type { Proposal } from '@/types';
import logger from '@/lib/logger';

async function getProposalData(id: string): Promise<Proposal | null> {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:9002';
    
    const url = `${baseUrl}/api/proposals/${id}`;
    logger.info(`[ProposalPage] Fetching proposal data for ID: ${id} from ${url}`);
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        
        if (!res.ok) {
            const errorText = await res.text();
            logger.warn({ status: res.status, statusText: res.statusText, body: errorText }, `Failed to fetch proposal data from API for ID: ${id}.`);
            throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        return data as Proposal;
        
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred while fetching data.';
      logger.error({ err, id }, `[ProposalPage] Error fetching or processing proposal data: ${errorMessage}`);
      console.error('[ProposalPage] Error fetching or processing proposal data:', err);
      return null;
    } 
}

export default async function ProposalPage({ params }: { params: { id: string } }) {
  console.log(`[ProposalPage] Rendering proposal page for ID: ${params.id}`);
  const proposalData = await getProposalData(params.id);
  const user = currentUser;

  if (!proposalData) {
    logger.warn({ id: params.id }, `[Page] Proposal not found.`);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">Proposal not found</h1>
        <p className="text-muted-foreground">Could not retrieve the proposal details for ID: {params.id}.</p>
      </div>
    );
  }

  return (
    <ProposalDetailPage proposal={proposalData} user={user} />
  );
}
