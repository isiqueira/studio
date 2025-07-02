
import { NextResponse } from 'next/server';
import { ProposalService } from '@/services/proposal.service';

const proposalService = new ProposalService();

// GET all proposals
export async function GET() {
  try {
    const data = await proposalService.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposals';
    console.error('[API] Error fetching proposals:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new proposal
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await proposalService.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create proposal';
    console.error('[API] Error creating proposal:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
