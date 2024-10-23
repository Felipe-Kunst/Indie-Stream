import React, { useEffect, useState } from "react";
import styles from "./BoxUsuarios.module.css";

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

function CardPessoa({ usuario }) {
  const [profissoes, setProfissoes] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [estados, setEstados] = useState([]);

  useEffect(() => {
    fetchDados().then(({ profissoes, cidades, estados }) => {
      setProfissoes(profissoes);
      setCidades(cidades);
      setEstados(estados);
    });
  }, []);

  const { imagem, nome, ramo, localizacao } = usuario;

  const obterNomeProfissao = (id) => {
    const profissao = profissoes.find(p => p.id === id);
    return profissao ? profissao.nome : 'Desconhecido';
  };

  const obterNomeCidade = (id) => {
    const cidade = cidades.find(c => c.id === id);
    return cidade ? cidade.nome : 'Desconhecida';
  };

  const obterNomeEstado = (id) => {
    const estado = estados.find(e => e.id === id);
    return estado ? estado.nome : 'Desconhecido';
  };

  return (
    <div className={styles.boxDestaques}>
      <img src={imagem} alt={nome} className={styles.imagem} />
      <div className={styles.infoUsuarios}>
        <h2 className={styles.nome}>{nome}</h2>
        <p className={styles.ramo}>{obterNomeProfissao(ramo)}</p>
        <p className={styles.localizacao}>
          {obterNomeCidade(localizacao.cidadeId)}, {obterNomeEstado(localizacao.estadoId)}
        </p>
      </div>
    </div>
  );
}

export default CardPessoa;
