
import { NextResponse } from 'next/server';
import { QuotationService } from '@/services/quotation.service';

const quotationService = new QuotationService();

// This function handles GET requests to /api/quote/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json({ error: 'Quotation ID is required' }, { status: 400 });
  }

  try {
    const data = await quotationService.findById(id);
    if (!data) {
      return NextResponse.json({ error: 'Quotation not found' }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch quotation data';
    console.error(`[API] Error fetching quotation ${id}:`, error);
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
    return NextResponse.json({ error: 'Quotation ID is required' }, { status: 400 });
  }

  try {
    const body = await request.json();
    const data = await quotationService.update(id, body);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to update quotation data';
    console.error(`[API] Error updating quotation ${id}:`, error);
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
        return NextResponse.json({ error: 'Quotation ID is required' }, { status: 400 });
    }

    try {
        const data = await quotationService.delete(id);
        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to delete quotation data';
        console.error(`[API] Error deleting quotation ${id}:`, error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
