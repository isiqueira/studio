
import { NextResponse } from 'next/server';
import { SchoolService } from '@/services/school.service';
import type { School } from '@/types';
import logger from '@/lib/logger';

const schoolService = new SchoolService();

// GET all schools
export async function GET() {
  try {
    const data = await schoolService.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schools';
    logger.error({ err: error }, `[API] Error fetching schools: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new school
export async function POST(request: Request) {
  let body: School;
  try {
    body = await request.json();
  } catch (error) {
    const errorResponse = { error: 'Invalid JSON in request body' };
    logger.warn({ status: 400, err: error }, '[API] Bad Request: Invalid JSON.');
    return NextResponse.json(errorResponse, { status: 400 });
  }
  
  try {
    const data = await schoolService.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create school';
    logger.error({ err: error, body }, `[API] Error creating school: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
