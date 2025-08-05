import { Link } from "react-router-dom";

function isAuthenticated() {
  return !!localStorage.getItem("token");
}

function Navbar() {
  const logged = isAuthenticated();
  return (
    <nav style={{ 
      padding: "16px", 
      backgroundColor: "#faf6ef", 
      borderBottom: "1px solid #ddd",
      display: "flex",
      justifyContent: "center",
      gap: "8px"
    }}>
      <Link to="/" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Início</Link>
      {logged ? (
        <>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/dashboard" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Painel</Link>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/register" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Cadastrar Usuário</Link>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/users" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Usuários</Link>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/processos" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Processos</Link>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/upload" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Enviar Arquivo</Link>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/viewfile" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Ver Arquivo</Link>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/updatepass" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Atualizar Senha</Link>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/oauth" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>OAuth</Link>
        </>
      ) : (
        <>
          <span style={{ color: "#8B6F3D", fontSize: 18 }}>|</span>
          <Link to="/register" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Cadastro</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
