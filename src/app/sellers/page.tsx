
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';
import SellerList from '@/components/seller-list';
import type { Seller } from '@/types';
import logger from '@/lib/logger';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

async function getSellers(): Promise<Seller[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : 'http://localhost:3000';

    // Use no-store to ensure fresh data on each request
    const res = await fetch(`${baseUrl}/api/sellers`, { cache: 'no-store' });

    if (!res.ok) {
      logger.warn({ status: res.status, statusText: res.statusText }, 'Failed to fetch sellers data from API.');
      return [];
    }

    const data = await res.json();
    return data;
  } catch (error) {
    logger.error({ err: error }, 'Error fetching sellers data');
    return [];
  }
}

async function SellersData() {
    const sellers = await getSellers();
    return <SellerList initialSellers={sellers} />;
}

const SellersSkeleton = () => (
     <div className="space-y-4">
        <div className="flex justify-end">
            <Skeleton className="h-10 w-32" />
        </div>
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead><Skeleton className="h-5 w-24" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-48" /></TableHead>
                        <TableHead><Skeleton className="h-5 w-32" /></TableHead>
                        <TableHead className="text-right"><Skeleton className="h-5 w-20 ml-auto" /></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {[...Array(3)].map((_, i) => (
                    <TableRow key={i}>
                        <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-5/6" /></TableCell>
                        <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
                        <TableCell className="text-right"><Skeleton className="h-8 w-20 ml-auto" /></TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    </div>
);


export default async function SellersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AppHeader />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Seller Management</h1>
        </div>
        <Suspense fallback={<SellersSkeleton />}>
            <SellersData />
        </Suspense>
      </main>
      <AppFooter />
    </div>
  );
}
