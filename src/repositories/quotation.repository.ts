
import { supabase } from '@/lib/supabase';
import type { Quotation } from '@/types';

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
      console.error('Supabase query error:', error);
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
        companyInfo:proposals(company_info(*)),
        seller:proposals(sellers(*)),
        greetings:proposals(greetings(*)),
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
      console.error('Supabase query error:', error);
      throw error;
    }

    if (!data) return null;

    return {
        ...data,
        companyInfo: data.companyInfo?.company_info,
        seller: data.seller?.sellers,
        greetings: data.greetings?.greetings,
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
      console.error('Supabase insert error:', error);
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
      console.error('Supabase update error:', error);
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
      console.error('Supabase delete error:', error);
      throw error;
    }
    return { message: `Quotation ${id} deleted successfully.` };
  }
}
