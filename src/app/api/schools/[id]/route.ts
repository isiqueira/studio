import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { School } from '@/types';

// GET a single school by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { data, error } = await supabase.from('schools').select('*').eq('school_id', id).single();
    if (error) throw error;
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
    const { name, logo, location, videoUrl } = await request.json() as School;
    const { data, error } = await supabase
      .from('schools')
      .update({ name, logo, location, video_url: videoUrl })
      .eq('school_id', id)
      .select()
      .single();
      
    if (error) throw error;
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
    const { error } = await supabase.from('schools').delete().eq('school_id', id);
    if (error) throw error;
    return NextResponse.json({ message: `School ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete school';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
