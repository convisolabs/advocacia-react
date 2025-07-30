import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function UploadFile() {
  const [arquivo, setArquivo] = useState(null);

  const handleFileChange = (e) => {
    setArquivo(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!arquivo) {
      alert("Selecione um arquivo para enviar.");
      return;
    }

    const formData = new FormData();
    formData.append("file", arquivo);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post("/sendfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });

      alert("Arquivo enviado com sucesso!");
      console.log(response.data);
    } catch (error) {
      alert("Erro ao enviar o arquivo.");
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <FloatingBox>
        <h2>Enviar Arquivo</h2>
        <form onSubmit={handleUpload} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input type="file" onChange={handleFileChange} style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }} />
          <button type="submit" style={{ background: "#2563eb", color: "#fff", fontSize: 20, border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, cursor: "pointer" }}>
            Enviar
          </button>
        </form>
      </FloatingBox>
    </PageContainer>
  );
}

export default UploadFile;