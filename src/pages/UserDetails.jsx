import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function UserDetails() {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/userid/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsuario(response.data);
      } catch (error) {
        alert("Erro ao buscar usuário");
        console.error(error);
      }
    };

    fetchUsuario();
  }, [id]);

  if (!usuario) {
    return (
      <PageContainer>
        <FloatingBox>
          <p style={{ color: "#333", fontSize: 16 }}>Carregando dados do usuário...</p>
        </FloatingBox>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FloatingBox>
        <h2 style={{ color: "#8B6F3D", marginBottom: 20 }}>Detalhes do Usuário</h2>
        <div style={{ 
          backgroundColor: "#f8f8f8", 
          padding: "20px", 
          borderRadius: "8px",
          border: "1px solid #e0e0e0"
        }}>
          <p style={{ color: "#333", fontSize: 16, marginBottom: 12 }}>
            <strong style={{ color: "#8B6F3D" }}>ID:</strong> {usuario.id}
          </p>
          <p style={{ color: "#333", fontSize: 16, marginBottom: 12 }}>
            <strong style={{ color: "#8B6F3D" }}>Nome:</strong> {usuario.name}
          </p>
          <p style={{ color: "#333", fontSize: 16, marginBottom: 12 }}>
            <strong style={{ color: "#8B6F3D" }}>Login:</strong> {usuario.login}
          </p>
          <p style={{ color: "#333", fontSize: 16 }}>
            <strong style={{ color: "#8B6F3D" }}>Senha:</strong> {usuario.password}
          </p>
        </div>
      </FloatingBox>
    </PageContainer>
  );
}

export default UserDetails;