import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function ViewFile() {
  const [name, setName] = useState("");
  const [conteudo, setConteudo] = useState("");

  const handleBuscarArquivo = async (e) => {
    e.preventDefault();

    if (!name) {
      alert("Informe o nome do arquivo.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      /* VULNERABILIDADE: Injeção de comandos - parâmetro 'name' enviado sem validação */
      const response = await api.get("/name", {
        params: { name },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setConteudo(response.data);
    } catch (error) {
      alert("Erro ao ler o conteúdo do arquivo.");
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <FloatingBox>
        <h2>Ler Conteúdo de Arquivo</h2>
        <form onSubmit={handleBuscarArquivo} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            placeholder="Nome do arquivo (ex: documento.txt)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          />
          <button type="submit" style={{ background: "#2563eb", color: "#fff", fontSize: 20, border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, cursor: "pointer" }}>
            Buscar
          </button>
        </form>
        {conteudo && (
          <div style={{ marginTop: 24 }}>
            <h3>Conteúdo:</h3>
            <pre style={{ backgroundColor: "#f0f0f0", padding: "10px", borderRadius: 8 }}>{conteudo}</pre>
          </div>
        )}
      </FloatingBox>
    </PageContainer>
  );
}

export default ViewFile;