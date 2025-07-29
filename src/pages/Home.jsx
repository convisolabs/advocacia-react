import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function Login() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", { login, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      alert("Login efetuado com sucesso!");
      navigate("/dashboard");
    } catch (err) {
      alert("Erro ao logar");
      console.error(err);
    }
  };

  return (
    <PageContainer>
      <FloatingBox>
        <div style={{ position: "absolute", top: 18, left: 15, display: "flex", gap: 4 }}>
          <Link to="/" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Início |</Link>
          <Link to="/register" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Cadastrar Usuário</Link>
        </div>
        <div style={{ marginBottom: 5, textAlign: "center" }}>
          <div style={{ fontFamily: 'serif', color: '#8B6F3D', fontWeight: 700, fontSize: 48, letterSpacing: 2, marginTop: 4 }}>
            Advocacia<br/>Associados
          </div>
        </div>
        <form onSubmit={handleLogin} style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 18,
          alignItems: "stretch"
        }}>
          <label style={{ fontSize: 22, textAlign: "left" }}>Login</label>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{
              fontSize: 18,
              padding: "12px 10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 4
            }}
          />
          <label style={{ fontSize: 22, textAlign: "left" }}>Senha</label>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              fontSize: 18,
              padding: "12px 10px",
              borderRadius: 8,
              border: "1px solid #ddd",
              marginBottom: 18
            }}
          />
          <button type="submit" style={{
            background: "#2563eb",
            color: "#fff",
            fontSize: 20,
            border: "none",
            borderRadius: 8,
            padding: "12px 0",
            fontWeight: 600,
            cursor: "pointer"
          }}>
            Login
          </button>
        </form>
      </FloatingBox>
    </PageContainer>
  );
}

export default Login;