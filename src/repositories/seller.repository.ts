
import { supabase } from '@/lib/supabase';
import type { Seller } from '@/types';

export class SellerRepository {
  async findAll() {
    const { data, error } = await supabase.from('sellers').select('*');
    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase.from('sellers').select('*').eq('seller_id', id).single();
    if (error) throw error;
    return data;
  }

  async create(sellerData: Seller) {
    const { name, phone, email, photo } = sellerData;
    const { data, error } = await supabase
      .from('sellers')
      .insert([{ name, phone, email, photo }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id: string, sellerData: Seller) {
    const { name, phone, email, photo } = sellerData;
    const { data, error } = await supabase
      .from('sellers')
      .update({ name, phone, email, photo })
      .eq('seller_id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await supabase.from('sellers').delete().eq('seller_id', id);
    if (error) throw error;
    return { message: `Seller ${id} deleted successfully` };
  }
}
