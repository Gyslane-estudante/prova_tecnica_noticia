import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (user === "admin" && pass === "123") {
      localStorage.setItem("token", "fake_token_123");
      navigate("/noticias");
    } else {
      setErro("Usuário ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <input
        type="text"
        placeholder="Usuário"
        value={user}
        onChange={(e) => setUser(e.target.value)}
      />

      <input
        type="password"
        placeholder="Senha"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />

      <button onClick={handleLogin}>Entrar</button>

      {erro && <p className="error">{erro}</p>}
    </div>
  );
}
