import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";


function ProcessConsulta() {
  const [processos, setProcessos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchType, setSearchType] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusDisponiveis, setStatusDisponiveis] = useState([]);

  useEffect(() => {
    const fetchStatusDisponiveis = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/processos/status-disponiveis", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setStatusDisponiveis(response.data);
      } catch (error) {
        console.error("Erro ao buscar status disponíveis:", error);
      }
    };

    fetchStatusDisponiveis();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const token = localStorage.getItem("token");
      let response;

      switch (searchType) {
        case "todos":
          response = await api.get("/processos/todos", {
            headers: { Authorization: `Bearer ${token}` }
          });
          break;
        case "id":
          response = await api.get(`/processos/${searchTerm}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProcessos(Array.isArray(response.data) ? response.data : [response.data]);
          setLoading(false);
          return;
        case "numero":
          response = await api.get(`/processos/numero/${searchTerm}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setProcessos(Array.isArray(response.data) ? response.data : [response.data]);
          setLoading(false);
          return;
        case "cliente":
          response = await api.get(`/processos/cliente/${searchTerm}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          break;
        case "tribunal":
          response = await api.get(`/processos/tribunal/${searchTerm}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          break;
        case "status":
          response = await api.get(`/processos/status/${searchTerm}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          break;
        case "busca":
          response = await api.get(`/processos/buscar?termo=${searchTerm}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          break;
        default:
          response = await api.get("/processos/todos", {
            headers: { Authorization: `Bearer ${token}` }
          });
      }

      setProcessos(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (error) {
      alert("Erro ao buscar processos");
      console.error(error);
      setProcessos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este processo?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/processos/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Processo excluído com sucesso!");
      handleSearch({ preventDefault: () => {} });
    } catch (error) {
      alert("Erro ao excluir processo");
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <FloatingBox>
        <div style={{ position: "absolute", top: 18, left: 15, display: "flex", gap: 4 }}>
          <Link to="/dashboard" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Dashboard |</Link>
          <Link to="/processos" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Processos |</Link>
          <Link to="/processos/consulta" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Consultar Processos</Link>
        </div>
        <h2>Consulta de Processos</h2>
        
        {searchType === "numero" && searchTerm && (
          <div style={{ 
            marginBottom: 20, 
            padding: "10px", 
            backgroundColor: "#fff3cd", 
            border: "1px solid #ffeaa7", 
            borderRadius: "4px",
            color: "#856404"
          }}>
            <div dangerouslySetInnerHTML={{ __html: `Buscando por número: ${searchTerm}` }} />
          </div>
        )}
        
        <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              style={{ fontSize: 16, padding: "8px", borderRadius: 8, border: "1px solid #ddd" }}
            >
              <option value="todos">Todos os Processos</option>
              <option value="id">Por ID</option>
              <option value="numero">Por Número</option>
              <option value="cliente">Por Cliente</option>
              <option value="tribunal">Por Tribunal</option>
              <option value="status">Por Status</option>
              <option value="busca">Busca Geral</option>
            </select>
            
            {(searchType !== "todos" && searchType !== "status") && (
              <input
                type="text"
                placeholder="Termo de busca"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: 16, padding: "8px", borderRadius: 8, border: "1px solid #ddd", flex: 1 }}
                required
              />
            )}
            
            {searchType === "status" && (
              <select
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ fontSize: 16, padding: "8px", borderRadius: 8, border: "1px solid #ddd", flex: 1 }}
                required
              >
                <option value="">Selecione o Status</option>
                {statusDisponiveis.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            )}
            
            <button 
              type="submit" 
              style={{ 
                background: "#2563eb", 
                color: "#fff", 
                fontSize: 16, 
                border: "none", 
                borderRadius: 8, 
                padding: "8px 16px", 
                fontWeight: 600, 
                cursor: "pointer" 
              }}
              disabled={loading}
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </div>
        </form>

        {processos.length === 0 && !loading ? (
          <p style={{ color: "#333", fontSize: 16 }}>Nenhum processo encontrado.</p>
        ) : (
          <div style={{ maxHeight: "400px", overflowY: "auto" }}>
            {processos.map((processo) => (
              <div key={processo.id} style={{ 
                marginBottom: 12, 
                padding: "16px", 
                backgroundColor: "#f8f8f8", 
                borderRadius: "8px",
                border: "1px solid #e0e0e0"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 8px 0", fontSize: 16 }}>
                      <strong style={{ color: "#8B6F3D" }}>ID:</strong> {processo.id}
                    </p>
                    <p style={{ margin: "0 0 8px 0", fontSize: 16 }}>
                      <strong style={{ color: "#8B6F3D" }}>Número:</strong> 
                      {searchType === "numero" ? (
                        /* VULNERABILIDADE: Renderização insegura do número do processo */
                        <span dangerouslySetInnerHTML={{ __html: processo.numero }} />
                      ) : (
                        processo.numero
                      )}
                    </p>
                    <p style={{ margin: "0 0 8px 0", fontSize: 16 }}>
                      <strong style={{ color: "#8B6F3D" }}>Cliente:</strong> {processo.cliente}
                    </p>
                    <p style={{ margin: "0 0 8px 0", fontSize: 16 }}>
                      <strong style={{ color: "#8B6F3D" }}>Tribunal:</strong> {processo.tribunal}
                    </p>
                    <p style={{ margin: "0 0 8px 0", fontSize: 16 }}>
                      <strong style={{ color: "#8B6F3D" }}>Status:</strong> {processo.status}
                    </p>
                    {processo.descricao && (
                      <p style={{ margin: "0 0 8px 0", fontSize: 16 }}>
                        <strong style={{ color: "#8B6F3D" }}>Descrição:</strong> {processo.descricao}
                      </p>
                    )}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => handleDelete(processo.id)}
                      style={{
                        background: "#dc2626",
                        color: "#fff",
                        fontSize: 12,
                        border: "none",
                        borderRadius: 4,
                        padding: "4px 8px",
                        cursor: "pointer"
                      }}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </FloatingBox>
    </PageContainer>
  );
}

export default ProcessConsulta; 