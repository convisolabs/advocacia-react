import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function ProcessCadastro() {
  const [numero, setNumero] = useState("");
  const [cliente, setCliente] = useState("");
  const [tribunal, setTribunal] = useState("");
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");
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

  const handleCadastrar = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const processoData = {
        numero,
        cliente,
        tribunal,
        status,
        descricao
      };

      const response = await api.post("/processos/cadastrar", processoData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Processo cadastrado com sucesso!");
      console.log(response.data);
      
      setNumero("");
      setCliente("");
      setTribunal("");
      setStatus("");
      setDescricao("");
    } catch (err) {
      alert("Erro ao cadastrar processo");
      console.error(err);
    }
  };

  return (
    <PageContainer>
      <FloatingBox>
        <div style={{ position: "absolute", top: 18, left: 15, display: "flex", gap: 4 }}>
          <Link to="/dashboard" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Dashboard |</Link>
          <Link to="/processos" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Processos |</Link>
          <Link to="/processos/cadastrar" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Cadastrar Processo</Link>
        </div>
        <h2>Cadastro de Processo</h2>
        <form onSubmit={handleCadastrar} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            placeholder="Número do Processo"
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
          <input
            type="text"
            placeholder="Cliente"
            value={cliente}
            onChange={(e) => setCliente(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
          <input
            type="text"
            placeholder="Tribunal"
            value={tribunal}
            onChange={(e) => setTribunal(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
            required
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
            required
          >
            <option value="">Selecione o Status</option>
            {statusDisponiveis.map((statusOption, index) => (
              <option key={index} value={statusOption}>
                {statusOption}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Descrição do Processo"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            style={{ 
              fontSize: 18, 
              padding: "12px 10px", 
              borderRadius: 8, 
              border: "1px solid #ddd",
              minHeight: "100px",
              resize: "vertical"
            }}
            required
          />
          <button 
            type="submit" 
            style={{ 
              background: "#2563eb", 
              color: "#fff", 
              fontSize: 20, 
              border: "none", 
              borderRadius: 8, 
              padding: "12px 0", 
              fontWeight: 600, 
              cursor: "pointer" 
            }}
          >
            Cadastrar Processo
          </button>
        </form>
      </FloatingBox>
    </PageContainer>
  );
}

export default ProcessCadastro; 