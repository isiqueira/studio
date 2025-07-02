
import { NextResponse } from 'next/server';
import { SellerService } from '@/services/seller.service';
import type { Seller } from '@/types';

const sellerService = new SellerService();

// GET a single seller by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Seller ID is required' }, { status: 400 });
  }

  try {
    const data = await sellerService.findById(id);
    if (!data) {
      return NextResponse.json({ error: 'Seller not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch seller';
    console.error(`[API] Error fetching seller ${id}:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// UPDATE a seller by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Seller ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json() as Seller;
    const data = await sellerService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update seller';
    console.error(`[API] Error updating seller ${id}:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// DELETE a seller by ID
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Seller ID is required' }, { status: 400 });
  }

  try {
    const data = await sellerService.delete(id);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to delete seller';
    console.error(`[API] Error deleting seller ${id}:`, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
