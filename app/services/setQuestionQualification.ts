// services/setUserQualification.js
import { supabase } from "@/utils/supabase/client";

/**
 * Updates or inserts a user's qualification for a topic.
 *
 * @param {string} userId - The ID of the user.
 * @param {number} topicId - The ID of the topic.
 * @param {'easy' | 'medium' | 'hard'} qualification - The qualification level.
 * @returns {Promise<void>}
 */
export async function setQuestionQualification(
  userId,
  questionId,
  qualification
) {
  try {
    const { error } = await supabase
      .from("user_question_qualifications")
      .upsert(
        {
          user_id: userId,
          question_id: questionId,
          qualification,
        },
        { onConflict: "user_id, question_id" }
      );

    if (error) {
      // FIXME: handle error properly
      console.error("Error updating qualification:", error.message);
      throw new Error("Unable to update question qualification at this time.");
    }
  } catch (error) {
    // FIXME: handle error properly
    console.error("Unexpected error updating qualification:", error.message);
    throw new Error("Unable to update question qualification at this time.");
  }
}
