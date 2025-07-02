
import { NextResponse } from 'next/server';
import { SchoolRepository } from '@/repositories/school.repository';
import type { School } from '@/types';

const schoolRepo = new SchoolRepository();

// GET all schools
export async function GET() {
  try {
    const data = await schoolRepo.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schools';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new school
export async function POST(request: Request) {
  try {
    const body = await request.json() as School;
    const data = await schoolRepo.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create school';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
