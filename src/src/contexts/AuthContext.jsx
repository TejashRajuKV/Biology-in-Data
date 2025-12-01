import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    // Demo authentication - in production, this would be a real API call
    // For demo purposes, any valid email/password combo works
    // Use admin@bio.com / admin123 for admin access
    if (email && password) {
      const isAdmin = email === "admin@bio.com" && password === "admin123";
      const newUser = {
        email,
        name: isAdmin ? "Admin User" : email.split("@")[0],
        role: isAdmin ? "admin" : "user",
      };
      setUser(newUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
