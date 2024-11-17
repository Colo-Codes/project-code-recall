"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase/client";

export function authenticatedUser() {
  const [user, setUser] = useState(null);

  // FIXME: check if this has any security implications
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  return user;
}

function clearSupabaseAuthToken() {
  const supabaseAuthTokenKey = Object.keys(localStorage).find(
    (key) => key.startsWith("sb-") && key.endsWith("-auth-token")
  );

  if (supabaseAuthTokenKey) {
    localStorage.removeItem(supabaseAuthTokenKey);
  }
}

// FIXME: Remove console.logs and implement proper error handling
export async function signOutUser(user) {
  try {
    // Attempt to sign out
    // FIXME: will this fail after 1 hour when the token expires?
    const { error } = await supabase.auth.signOut();
    if (error) throw error;

    // Clear the specific auth token after sign-out
    clearSupabaseAuthToken();
    // Clear the user data from localStorage
    localStorage.removeItem(`user_data_${user.user_id}`);

    console.log("User signed out successfully.");
    return true;
  } catch (error) {
    console.error("Error during sign out:", error.message);
    return false;
  }
}

export async function checkUserExists(email: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: "dummyPassword",
  });

  if (error) {
    if (error.message === "User already registered") {
      console.log("User already exists.");
      return true;
    } else {
      console.error("Error during sign-up:", error.message);
      return false;
    }
  }

  if (data.user && data.user.identities.length === 0) {
    console.log("User already exists.");
    return true;
  }

  console.log("User does not exist.");
  return false;
}

export async function getUserData() {
  // Get the current session
  console.log(">>> useAuth | getUserData | Getting session data...");
  const {
    data: { session },
    error: sessionError,
  } = await supabase.auth.getSession();

  if (sessionError) {
    console.error("Error retrieving session:", sessionError.message);
    return;
  }

  if (!session) {
    console.log("No user is logged in.");
    return;
  }

  const userId = session.user.id;

  // Returned cached user data if it exists
  if (userId) {
    // Check if the user's name is already cached in localStorage
    const cachedUserData = JSON.parse(
      localStorage.getItem(`user_data_${userId}`) || "null"
    );

    console.log(
      ">>> useAuth | getUserData | Cached user data:",
      cachedUserData
    );

    if (cachedUserData) {
      return cachedUserData;
    }
  }

  // Fetch the user's data from the user_data table
  const { data: userData, error: userDataError } = await supabase
    .from("user_data")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (userDataError) {
    console.error("Error fetching user data:", userDataError.message);
    return;
  }

  // Cache the user's name in localStorage
  localStorage.setItem(
    `user_data_${userData.user_id}`,
    JSON.stringify(userData)
  );

  console.log(">>> useAuth | getUserData | DB fetched user data:", userData);

  return userData;
}
