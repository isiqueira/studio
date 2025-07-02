import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET a single proposal by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
  }

  try {
    // This is a complex query to fetch a proposal and all its related data,
    // assuming relationships (including M2M) are set up in Supabase.
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        proposal_id,
        name,
        valid_until,
        created_at,
        companyInfo:company_info(*),
        seller:sellers(*),
        greetings(*),
        quotations:quotations(
          *,
          courses:courses(*, school:schools(*), prices:course_prices(*)),
          extras:extras(*),
          paymentPlan:payment_plan_installments(
            *,
            payments:payment_plan_payments(*)
          )
        )
      `)
      .eq('proposal_id', id)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }
    if (!data) {
      return NextResponse.json({ error: 'Proposal not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch proposal data';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a proposal by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
  }
    
  try {
    const { name, valid_until, seller_id, company_info_id, greetings_id } = await request.json();
    
    const { data, error } = await supabase
      .from('proposals')
      .update({ name, valid_until, seller_id, company_info_id, greetings_id })
      .eq('proposal_id', id)
      .select()
      .single();
      
    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update proposal';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a proposal by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
    
  if (!id) {
    return NextResponse.json({ error: 'Proposal ID is required' }, { status: 400 });
  }
    
  try {
    // ON DELETE CASCADE in the DB will handle deleting associated quotations.
    const { error } = await supabase.from('proposals').delete().eq('proposal_id', id);

    if (error) throw error;
        
    return NextResponse.json({ message: `Proposal ${id} deleted successfully.` }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete proposal';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
