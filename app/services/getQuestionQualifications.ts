import { supabase } from '@/utils/supabase/client';

export async function getQuestionQualifications(userId, questionIds) {
  try {
    const { data, error } = await supabase
      .from('user_question_qualifications')
      .select('question_id, qualification')
      .eq('user_id', userId)
      .in('question_id', questionIds);

    if (error) {
      console.error('Error fetching qualification:', error);
      return null;
    }

    return data || null;
  } catch (error) {
    console.error('Unexpected error fetching qualification:', error);
    return null;
  }
}
