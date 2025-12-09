import { useState } from "react";

export function useAuth() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = (user: string, pass: string) => {
    if (user === "admin" && pass === "123") {
      localStorage.setItem("token", "fake_token_123");
      setToken("fake_token_123");
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return { token, login, logout };
}
