
import { NextResponse } from 'next/server';
import { QuotationService } from '@/services/quotation.service';
import logger from '@/lib/logger';

const quotationService = new QuotationService();

// GET all quotations
export async function GET() {
    try {
        const data = await quotationService.findAll();
        return NextResponse.json(data);
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quotations';
        logger.error({ err: error }, `[API] Error fetching quotations: ${errorMessage}`);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}

// POST a new quotation
export async function POST(request: Request) {
    let body;
    try {
        body = await request.json();
    } catch (error) {
        const errorResponse = { error: 'Invalid JSON in request body' };
        logger.warn({ status: 400, err: error }, '[API] Bad Request: Invalid JSON.');
        return NextResponse.json(errorResponse, { status: 400 });
    }

    try {
        const data = await quotationService.create(body);
        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to create quotation';
        logger.error({ err: error, body }, `[API] Error creating quotation: ${errorMessage}`);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
