
import { NextResponse } from 'next/server';
import { SchoolService } from '@/services/school.service';
import type { School } from '@/types';

const schoolService = new SchoolService();

// GET a single school by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
  }

  try {
    const data = await schoolService.findById(id);
    if (!data) {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch school';
    console.error(`[API] Error fetching school ${id}:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a school by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json() as School;
    const data = await schoolService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update school';
    console.error(`[API] Error updating school ${id}:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a school by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'School ID is required' }, { status: 400 });
  }

  try {
    const data = await schoolService.delete(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete school';
    console.error(`[API] Error deleting school ${id}:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
