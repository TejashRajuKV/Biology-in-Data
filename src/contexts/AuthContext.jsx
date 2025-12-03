import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // On mount, if we have a token but no user, try to fetch current user
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !user) {
      (async () => {
        try {
          const res = await api.getMe();
          if (res && res.user) {
            setUser({ ...res.user, role: res.user.role || 'user' });
          }
        } catch (err) {
          // token invalid or expired — clear it
          localStorage.removeItem('token');
          setUser(null);
        }
      })();
    }
  }, []);

  useEffect(() => {
    // Save user to localStorage whenever it changes
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      const res = await api.login(email, password);
      // expected { token, user }
      if (res?.token) {
        localStorage.setItem('token', res.token);
      }
      if (res?.user) {
        const u = { ...res.user, role: res.user.role || 'user' };
        setUser(u);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.register(name, email, password);
      if (res?.token) localStorage.setItem('token', res.token);
      if (res?.user) {
        setUser({ ...res.user, role: res.user.role || 'user' });
        return true;
      }
      return false;
    } catch (err) {
      console.error('Register error:', err);
      throw err; // Re-throw so caller can handle specific errors
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
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
