
import { NextResponse } from 'next/server';
import { ProposalService } from '@/services/proposal.service';
import logger from '@/lib/logger';

const proposalService = new ProposalService();

// GET all proposals
export async function GET() {
  try {
    const data = await proposalService.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposals';
    logger.error({ err: error }, `[API] Error fetching proposals: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new proposal
export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
    logger.info({ payload: body }, '[API] Received new proposal payload.');
  } catch (error) {
    const errorResponse = { error: 'Invalid JSON in request body' };
    logger.warn({ status: 400, err: error }, '[API] Bad Request: Invalid JSON.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await proposalService.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create proposal';
    logger.error({ err: error, body }, `[API] Error creating proposal: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
