import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BoxUsuarios.module.css";

const fetchDadosUsuario = async (usuarioId) => {
  const response = await fetch(`http://localhost:3002/usuarios/${usuarioId}`);
  if (!response.ok) {
    throw new Error("Erro ao buscar usuário");
  }
  return response.json();
};

const fetchDados = async () => {
  const [profissoesResponse, cidadesResponse, estadosResponse] = await Promise.all([
    fetch("http://localhost:3002/profissoes"),
    fetch("http://localhost:3002/cidades"),
    fetch("http://localhost:3002/estados"),
  ]);
  
  const [profissoes, cidades, estados] = await Promise.all([
    profissoesResponse.json(),
    cidadesResponse.json(),
    estadosResponse.json(),
  ]);
  
  return { profissoes, cidades, estados };
};

function BoxUsuario2({ usuarioId }) {
  const [usuario, setUsuario] = useState(null);
  const [profissoes, setProfissoes] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estados, setEstados] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarioData = await fetchDadosUsuario(usuarioId);
        setUsuario(usuarioData);
        
        const { profissoes, cidades, estados } = await fetchDados();
        setProfissoes(profissoes);
        setCidades(cidades);
        setEstados(estados);
        
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [usuarioId]);

  if (loading) {
    return <div>Carregando informações...</div>;
  }

  if (!usuario) {
    return <div>Usuário não encontrado.</div>; 
  }

  const { id, imagem, nome, ramo, localizacao } = usuario;

  const obterNomeProfissao = (id) => {
    const profissao = profissoes.find(p => p.id === id);
    return profissao ? profissao.nome : 'Profissão desconhecida';
  };

  const obterNomeCidade = (id) => {
    const cidade = cidades.find(c => c.id === id);
    return cidade ? cidade.nome : 'Cidade desconhecida';
  };

  const obterNomeEstado = (id) => {
    const estado = estados.find(e => e.id === id);
    return estado ? estado.nome : 'Estado desconhecido';
  };

  const handleClick = () => {
    navigate(`/UserPage/${id}`); 
  };

  return (
    <div className={styles.boxDestaques} onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img src={imagem} alt={nome} className={styles.imagem} />
      <div className={styles.infoUsuarios}>
        <h2 className={styles.nome}>{nome}</h2>
        <p className={styles.ramo}>{obterNomeProfissao(ramo)}</p>
        <p className={styles.localizacao}>
          {localizacao && localizacao.cidadeId ? obterNomeCidade(localizacao.cidadeId) : 'Cidade não informada'}, 
          {localizacao && localizacao.estadoId ? obterNomeEstado(localizacao.estadoId) : 'Estado não informado'}
        </p>
      </div>
    </div>
  );
}

export default BoxUsuario2;
