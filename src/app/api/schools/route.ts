
import { NextResponse } from 'next/server';
import { SchoolService } from '@/services/school.service';
import type { School } from '@/types';

const schoolService = new SchoolService();

// GET all schools
export async function GET() {
  try {
    const data = await schoolService.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schools';
    console.error('[API] Error fetching schools:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new school
export async function POST(request: Request) {
  try {
    const body = await request.json() as School;
    const data = await schoolService.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create school';
    console.error('[API] Error creating school:', error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
