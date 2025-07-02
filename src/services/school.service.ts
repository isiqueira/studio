import { SchoolRepository } from '@/repositories/school.repository';
import type { School } from '@/types';

export class SchoolService {
    private schoolRepo = new SchoolRepository();

    async findAll() {
        return this.schoolRepo.findAll();
    }

    async findById(id: string) {
        return this.schoolRepo.findById(id);
    }

    async create(schoolData: School) {
        return this.schoolRepo.create(schoolData);
    }

    async update(id: string, schoolData: School) {
        return this.schoolRepo.update(id, schoolData);
    }

    async delete(id: string) {
        return this.schoolRepo.delete(id);
    }
}
