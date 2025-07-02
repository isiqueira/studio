
import { NextResponse } from 'next/server';
import { ProposalRepository } from '@/repositories/proposal.repository';

const proposalRepo = new ProposalRepository();

// GET a single proposal by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
  }

  try {
    const data = await proposalRepo.findById(id);
    if (!data) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposal data';
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
    const data = await proposalRepo.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update proposal';
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
    const data = await proposalRepo.delete(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete proposal';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
