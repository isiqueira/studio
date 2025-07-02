
import { NextResponse } from 'next/server';
import { QuotationService } from '@/services/quotation.service';

const quotationService = new QuotationService();

// GET all quotations
export async function GET() {
    try {
        const data = await quotationService.findAll();
        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quotations';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// POST a new quotation
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data = await quotationService.create(body);
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create quotation';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
