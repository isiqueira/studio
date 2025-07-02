
import { NextResponse } from 'next/server';
import { SellerRepository } from '@/repositories/seller.repository';
import type { Seller } from '@/types';

const sellerRepo = new SellerRepository();

// GET a single seller by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await sellerRepo.findById(id);
    if (!data) return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a seller by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await request.json() as Seller;
    const data = await sellerRepo.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a seller by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const data = await sellerRepo.delete(id);
    return NextResponse.json({ message: `Seller ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete seller';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
