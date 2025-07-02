
import { NextResponse } from 'next/server';
import { ProposalRepository } from '@/repositories/proposal.repository';

const proposalRepo = new ProposalRepository();

// GET all proposals
export async function GET() {
  try {
    const data = await proposalRepo.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposals';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new proposal
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await proposalRepo.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create proposal';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
