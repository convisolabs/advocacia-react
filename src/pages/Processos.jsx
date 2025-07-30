import { Link } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function Processos() {
  return (
    <PageContainer>
      <FloatingBox>
        <div style={{ position: "absolute", top: 18, left: 15, display: "flex", gap: 4 }}>
          <Link to="/dashboard" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Dashboard |</Link>
          <Link to="/processos" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Processos</Link>
        </div>
        <h2>Gestão de Processos</h2>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginTop: 30 }}>
          <Link 
            to="/processos/cadastrar" 
            style={{ 
              display: "block",
              background: "#2563eb", 
              color: "#fff", 
              fontSize: 18, 
              textDecoration: "none",
              padding: "20px",
              borderRadius: 8,
              textAlign: "center",
              fontWeight: 600,
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#1d4ed8"}
            onMouseLeave={(e) => e.target.style.background = "#2563eb"}
          >
            📝 Cadastrar Novo Processo
          </Link>
          
          <Link 
            to="/processos/consulta" 
            style={{ 
              display: "block",
              background: "#059669", 
              color: "#fff", 
              fontSize: 18, 
              textDecoration: "none",
              padding: "20px",
              borderRadius: 8,
              textAlign: "center",
              fontWeight: 600,
              transition: "background-color 0.3s"
            }}
            onMouseEnter={(e) => e.target.style.background = "#047857"}
            onMouseLeave={(e) => e.target.style.background = "#059669"}
          >
            🔍 Consultar Processos
          </Link>
        </div>
        
        <div style={{ marginTop: 30, padding: "20px", backgroundColor: "#f8f9fa", borderRadius: 8 }}>
          <h3 style={{ color: "#8B6F3D", marginBottom: 15 }}>Funcionalidades Disponíveis:</h3>
          <ul style={{ textAlign: "left", lineHeight: 1.6 }}>
            <li><strong>Cadastro:</strong> Adicionar novos processos com número, cliente, tribunal, status e descrição</li>
            <li><strong>Consulta por ID:</strong> Buscar processo específico pelo ID</li>
            <li><strong>Consulta por Número:</strong> Buscar processo pelo número</li>
            <li><strong>Consulta por Cliente:</strong> Filtrar processos por cliente</li>
            <li><strong>Consulta por Tribunal:</strong> Filtrar processos por tribunal</li>
            <li><strong>Consulta por Status:</strong> Filtrar processos por status</li>
            <li><strong>Busca Geral:</strong> Pesquisa em todos os campos</li>
            <li><strong>Exclusão:</strong> Remover processos do sistema</li>
          </ul>
        </div>
      </FloatingBox>
    </PageContainer>
  );
}

export default Processos; 