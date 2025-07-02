import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Seller } from '@/types';

// GET a single seller by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { data, error } = await supabase.from('sellers').select('*').eq('seller_id', id).single();
    if (error) throw error;
    if (!data) return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a seller by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, phone, email, photo } = await request.json() as Seller;
    const { data, error } = await supabase
      .from('sellers')
      .update({ name, phone, email, photo })
      .eq('seller_id', id)
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a seller by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { error } = await supabase.from('sellers').delete().eq('seller_id', id);
    if (error) throw error;
    return NextResponse.json({ message: `Seller ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
