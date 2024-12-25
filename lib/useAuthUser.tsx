import { useState, useEffect, useCallback } from "react";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  // Add other fields as needed
}

export function useAuthUser() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const loadAuthUser = useCallback(() => {
    if (typeof sessionStorage !== "undefined") {
      const user = sessionStorage.getItem("authUser");
      setAuthUser(user ? JSON.parse(user) : null);
      setLoading(false); // Set loading to false once the data is loaded
    }
  }, []);

  const saveAuthUser = useCallback((user: AuthUser) => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.setItem("authUser", JSON.stringify(user));
    }
    setAuthUser(user);
  }, []);

  const clearAuthUser = useCallback(() => {
    if (typeof sessionStorage !== "undefined") {
      sessionStorage.removeItem("authUser");
    }
    setAuthUser(null);
  }, []);

  useEffect(() => {
    loadAuthUser();
  }, [loadAuthUser]);

  return { authUser, saveAuthUser, clearAuthUser, loading };
}
