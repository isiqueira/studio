
import { NextResponse } from 'next/server';
import { SellerRepository } from '@/repositories/seller.repository';
import type { Seller } from '@/types';

const sellerRepo = new SellerRepository();

// GET all sellers
export async function GET() {
  try {
    const data = await sellerRepo.findAll();
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch sellers';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST a new seller
export async function POST(request: Request) {
  try {
    const body = await request.json() as Seller;
    const data = await sellerRepo.create(body);
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
