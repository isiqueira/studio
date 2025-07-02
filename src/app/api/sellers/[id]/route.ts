
import { NextResponse } from 'next/server';
import { SellerService } from '@/services/seller.service';
import type { Seller } from '@/types';
import logger from '@/lib/logger';

const sellerService = new SellerService();

// GET a single seller by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'Seller ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing seller ID.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await sellerService.findById(id);
    if (!data) {
      const errorResponse = { error: 'Seller not found' };
      logger.warn({ status: 404, body: errorResponse, id }, '[API] Not Found: Seller not found.');
      return NextResponse.json(errorResponse, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch seller';
    logger.error({ err: error, id }, `[API] Error fetching seller: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a seller by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'Seller ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing seller ID for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  let body: Seller;
  try {
    body = await request.json();
  } catch (error) {
    const errorResponse = { error: 'Invalid JSON in request body' };
    logger.warn({ status: 400, err: error, id }, '[API] Bad Request: Invalid JSON for update.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await sellerService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update seller';
    logger.error({ err: error, id, body }, `[API] Error updating seller: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a seller by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    const errorResponse = { error: 'Seller ID is required' };
    logger.warn({ status: 400, body: errorResponse, id }, '[API] Bad Request: Missing seller ID for delete.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await sellerService.delete(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete seller';
    logger.error({ err: error, id }, `[API] Error deleting seller: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
