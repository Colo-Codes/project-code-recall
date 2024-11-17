"use client";

import { createContext, useEffect, useState, useContext } from "react";
import { getUserData, signOutUser } from "@/hooks/useAuth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Do not fetch user data if the user is already authenticated
    if (user) return;

    // Immediately invoked function expression (IIFE).
    (async function getUserDataForContext() {
      const userData = await getUserData();
      setUser(userData);
      setLoading(false);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, signOutUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthenticatedUser = () => useContext(AuthContext);
