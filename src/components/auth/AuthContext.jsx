import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("railsaksham_user");
    return stored ? JSON.parse(stored) : null;
  });

  const signIn = (email, password) => {
    // Mock: Accept any email/password
    setUser({ email });
    localStorage.setItem("railsaksham_user", JSON.stringify({ email }));
    return true;
  };

  const signUp = (name, email, password) => {
    // Mock: Accept any registration
    setUser({ name, email });
    localStorage.setItem("railsaksham_user", JSON.stringify({ name, email }));
    return true;
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("railsaksham_user");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}