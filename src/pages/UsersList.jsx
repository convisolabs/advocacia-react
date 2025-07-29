import { useEffect, useState } from "react";
import api from "../api/api";
import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function UsersList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/allusers", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        alert("Erro ao buscar usuários");
        console.error(error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <PageContainer>
      <FloatingBox>
        <h2 style={{ color: "#8B6F3D", marginBottom: 20 }}>Lista de Usuários</h2>
        {usuarios.length === 0 ? (
          <p style={{ color: "#333", fontSize: 16 }}>Nenhum usuário encontrado.</p>
        ) : (
          <ul style={{ padding: 0, listStyle: "none" }}>
            {usuarios.map((user) => (
              <li key={user.id} style={{ 
                marginBottom: 12, 
                padding: "12px", 
                backgroundColor: "#f8f8f8", 
                borderRadius: "8px",
                border: "1px solid #e0e0e0"
              }}>
                <span style={{ color: "#333", fontSize: 16 }}>
                  <strong style={{ color: "#8B6F3D" }}>ID:</strong> {user.id}
                  <br />
                  <strong style={{ color: "#8B6F3D" }}> Login:</strong> {user.login}
                  <br />
                  <strong style={{ color: "#8B6F3D" }}> Nome:</strong> {user.name}
                </span>
                {" "}
                <Link to={`/userid/${user.id}`} style={{ 
                  color: "#2563eb", 
                  fontSize: 14, 
                  textDecoration: "none",
                  fontWeight: 500
                }}>[Ver detalhes]</Link>
              </li>
            ))}
          </ul>
        )}
      </FloatingBox>
    </PageContainer>
  );
}

export default UsersList;