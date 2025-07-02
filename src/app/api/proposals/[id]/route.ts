
import { NextResponse } from 'next/server';
import { ProposalService } from '@/services/proposal.service';
import logger from '@/lib/logger';

const proposalService = new ProposalService();

// GET a single proposal by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
  }

  try {
    const data = await proposalService.findById(id);
    if (!data) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposal data';
    logger.error({ err: error, id }, `[API] Error fetching proposal: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a proposal by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
  }
    
  try {
    const body = await request.json();
    const data = await proposalService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update proposal';
    logger.error({ err: error, id }, `[API] Error updating proposal: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a proposal by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
    
  if (!id) {
    return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
  }
    
  try {
    const data = await proposalService.delete(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete proposal';
    logger.error({ err: error, id }, `[API] Error deleting proposal: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
