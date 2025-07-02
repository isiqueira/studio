
import { NextResponse } from 'next/server';
import { QuotationRepository } from '@/repositories/quotation.repository';

const quotationRepo = new QuotationRepository();

// GET all quotations
export async function GET() {
    try {
        const data = await quotationRepo.findAll();
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
        const data = await quotationRepo.create(body);
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create quotation';
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
