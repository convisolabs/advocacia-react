import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function Register() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/register", { name, login, password, role });
      alert("Usuário cadastrado com sucesso!");
      console.log(res.data);
    } catch (err) {
      alert("Erro ao cadastrar usuário");
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
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          />
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          />
          <input
            type="text"
            placeholder="Perfil"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          />
          <button type="submit" style={{ background: "#2563eb", color: "#fff", fontSize: 20, border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, cursor: "pointer" }}>
            Cadastrar
          </button>
        </form>
      </FloatingBox>
    </PageContainer>
  );
}

export default Register;