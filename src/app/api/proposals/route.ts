import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all proposals
export async function GET() {
  try {
    // This query fetches a summary of proposals, including a count of associated quotations.
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        *,
        quotations ( count )
      `);

    if (error) throw error;
    
    const formattedData = data?.map(p => ({
      ...p,
      quotations_count: p.quotations[0]?.count ?? 0,
      quotations: undefined, // remove original array
    }));

    return NextResponse.json(formattedData);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposals';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new proposal
export async function POST(request: Request) {
  try {
    const { name, valid_until, seller_id, company_info_id, greetings_id } = await request.json();

    const { data, error } = await supabase
      .from('proposals')
      .insert({ name, valid_until, seller_id, company_info_id, greetings_id })
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create proposal';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
