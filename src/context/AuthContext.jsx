import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const DEMO = {
  email: "intern@demo.com",
  password: "intern123",
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const login = (email, password, remember) => {
    if (email === DEMO.email && password === DEMO.password) {
      const u = { email };
      setUser(u);
      if (remember) localStorage.setItem("user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
