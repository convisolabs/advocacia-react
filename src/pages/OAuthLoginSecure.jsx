import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function OAuthLoginSecure() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [state, setState] = useState("");

  // CONFIGURAÇÃO SEGURA: Apenas client_id no frontend
  // O client_secret deve ficar apenas no backend
  const OAUTH_CONFIG = {
    clientId: "advocacia_client_123",
    redirectUri: "http://localhost:5173/oauth-secure/callback",
    authorizationUrl: "https://oauth-provider.example.com/oauth/authorize",
    scope: "read write"
  };

  // SEGURO: Geração de state parameter único e seguro
  const generateSecureState = () => {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  };

  const handleOAuthLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const secureState = generateSecureState();
      setState(secureState);
      
      // SEGURO: Armazenar state no sessionStorage (mais seguro que localStorage)
      sessionStorage.setItem("oauth_state", secureState);
      sessionStorage.setItem("oauth_timestamp", Date.now().toString());

      const authUrl = new URL(OAUTH_CONFIG.authorizationUrl);
      authUrl.searchParams.append("client_id", OAUTH_CONFIG.clientId);
      // SEGURO: NÃO incluir client_secret no frontend
      authUrl.searchParams.append("redirect_uri", OAUTH_CONFIG.redirectUri);
      authUrl.searchParams.append("response_type", "code");
      authUrl.searchParams.append("scope", OAUTH_CONFIG.scope);
      authUrl.searchParams.append("state", secureState);
      authUrl.searchParams.append("code_challenge_method", "S256"); // PKCE
      authUrl.searchParams.append("code_challenge", await generateCodeChallenge());

      // SEGURO: Redirecionamento sem expor credenciais
      window.location.href = authUrl.toString();
    } catch (err) {
      setError("Erro ao iniciar autenticação OAuth");
      console.error("OAuth error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const generateCodeChallenge = async () => {
    const codeVerifier = generateSecureState();
    sessionStorage.setItem("code_verifier", codeVerifier);
    
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    
    return btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  };

  // SEGURO: Validação de state parameter
  const validateState = (receivedState) => {
    const storedState = sessionStorage.getItem("oauth_state");
    const timestamp = parseInt(sessionStorage.getItem("oauth_timestamp") || "0");
    const now = Date.now();
    
    // Verificar se o state não expirou (5 minutos)
    if (now - timestamp > 5 * 60 * 1000) {
      return false;
    }
    
    return storedState === receivedState;
  };

  // SEGURO: Troca de código por token via backend
  const exchangeCodeForToken = async (code, receivedState) => {
    try {
      // SEGURO: Validação do state parameter
      if (!validateState(receivedState)) {
        throw new Error("Invalid state parameter");
      }

      const codeVerifier = sessionStorage.getItem("code_verifier");
      
      // SEGURO: Enviar para backend que possui o client_secret
      const response = await fetch("/api/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          code_verifier: codeVerifier,
          redirect_uri: OAUTH_CONFIG.redirectUri
        })
      });

      if (!response.ok) {
        throw new Error("Token exchange failed");
      }

      const tokenData = await response.json();
      
      if (tokenData.access_token) {
        // SEGURO: Armazenamento seguro com expiração
        const tokenInfo = {
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token,
          expires_at: Date.now() + (tokenData.expires_in * 1000),
          token_type: tokenData.token_type
        };
        
        // SEGURO: Criptografar tokens antes de armazenar
        const encryptedTokens = await encryptTokens(JSON.stringify(tokenInfo));
        sessionStorage.setItem("encrypted_oauth_tokens", encryptedTokens);
        
        // SEGURO: Limpar dados temporários
        sessionStorage.removeItem("oauth_state");
        sessionStorage.removeItem("oauth_timestamp");
        sessionStorage.removeItem("code_verifier");
        
        navigate("/dashboard");
      } else {
        setError("Falha na autenticação OAuth");
      }
    } catch (err) {
      setError("Erro ao trocar código por token");
      console.error("Token exchange error:", err);
    }
  };

  // SEGURO: Criptografia simples dos tokens (em produção, use bibliotecas especializadas)
  const encryptTokens = async (data) => {
    const encoder = new TextEncoder();
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt"]
    );
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(data)
    );
    
    return JSON.stringify({
      data: Array.from(new Uint8Array(encrypted)),
      iv: Array.from(iv),
      key: await exportKey(key)
    });
  };

  const exportKey = async (key) => {
    const exported = await crypto.subtle.exportKey("raw", key);
    return Array.from(new Uint8Array(exported));
  };

  // SEGURO: Verificação de callback com validações
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const receivedState = urlParams.get("state");
    const error = urlParams.get("error");

    if (error) {
      setError(`Erro OAuth: ${error}`);
      return;
    }

    if (code && receivedState) {
      exchangeCodeForToken(code, receivedState);
    }
  }, [navigate]);

  return (
    <PageContainer>
      <FloatingBox>        
        <button 
          onClick={handleOAuthLogin}
          disabled={isLoading}
          style={{ 
            background: "#059669", 
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
          {isLoading ? "Conectando..." : "🔐 Conectar com OAuth 2.0 (Seguro)"}
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

export default OAuthLoginSecure; 