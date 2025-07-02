import { ProposalRepository } from '@/repositories/proposal.repository';
import type { Proposal } from '@/types';

export class ProposalService {
  private proposalRepo = new ProposalRepository();

  async findAll() {
    return this.proposalRepo.findAll();
  }

  async findById(id: string) {
    return this.proposalRepo.findById(id);
  }

  async create(proposalData: Omit<Proposal, 'proposal_id' | 'created_at'>) {
    return this.proposalRepo.create(proposalData);
  }

  async update(id: string, proposalData: Partial<Omit<Proposal, 'proposal_id' | 'created_at'>>) {
    return this.proposalRepo.update(id, proposalData);
  }

  async delete(id: string) {
    return this.proposalRepo.delete(id);
  }
}
