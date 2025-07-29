import { useState } from "react";
import api from "../api/api";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function UpdatePassword() {
  const [login, setLogin] = useState("");
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [novaSenha, setNovaSenha] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!email || !senhaAntiga || !novaSenha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/updatepass`, {
        params: {
          login,
          senhaAntiga,
          novaSenha
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert("Senha atualizada com sucesso!");
      console.log(response.data);
    } catch (error) {
      alert("Erro ao atualizar senha. Verifique as informações.");
      console.error(error);
    }
  };

  return (
    <PageContainer>
      <FloatingBox>
        <h2>Atualizar Senha</h2>
        <form onSubmit={handleUpdate} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <input
            type="text"
            placeholder="Login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          /><br />
          <input
            type="password"
            placeholder="Senha atual"
            value={senhaAntiga}
            onChange={(e) => setSenhaAntiga(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          /><br />
          <input
            type="password"
            placeholder="Nova senha"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            style={{ fontSize: 18, padding: "12px 10px", borderRadius: 8, border: "1px solid #ddd" }}
          /><br />
          <button type="submit" style={{ background: "#2563eb", color: "#fff", fontSize: 20, border: "none", borderRadius: 8, padding: "12px 0", fontWeight: 600, cursor: "pointer" }}>
            Atualizar Senha
          </button>
        </form>
      </FloatingBox>
    </PageContainer>
  );
}

export default UpdatePassword;