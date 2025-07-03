
import { supabase } from '@/lib/supabase';
import type { Quotation } from '@/types';
import logger from '@/lib/logger';

export class QuotationRepository {
  async findAll() {
    const { data: quotations, error } = await supabase
      .from('quotations')
      .select(`
        id: quotation_id,
        quotationHash: quotation_hash,
        validUntil: valid_until,
        createdAt: created_at,
        name,
        totalAmount: total_amount,
        firstPaymentAmount: first_payment_amount,
        courses:courses (
            *,
            school:schools(*),
            prices:course_prices(*)
        ),
        extras:extras (*)
      `);
    
    if (error) {
      logger.error({ err: error }, 'Supabase query error in QuotationRepository.findAll');
      throw error;
    }
    return quotations;
  }

  async findById(id: string) {
    const { data, error } = await supabase
      .from('quotations')
      .select(`
        id:quotation_id,
        quotationHash:quotation_hash,
        duration,
        period,
        totalAmount:total_amount,
        firstPaymentAmount: first_payment_amount,
        validUntil: valid_until,
        createdAt: created_at,
        proposal:proposals(
            companyInfo:company_info(*),
            seller:sellers(*),
            greetings:greetings(*)
        ),
        courses:courses (
          courseId:course_id,
          logo,
          name,
          location,
          period,
          prices:course_prices (
            priceId:price_id,
            description,
            price
          ),
          school:schools (
            name,
            logo,
            location,
            videoUrl:video_url
          )
        ),
        extras:extras (
          extraId:extra_id,
          logo,
          name,
          period,
          price
        ),
        paymentPlan:payment_plan_installments (
          installmentId:installment_id,
          dueDate:due_date,
          firstPayment:first_payment,
          description,
          payments:payment_plan_payments (
            paymentId:payment_id,
            description,
            price
          )
        )
      `)
      .eq('quotation_id', id)
      .single();

    if (error) {
      logger.error({ err: error, id }, 'Supabase query error in QuotationRepository.findById');
      throw error;
    }

    if (!data) return null;

    // The data for companyInfo, seller, and greetings is nested inside 'proposal'.
    // We need to flatten it to match the Quotation type.
    const { proposal, ...restOfData } = data;
    
    return {
      ...restOfData,
      companyInfo: proposal?.companyInfo,
      seller: proposal?.seller,
      greetings: proposal?.greetings,
    };
  }

  async create(body: Partial<Quotation>) {
    const { data, error } = await supabase
      .from('quotations')
      .insert({
        name: body.name,
        total_amount: body.totalAmount,
        first_payment_amount: body.firstPaymentAmount,
        duration: body.duration,
        period: body.period,
        valid_until: body.validUntil,
      })
      .select()
      .single();

    if (error) {
      logger.error({ err: error }, 'Supabase insert error in QuotationRepository.create');
      throw error;
    }
    return data;
  }

  async update(id: string, body: Partial<Quotation>) {
    const { data, error } = await supabase
      .from('quotations')
      .update({
        duration: body.duration,
        period: body.period,
        total_amount: body.totalAmount,
        first_payment_amount: body.firstPaymentAmount,
        name: body.name,
      })
      .eq('quotation_id', id)
      .select()
      .single();

    if (error) {
      logger.error({ err: error, id }, 'Supabase update error in QuotationRepository.update');
      throw error;
    }
    return data;
  }

  async delete(id: string) {
    const { error } = await supabase
      .from('quotations')
      .delete()
      .eq('quotation_id', id);

    if (error) {
      logger.error({ err: error, id }, 'Supabase delete error in QuotationRepository.delete');
      throw error;
    }
    return { message: `Quotation ${id} deleted successfully.` };
  }
}
