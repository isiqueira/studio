
import { NextResponse } from 'next/server';
import { ProposalService } from '@/services/proposal.service';
import logger from '@/lib/logger';
import type { Proposal } from '@/types';

const proposalService = new ProposalService();

// GET a single proposal by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'Proposal ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing proposal ID.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await proposalService.findById(id);
    if (!data) {
      const errorResponse = { error: 'Proposal not found' };
      logger.warn({ status: 404, body: errorResponse, id }, '[API] Not Found: Proposal not found.');
      return NextResponse.json(errorResponse, { status: 404 });
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
    const errorResponse = { error: 'Proposal ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing proposal ID for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }
    
  let body: Partial<Proposal>;
  try {
    body = await request.json();
  } catch (error) {
    const errorResponse = { error: 'Invalid JSON in request body' };
    logger.warn({ status: 400, err: error, id }, '[API] Bad Request: Invalid JSON for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await proposalService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update proposal';
    logger.error({ err: error, id, body }, `[API] Error updating proposal: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a proposal by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
    
  if (!id) {
    const errorResponse = { error: 'Proposal ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing proposal ID for delete.');
    return NextResponse.json(errorResponse, { status: 400 });
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
