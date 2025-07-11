
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
    
    return data?.map((p: any) => ({
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
        greetings(
          *,
          videoUrl:video_url
        ),
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

  async create(proposalData: any): Promise<Proposal | null> {
    // Upsert Seller based on email
    const { data: sellerData, error: sellerError } = await supabase
      .from('sellers')
      .upsert({
        name: proposalData.seller.name,
        phone: proposalData.seller.phone,
        email: proposalData.seller.email,
        photo: proposalData.seller.photo,
      }, { onConflict: 'email' })
      .select()
      .single();

    if (sellerError) {
      logger.error({ err: sellerError }, 'Failed to upsert seller during proposal creation.');
      throw sellerError;
    }
    const seller_id = sellerData.seller_id;

    // Upsert CompanyInfo based on email
    const { data: companyInfoData, error: companyInfoError } = await supabase
      .from('company_info')
      .upsert({
        phone: proposalData.companyInfo.phone,
        email: proposalData.companyInfo.email,
        address: proposalData.companyInfo.address,
        city: proposalData.companyInfo.city,
      }, { onConflict: 'email' })
      .select()
      .single();
    
    if (companyInfoError) {
      logger.error({ err: companyInfoError }, 'Failed to upsert company info during proposal creation.');
      throw companyInfoError;
    }
    const company_info_id = companyInfoData.id;

    // Insert Greetings (no unique constraint to upsert on)
    const { data: greetingsData, error: greetingsError } = await supabase
      .from('greetings')
      .insert({
        ...proposalData.greetings,
        video_url: proposalData.greetings.videoUrl
      })
      .select()
      .single();
    
    if (greetingsError) {
      logger.error({ err: greetingsError }, 'Failed to insert greetings during proposal creation.');
      throw greetingsError;
    }
    const greetings_id = greetingsData.id;

    // Create the Proposal record
    const proposalName = proposalData.name || `Proposal for ${proposalData.greetings.greeting.replace('Hi ', '').replace(',', '')}`;
    const validUntil = proposalData.valid_until || new Date(new Date().setDate(new Date().getDate() + 30)).toISOString();

    const { data: newProposal, error: proposalError } = await supabase
      .from('proposals')
      .insert({
        name: proposalName,
        valid_until: validUntil,
        seller_id: seller_id,
        company_info_id: company_info_id,
        greetings_id: greetings_id,
      })
      .select()
      .single();

    if (proposalError) {
      logger.error({ err: proposalError }, 'Failed to create proposal record.');
      throw proposalError;
    }
    const proposal_id = newProposal.proposal_id;

    // Loop through quotations to create them and their children
    for (const quotation of proposalData.quotations || []) {
      const quotationName = quotation.courses?.map((c: any) => c.name).join(' & ') || 'Quotation';
      const firstPaymentInstallment = quotation.paymentPlan?.find((p: any) => p.firstPayment);
      const firstPaymentAmount = firstPaymentInstallment ? firstPaymentInstallment.payments.reduce((sum: number, p: any) => sum + p.price, 0) : 0;
      
      const { data: newQuotation, error: quotationError } = await supabase
        .from('quotations')
        .insert({
          name: quotationName,
          total_amount: quotation.totalAmount,
          first_payment_amount: firstPaymentAmount,
          duration: String(quotation.duration),
          period: quotation.period,
          proposal_id: proposal_id,
          quotation_hash: quotation.quotationHash,
          valid_until: validUntil,
        })
        .select('quotation_id')
        .single();

      if (quotationError) {
        logger.error({ err: quotationError, quotation }, 'Failed to create quotation record.');
        throw quotationError;
      }
      const quotation_id = newQuotation.quotation_id;
      
      // Courses
      for (const course of quotation.courses || []) {
        let school_id = null;
        if (course.school) {
          const { data: schoolData, error: schoolError } = await supabase
            .from('schools')
            .upsert({
              name: course.school.name,
              logo: course.school.logo,
              location: course.school.location,
              video_url: course.school.videoUrl,
            }, { onConflict: 'name' })
            .select('school_id')
            .single();

          if (schoolError) {
            logger.error({ err: schoolError, school: course.school }, 'Failed to upsert school.');
            throw schoolError;
          }
          school_id = schoolData.school_id;
        }

        const { data: newCourse, error: courseError } = await supabase
          .from('courses')
          .insert({
            name: course.name,
            logo: course.logo,
            location: course.location,
            period: course.period,
            quotation_id: quotation_id,
            school_id: school_id,
          })
          .select('course_id')
          .single();

        if (courseError) {
          logger.error({ err: courseError, course }, 'Failed to create course record.');
          throw courseError;
        }
        const course_id = newCourse.course_id;

        if (course.prices && course.prices.length > 0) {
          const pricesToInsert = course.prices.map((p: any) => ({ ...p, course_id }));
          const { error: pricesError } = await supabase.from('course_prices').insert(pricesToInsert);
          if (pricesError) {
            logger.error({ err: pricesError }, 'Failed to create course prices.');
            throw pricesError;
          }
        } else if (course.price) {
            const priceToInsert = { description: course.name, price: course.price, course_id };
            const { error: pricesError } = await supabase.from('course_prices').insert([priceToInsert]);
            if (pricesError) {
                logger.error({ err: pricesError }, 'Failed to create single course price.');
                throw pricesError;
            }
        }
      }

      // Extras
      if (quotation.extras && quotation.extras.length > 0) {
        const extrasToInsert = quotation.extras.map((e: any) => ({ ...e, quotation_id }));
        const { error: extrasError } = await supabase.from('extras').insert(extrasToInsert);
        if (extrasError) {
          logger.error({ err: extrasError }, 'Failed to create extras.');
          throw extrasError;
        }
      }

      // Payment Plan
      for (const installment of quotation.paymentPlan || []) {
        const { data: newInstallment, error: installmentError } = await supabase
          .from('payment_plan_installments')
          .insert({
            due_date: installment.dueDate?.trim() ? installment.dueDate : null,
            first_payment: installment.firstPayment,
            description: installment.description,
            quotation_id: quotation_id,
          })
          .select('installment_id')
          .single();
        
        if (installmentError) {
          logger.error({ err: installmentError }, 'Failed to create payment installment.');
          throw installmentError;
        }
        const installment_id = newInstallment.installment_id;

        if (installment.payments && installment.payments.length > 0) {
          const paymentsToInsert = installment.payments.map((p: any) => ({ ...p, installment_id }));
          const { error: paymentsError } = await supabase.from('payment_plan_payments').insert(paymentsToInsert);
          if (paymentsError) {
            logger.error({ err: paymentsError }, 'Failed to create payment plan payments.');
            throw paymentsError;
          }
        }
      }
    }

    // Return the newly created, fully populated proposal
    return this.findById(String(proposal_id));
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
