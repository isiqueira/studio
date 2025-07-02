import { SellerRepository } from '@/repositories/seller.repository';
import type { Seller } from '@/types';

export class SellerService {
    private sellerRepo = new SellerRepository();

    async findAll() {
        return this.sellerRepo.findAll();
    }

    async findById(id: string) {
        return this.sellerRepo.findById(id);
    }

    async create(sellerData: Seller) {
        return this.sellerRepo.create(sellerData);
    }

    async update(id: string, sellerData: Seller) {
        return this.sellerRepo.update(id, sellerData);
    }

    async delete(id: string) {
        return this.sellerRepo.delete(id);
    }
}
