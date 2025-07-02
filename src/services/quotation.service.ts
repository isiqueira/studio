import { QuotationRepository } from '@/repositories/quotation.repository';
import type { Quotation } from '@/types';

export class QuotationService {
    private quotationRepo = new QuotationRepository();

    async findAll() {
        return this.quotationRepo.findAll();
    }

    async findById(id: string) {
        return this.quotationRepo.findById(id);
    }

    async create(body: Partial<Quotation>) {
        return this.quotationRepo.create(body);
    }

    async update(id: string, body: Partial<Quotation>) {
        return this.quotationRepo.update(id, body);
    }

    async delete(id: string) {
        return this.quotationRepo.delete(id);
    }
}
