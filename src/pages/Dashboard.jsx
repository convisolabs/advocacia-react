import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import PageContainer from "../components/PageContainer";
import FloatingBox from "../components/FloatingBox";

function Dashboard() {
  // Dados simulados para processos por mês
  const processosPorMes = [
    { mes: 'Jan', processos: 45 },
    { mes: 'Fev', processos: 52 },
    { mes: 'Mar', processos: 38 },
    { mes: 'Abr', processos: 67 },
    { mes: 'Mai', processos: 73 },
    { mes: 'Jun', processos: 61 },
  ];

  // Dados simulados para tipos de processos
  const tiposProcessos = [
    { name: 'Cível', value: 35, color: '#8B6F3D' },
    { name: 'Trabalhista', value: 25, color: '#2563eb' },
    { name: 'Criminal', value: 20, color: '#dc2626' },
    { name: 'Familiar', value: 15, color: '#059669' },
    { name: 'Outros', value: 5, color: '#7c3aed' },
  ];

  // Dados simulados para usuários ativos
  const usuariosAtivos = [
    { categoria: 'Advogados', quantidade: 12 },
    { categoria: 'Estagiários', quantidade: 8 },
    { categoria: 'Secretários', quantidade: 5 },
    { categoria: 'Administrativo', quantidade: 3 },
  ];

  return (
    <PageContainer>
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <FloatingBox style={{ marginBottom: '20px', width: '100%' }}>
          <h2 style={{ color: "#8B6F3D", marginBottom: 20, textAlign: 'center' }}>Dashboard - Advocacia Associados</h2>
          <p style={{ color: "#333", fontSize: 16, textAlign: 'center', marginBottom: 30 }}>Bem-vindo ao painel principal!</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <h3 style={{ color: "#8B6F3D", marginBottom: 15, textAlign: 'center' }}>Processos por Mês</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={processosPorMes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="processos" fill="#8B6F3D" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
              <h3 style={{ color: "#8B6F3D", marginBottom: 15, textAlign: 'center' }}>Tipos de Processos</h3>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={tiposProcessos}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {tiposProcessos.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0', marginBottom: '30px' }}>
            <h3 style={{ color: "#8B6F3D", marginBottom: 15, textAlign: 'center' }}>Usuários Ativos por Categoria</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={usuariosAtivos}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="categoria" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="quantidade" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{ backgroundColor: '#f8f8f8', padding: '20px', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ color: "#8B6F3D", marginBottom: 15, textAlign: 'center' }}>Ações Rápidas</h3>
            <ul style={{ 
              listStyle: "none", 
              padding: 0, 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: '10px' 
            }}>
              <li>
                <Link to="/register" style={{ 
                  display: 'block',
                  padding: '12px',
                  backgroundColor: '#8B6F3D',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 500
                }}>Cadastrar Usuário</Link>
              </li>
              <li>
                <Link to="/users" style={{ 
                  display: 'block',
                  padding: '12px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 500
                }}>Gerenciar Usuários</Link>
              </li>
              <li>
                <Link to="/upload" style={{ 
                  display: 'block',
                  padding: '12px',
                  backgroundColor: '#059669',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 500
                }}>Enviar Arquivo</Link>
              </li>
              <li>
                <Link to="/viewfile" style={{ 
                  display: 'block',
                  padding: '12px',
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 500
                }}>Ver Arquivo</Link>
              </li>
              <li>
                <Link to="/updatepass" style={{ 
                  display: 'block',
                  padding: '12px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: 500
                }}>Atualizar Senha</Link>
              </li>
            </ul>
          </div>
        </FloatingBox>
      </div>
    </PageContainer>
  );
}

export default Dashboard; 