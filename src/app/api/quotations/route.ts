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
                createdAt: created_at,
                name,
                totalAmount: total_amount,
                firstPaymentAmount: first_payment_amount,
                courses:courses (
                    *,
                    school:schools(*),
                    prices:course_prices(*)
                ),
                extras:extras (*)
            `);
        
        if (error) {
          console.error('Supabase query error:', error);
          throw error;
        }

        return NextResponse.json(quotations);

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
                // proposal_id would be needed for a full implementation
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
