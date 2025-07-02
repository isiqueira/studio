
import { NextResponse } from 'next/server';
import { SchoolRepository } from '@/repositories/school.repository';
import type { School } from '@/types';

const schoolRepo = new SchoolRepository();

// GET a single school by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await schoolRepo.findById(id);
    if (!data) return NextResponse.json({ error: 'School not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch school';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a school by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json() as School;
    const data = await schoolRepo.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update school';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a school by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await schoolRepo.delete(id);
    return NextResponse.json({ message: `School ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete school';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
