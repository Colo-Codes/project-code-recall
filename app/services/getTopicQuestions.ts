import { supabase } from '@/utils/supabase/client';

export async function getTopicQuestions(topicId) {
  try {
    // FIXME: Also, fetch all the user's question qualifications to use as initial values
    const { data, error } = await supabase
      .from('questions')
      .select('id, question, answer')
      .eq('topic_id', topicId);

    if (error) {
      console.error('Error fetching questions:', error);
      return null;
    }

    // Sort by question id
    data.sort((a, b) => a.id - b.id);

    return data || null;
  } catch (error) {
    console.error('Unexpected error fetching questions:', error);
    return null;
  }
}
