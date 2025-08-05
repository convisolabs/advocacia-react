import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function OAuthLogin() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  //VULNERABILIDADE: Client Secret hardcoded no código JavaScript
  const OAUTH_CONFIG = {
    clientId: "advocacia_client_123",
    clientSecret: "super_secret_key",
    redirectUri: "http://localhost:5173/oauth/callback",
    authorizationUrl: "https://oauth-provider.example.com/oauth/authorize",
    tokenUrl: "https://oauth-provider.example.com/oauth/token",
    scope: "read write"
  };

  const handleOAuthLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // VULNERABILIDADE: Client Secret exposto no frontend
      const authUrl = new URL(OAUTH_CONFIG.authorizationUrl);
      authUrl.searchParams.append("client_id", OAUTH_CONFIG.clientId);
      authUrl.searchParams.append("client_secret", OAUTH_CONFIG.clientSecret);
      authUrl.searchParams.append("redirect_uri", OAUTH_CONFIG.redirectUri);
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("scope", OAUTH_CONFIG.scope);
      authUrl.searchParams.append("state", generateRandomState());

      // VULNERABILIDADE: Redirecionamento para OAuth com client_secret exposto
      window.location.href = authUrl.toString();
    } catch (err) {
      setError("Erro ao iniciar autenticação OAuth");
      console.error("OAuth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateRandomState = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  // VULNERABILIDADE: Função para trocar código por token com client_secret exposto
  const exchangeCodeForToken = async (code) => {
    try {
      const tokenResponse = await fetch(OAUTH_CONFIG.tokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: OAUTH_CONFIG.clientId,
          client_secret: OAUTH_CONFIG.clientSecret,
          code: code,
          redirect_uri: OAUTH_CONFIG.redirectUri
        })
      });

      const tokenData = await tokenResponse.json();
      
      if (tokenData.access_token) {
        // VULNERABILIDADE: Armazenamento inseguro do token
        localStorage.setItem("oauth_token", tokenData.access_token);
        localStorage.setItem("oauth_refresh_token", tokenData.refresh_token);
        
        navigate("/dashboard");
      } else {
        setError("Falha na autenticação OAuth");
      }
    } catch (err) {
      setError("Erro ao trocar código por token");
      console.error("Token exchange error:", err);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code) {
      // VULNERABILIDADE: Processamento do callback com client_secret exposto
      exchangeCodeForToken(code);
    }
  }, [navigate]);

  return (
    <PageContainer>
      <FloatingBox>
        <div style={{ position: "absolute", top: 18, left: 15, display: "flex", gap: 4 }}>
          <a href="/" style={{ color: "#8B6F3D", fontSize: 18, textDecoration: "none", fontWeight: 400 }}>Início</a>
        </div>
        
        <h2 style={{ color: "#8B6F3D", marginBottom: 20, textAlign: 'center' }}>Autenticação OAuth 2.0</h2>

        <button 
          onClick={handleOAuthLogin}
          disabled={isLoading}
          style={{ 
            background: "#2563eb", 
            color: "#fff", 
            fontSize: 18, 
            border: "none", 
            borderRadius: 8, 
            padding: "15px 30px", 
            fontWeight: 600, 
            cursor: "pointer",
            width: "100%",
            marginBottom: 15
          }}
        >
          {isLoading ? "Conectando..." : "🔐 Conectar com OAuth 2.0"}
        </button>

        {error && (
          <div style={{ 
            marginTop: 15, 
            padding: "10px", 
            backgroundColor: "#f8d7da", 
            border: "1px solid #f5c6cb", 
            borderRadius: "4px",
            color: "#721c24"
          }}>
            <strong>Erro:</strong> {error}
          </div>
        )}
      </FloatingBox>
    </PageContainer>
  );
}

export default OAuthLogin; 