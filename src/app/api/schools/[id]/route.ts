
import { NextResponse } from 'next/server';
import { SchoolService } from '@/services/school.service';
import type { School } from '@/types';
import logger from '@/lib/logger';

const schoolService = new SchoolService();

// GET a single school by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'School ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing school ID.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await schoolService.findById(id);
    if (!data) {
      const errorResponse = { error: 'School not found' };
      logger.warn({ status: 404, body: errorResponse, id }, '[API] Not Found: School not found.');
      return NextResponse.json(errorResponse, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch school';
    logger.error({ err: error, id }, `[API] Error fetching school: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a school by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'School ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing school ID for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  let body: School;
  try {
    body = await request.json();
  } catch (error) {
    const errorResponse = { error: 'Invalid JSON in request body' };
    logger.warn({ status: 400, err: error, id }, '[API] Bad Request: Invalid JSON for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await schoolService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update school';
    logger.error({ err: error, id, body }, `[API] Error updating school: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a school by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'School ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing school ID for delete.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await schoolService.delete(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete school';
    logger.error({ err: error, id }, `[API] Error deleting school: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
