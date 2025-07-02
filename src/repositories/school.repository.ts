
import { supabase } from '@/lib/supabase';
import type { School } from '@/types';

export class SchoolRepository {
  async findAll() {
    const { data, error } = await supabase.from('schools').select('*');
    if (error) throw error;
    return data;
  }

  async findById(id: string) {
    const { data, error } = await supabase.from('schools').select('*').eq('school_id', id).single();
    if (error) throw error;
    return data;
  }

  async create(schoolData: School) {
    const { name, logo, location, videoUrl } = schoolData;
    const { data, error } = await supabase
      .from('schools')
      .insert([{ name, logo, location, video_url: videoUrl }])
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async update(id: string, schoolData: School) {
    const { name, logo, location, videoUrl } = schoolData;
    const { data, error } = await supabase
      .from('schools')
      .update({ name, logo, location, video_url: videoUrl })
      .eq('school_id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  }

  async delete(id: string) {
    const { error } = await supabase.from('schools').delete().eq('school_id', id);
    if (error) throw error;
    return { message: `School ${id} deleted successfully` };
  }
}
