import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
        courses (
          logo,
          name,
          location,
          period,
          prices:course_prices (
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
        extras (
          logo,
          name,
          period,
          price
        ),
        paymentPlan:payment_plan_installments (
          dueDate:due_date,
          firstPayment:first_payment,
          description,
          payments:payment_plan_payments (
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
    return NextResponse.json({ error: 'Failed to fetch quotation data' }, { status: 500 });
  }
}
