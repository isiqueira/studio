
import { supabase } from '@/lib/supabase';
import type { Proposal } from '@/types';
import logger from '@/lib/logger';

export class ProposalRepository {
  async findAll() {
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        *,
        quotations ( count )
      `);

    if (error) throw error;
    
    return data?.map(p => ({
      ...p,
      quotations_count: p.quotations[0]?.count ?? 0,
      quotations: undefined,
    }));
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from('proposals')
      .select(`
        proposal_id,
        name,
        valid_until,
        created_at,
        companyInfo:company_info(*),
        seller:sellers(*),
        greetings(*),
        quotations:quotations(
          *,
          courses:courses(*, school:schools(*), prices:course_prices(*)),
          extras:extras(*),
          paymentPlan:payment_plan_installments(
            *,
            payments:payment_plan_payments(*)
          )
        )
      `)
      .eq('proposal_id', id)
      .single();

    if (error) {
        logger.error({ err: error, id }, 'Supabase query error in ProposalRepository.findById');
        throw error;
    }
    return data;
  }

  async create(proposalData: Omit<Proposal, 'proposal_id' | 'created_at'>) {
    const { name, valid_until, seller_id, company_info_id, greetings_id } = proposalData;
    const { data, error } = await supabase
      .from('proposals')
      .insert({ name, valid_until, seller_id, company_info_id, greetings_id })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, proposalData: Partial<Omit<Proposal, 'proposal_id' | 'created_at'>>) {
    const { name, valid_until, seller_id, company_info_id, greetings_id } = proposalData;
    const { data, error } = await supabase
      .from('proposals')
      .update({ name, valid_until, seller_id, company_info_id, greetings_id })
      .eq('proposal_id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await supabase.from('proposals').delete().eq('proposal_id', id);
    if (error) throw error;
    return { message: `Proposal ${id} deleted successfully.` };
  }
}
