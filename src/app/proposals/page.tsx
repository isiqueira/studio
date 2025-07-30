
import ProposalList from '@/components/proposal-list';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import type { Proposal } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import logger from '@/lib/logger';

async function getProposals(): Promise<Proposal[]> {
    const url = 'https://proposalcpqstb.blob.core.windows.net/propostas/multi-quote/proposals/quotationfinished.json';
    console.log(`[ProposalsPage] Fetching proposals data from: ${url}`);
    logger.info(`Fetching proposals data from ${url}`);
    
    try {
        const res = await fetch(url, { cache: 'no-store' });
        console.log(`[ProposalsPage] Fetch response status: ${res.status}`);

        if (!res.ok) {
            logger.warn({ status: res.status, statusText: res.statusText }, 'Failed to fetch proposals data from URL.');
            console.error(`[ProposalsPage] Failed to fetch proposals data. Status: ${res.status}`);
            return [];
        }

        const data = await res.json();
        console.log('[ProposalsPage] Fetched data:', JSON.stringify(data, null, 2));
        
        // Transform the data to match the Proposal type
        if (Array.isArray(data)) {
            return data.map((item: any) => ({
                proposal_id: item.quotationId || item.quotationHash,
                name: item.name,
                created_at: item.createdAt || new Date().toISOString(),
                valid_until: item.validUntil || new Date().toISOString(),
                quotations_count: (item.courses?.length || 0) + (item.extras?.length || 0),
            }));
        }

        return [];
    } catch (error) {
        logger.error({ err: error }, 'Error fetching or processing proposals data');
        console.error('[ProposalsPage] Error fetching or processing proposals data:', error);
        return [];
    }
}

async function ProposalsData() {
    const proposals = await getProposals();
    return <ProposalList proposals={proposals} />;
}

const ProposalsSkeleton = () => (
     <div className="border rounded-lg">
        <Table>
        <TableHeader>
            <TableRow>
            <TableHead className="w-[40%]"><Skeleton className="h-5 w-24" /></TableHead>
            <TableHead><Skeleton className="h-5 w-32" /></TableHead>
            <TableHead><Skeleton className="h-5 w-32" /></TableHead>
            <TableHead className="text-center"><Skeleton className="h-5 w-20 mx-auto" /></TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
                <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell><Skeleton className="h-5 w-24" /></TableCell>
                <TableCell className="text-center"><Skeleton className="h-6 w-8 mx-auto rounded-full" /></TableCell>
            </TableRow>
            ))}
        </TableBody>
        </Table>
    </div>
);

export default async function ProposalsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Proposals</h1>
        </div>
        <Suspense fallback={<ProposalsSkeleton />}>
            <ProposalsData />
        </Suspense>
      </main>
      <AppFooter />
    </div>
  );
}
