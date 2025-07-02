import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { School } from '@/types';

// GET all schools
export async function GET() {
  try {
    const { data, error } = await supabase.from('schools').select('*');
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch schools';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new school
export async function POST(request: Request) {
  try {
    const { name, logo, location, videoUrl } = await request.json() as School;
    const { data, error } = await supabase
      .from('schools')
      .insert([{ name, logo, location, video_url: videoUrl }])
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create school';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
