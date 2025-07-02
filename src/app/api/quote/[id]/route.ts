import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { QuoteDetails } from '@/types';

// This function handles GET requests to /api/quote/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Quotation ID is required' }, { status: 400 });
  }

  try {
    // Query the database to get the quotation and all its related data
    const { data, error } = await supabase
      .from('quotations')
      .select(`
        quotationId:quotation_id,
        quotationHash:quotation_hash,
        duration,
        period,
        totalAmount:total_amount,
        companyInfo:company_info (
            phone,
            email,
            address,
            city
        ),
        seller:sellers (
            name,
            phone,
            email,
            photo
        ),
        greetings (
            greeting,
            line1,
            line2,
            line3,
            line4
        ),
        courses:courses (
          courseId:course_id,
          logo,
          name,
          location,
          period,
          prices:course_prices (
            priceId:price_id,
            description,
            price
          ),
          school:schools (
            name,
            logo,
            location,
            videoUrl:video_url
          )
        ),
        extras:extras (
          extraId:extra_id,
          logo,
          name,
          period,
          price
        ),
        paymentPlan:payment_plan_installments (
          installmentId:installment_id,
          dueDate:due_date,
          firstPayment:first_payment,
          description,
          payments:payment_plan_payments (
            paymentId:payment_id,
            description,
            price
          )
        )
      `)
      .eq('quotation_id', id)
      .single();

    if (error) {
      console.error('Supabase query error:', error);
      throw error;
    }

    if (!data) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quotation data';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// This function handles PUT requests to /api/quote/[id] to update a quotation
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Quotation ID is required' }, { status: 400 });
  }

  try {
    const body: Partial<QuoteDetails> = await request.json();

    // NOTE: This implementation only updates top-level quotation fields.
    // A full update of nested courses, extras, and payment plans would require
    // more complex logic, ideally within a database transaction (RPC call in Supabase)
    // to ensure data consistency.
    const { data, error } = await supabase
      .from('quotations')
      .update({
        duration: body.duration,
        period: body.period,
        total_amount: body.totalAmount,
      })
      .eq('quotation_id', id)
      .select()
      .single();

    if (error) {
      console.error('Supabase update error:', error);
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update quotation data';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// This function handles DELETE requests to /api/quote/[id]
export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const { id } = params;
    if (!id) {
        return NextResponse.json({ error: 'Quotation ID is required' }, { status: 400 });
    }

    try {
        // With ON DELETE CASCADE set in the database, deleting the quotation
        // will automatically delete all related child records.
        const { error } = await supabase
            .from('quotations')
            .delete()
            .eq('quotation_id', id);

        if (error) {
            console.error('Supabase delete error:', error);
            throw error;
        }

        return NextResponse.json({ message: `Quotation ${id} deleted successfully.` }, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete quotation data';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
