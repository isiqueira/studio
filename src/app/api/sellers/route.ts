
import { NextResponse } from 'next/server';
import { SellerService } from '@/services/seller.service';
import type { Seller } from '@/types';
import logger from '@/lib/logger';

const sellerService = new SellerService();

// GET all sellers
export async function GET() {
  try {
    const data = await sellerService.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch sellers';
    logger.error({ err: error }, `[API] Error fetching sellers: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new seller
export async function POST(request: Request) {
  let body: Seller;
  try {
    body = await request.json();
  } catch (error) {
    const errorResponse = { error: 'Invalid JSON in request body' };
    logger.warn({ status: 400, err: error }, '[API] Bad Request: Invalid JSON.');
    return NextResponse.json(errorResponse, { status: 400 });
  }

  try {
    const data = await sellerService.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create seller';
    logger.error({ err: error, body }, `[API] Error creating seller: ${errorMessage}`);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
