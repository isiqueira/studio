
import { NextResponse } from 'next/server';
import { QuotationService } from '@/services/quotation.service';
import logger from '@/lib/logger';
import type { Quotation } from '@/types';

const quotationService = new QuotationService();

// This function handles GET requests to /api/quote/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'Quotation ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing quotation ID.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await quotationService.findById(id);
    if (!data) {
      const errorResponse = { error: 'Quotation not found' };
      logger.warn({ status: 404, body: errorResponse, id }, '[API] Not Found: Quotation not found.');
      return NextResponse.json(errorResponse, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quotation data';
    logger.error({ err: error, id }, `[API] Error fetching quotation: ${errorMessage}`);
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
    const errorResponse = { error: 'Quotation ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing quotation ID for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  let body: Partial<Quotation>;
  try {
    body = await request.json();
  } catch (error) {
    const errorResponse = { error: 'Invalid JSON in request body' };
    logger.warn({ status: 400, err: error, id }, '[API] Bad Request: Invalid JSON for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await quotationService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update quotation data';
    logger.error({ err: error, id, body }, `[API] Error updating quotation: ${errorMessage}`);
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
        const errorResponse = { error: 'Quotation ID is required' };
        logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing quotation ID for delete.');
        return NextResponse.json(errorResponse, { status: 400 });
    }

    try {
        const data = await quotationService.delete(id);
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete quotation data';
        logger.error({ err: error, id }, `[API] Error deleting quotation: ${errorMessage}`);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
