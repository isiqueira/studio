
import ProposalList from '@/components/proposal-list';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import type { Proposal } from '@/types';
import { FROM_API } from '@/lib/feature-flags';
import logger from '@/lib/logger';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

async function getProposals(): Promise<Proposal[]> {
    if (FROM_API) {
        try {
        const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
            ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
            : 'http://localhost:3000';

        // Use no-store to ensure fresh data on each request
        const res = await fetch(`${baseUrl}/api/proposals`, { cache: 'no-store' });

        if (!res.ok) {
            logger.warn({ status: res.status, statusText: res.statusText }, 'Failed to fetch proposals data from API.');
            return [];
        }

        const data = await res.json();
        return data;
        } catch (error) {
        logger.error({ err: error }, 'Error fetching proposals data');
        return [];
        }
    } else {
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
