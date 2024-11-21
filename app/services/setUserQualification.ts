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
export async function setUserQualification(userId, topicId, qualification) {
  try {
    const { error } = await supabase.from("user_topic_qualifications").upsert(
      {
        user_id: userId,
        topic_id: topicId,
        qualification,
      },
      { onConflict: "user_id, topic_id" }
    );

    if (error) {
      // FIXME: handle error properly
      console.error("Error updating qualification:", error.message);
      throw new Error("Unable to update user qualification at this time.");
    }
  } catch (error) {
    // FIXME: handle error properly
    console.error("Unexpected error updating qualification:", error.message);
    throw new Error("Unable to update user qualification at this time.");
  }
}
