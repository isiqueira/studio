'use client';

import type { Proposal } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface ProposalListProps {
  proposals: (Proposal & { quotations_count?: number })[];
}

export default function ProposalList({ proposals }: ProposalListProps) {

  if (!proposals || proposals.length === 0) {
    return (
      <div className="text-center py-20 border rounded-lg">
        <h2 className="text-2xl font-headline">No proposals found.</h2>
        <p className="text-muted-foreground mt-2">There are no proposals to display yet.</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  return (
    <div className="border rounded-lg">
      <Table>
        <TableCaption>A list of your recent proposals.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40%]">Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Valid Until</TableHead>
            <TableHead className="text-center">Quotations</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {proposals.map((proposal) => (
            <TableRow key={proposal.proposal_id}>
              <TableCell className="font-medium">{proposal.name}</TableCell>
              <TableCell>{formatDate(proposal.created_at)}</TableCell>
              <TableCell>{formatDate(proposal.valid_until)}</TableCell>
              <TableCell className="text-center">
                <Badge variant="secondary">{proposal.quotations_count ?? 0}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
