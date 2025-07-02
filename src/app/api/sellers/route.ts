import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Seller } from '@/types';

// GET all sellers
export async function GET() {
  try {
    const { data, error } = await supabase.from('sellers').select('*');
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch sellers';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new seller
export async function POST(request: Request) {
  try {
    const { name, phone, email, photo } = await request.json() as Seller;
    const { data, error } = await supabase
      .from('sellers')
      .insert([{ name, phone, email, photo }])
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
