import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// GET all quotations
export async function GET() {
    try {
        // This query fetches all quotations and formats them for the QuoteCard component.
        const { data: quotations, error } = await supabase
            .from('quotations')
            .select(`
                id: quotation_id,
                quotationHash: quotation_hash,
                validUntil: valid_until,
                created_at,
                name,
                totalAmount: total_amount,
                firstPaymentAmount: first_payment_amount,
                courses:courses (
                    logo,
                    name,
                    location,
                    period,
                    school:schools (
                        name,
                        logo
                    ),
                    prices:course_prices (
                        description,
                        price
                    )
                ),
                extras:extras (
                    logo,
                    name,
                    period,
                    price
                )
            `);
        
        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }

        // The frontend QuoteCard component expects data in a nested `quote` object.
        // We transform the flat API response to match this structure.
        const formattedData = quotations.map(q => ({
            id: q.id,
            quote: {
                id: q.id,
                quotationHash: q.quotationHash,
                validUntil: q.validUntil,
                created_at: q.created_at,
                name: q.name,
                courses: q.courses,
                extras: q.extras,
                paymentPlan: [], // Not needed for the list view
                totalAmount: q.totalAmount,
                firstPaymentAmount: q.firstPaymentAmount
            }
        }));

        return NextResponse.json(formattedData);

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quotations';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// POST a new quotation
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // NOTE: This is a simplified POST to create a basic quotation record.
        // A full implementation would need to handle nested data like courses, extras, etc.,
        // ideally within a database transaction (RPC call in Supabase).
        // This requires a more detailed request body structure including foreign keys.
        const { data, error } = await supabase
            .from('quotations')
            .insert({
                name: body.name,
                total_amount: body.totalAmount,
                first_payment_amount: body.firstPaymentAmount,
                duration: body.duration,
                period: body.period,
                valid_until: body.validUntil,
                // seller_id, company_info_id, etc. would be needed for a full implementation
            })
            .select()
            .single();

        if (error) {
            console.error('Supabase insert error:', error);
            throw error;
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create quotation';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
