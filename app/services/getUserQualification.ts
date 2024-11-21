import { supabase } from '@/utils/supabase/client';

export async function getUserQualification(userId, topicId) {
  try {
    const { data, error } = await supabase
      .from('user_topic_qualifications')
      .select('qualification')
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .maybeSingle();

    if (error) {
      console.error('Error fetching qualification:', error);
      return null;
    }

    return data ? data.qualification : null;
  } catch (error) {
    console.error('Unexpected error fetching qualification:', error);
    return null;
  }
}
