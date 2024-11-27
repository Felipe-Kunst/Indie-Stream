import React, { useEffect, useState } from "react";
import axios from "axios";
import BoxProjeto from "../BoxProjetos/BoxProjetos"; // Crie este componente para exibir os detalhes do projeto
import styles from "./ListaProjetos.module.css";

const ListaProjetos = () => {
  const [projetos, setProjetos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12;
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/projetos") // Altere a URL conforme necessário
      .then((response) => {
        setProjetos(response.data);
      })
      .catch((error) => {
        console.error("Houve um erro ao buscar os projetos:", error);
      });
  }, []);

  const projetosFiltrados = projetos.filter((projeto) =>
    projeto.titulo.toLowerCase().includes(filtro.toLowerCase())
  );

  const indiceUltimoProjeto = paginaAtual * itensPorPagina;
  const indicePrimeiroProjeto = indiceUltimoProjeto - itensPorPagina;
  const projetosPaginaAtual = projetosFiltrados.slice(
    indicePrimeiroProjeto,
    indiceUltimoProjeto
  );

  const totalPaginas = Math.ceil(projetosFiltrados.length / itensPorPagina);

  const handlePageChange = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Busca de Projetos</h2>
      <input
        type="text"
        placeholder="Pesquisar projetos"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className={styles.inputPesquisa}
      />
      <p>{projetosFiltrados.length} Projetos encontrados na Busca</p>
      <div className={styles.projetos}>
        {projetosPaginaAtual.map((projeto) => (
          <div key={projeto.id} className={styles.projetoContainer}>
            <BoxProjeto projeto={projeto} />
          </div>
        ))}
      </div>

      <Paginacao
        totalPaginas={totalPaginas}
        paginaAtual={paginaAtual}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

const Paginacao = ({ totalPaginas, paginaAtual, onPageChange }) => {
  const paginas = [];
  for (let i = 1; i <= totalPaginas; i++) {
    paginas.push(i);
  }

  return (
    <div className={styles.paginacao}>
      <button
        className={styles.paginacaoBotao}
        onClick={() => onPageChange(1)}
        disabled={paginaAtual === 1}
      >
        «
      </button>
      {paginas.map((pagina) => (
        <button
          key={pagina}
          className={`${styles.paginacaoBotao} ${
            paginaAtual === pagina ? styles.paginaAtiva : ""
          }`}
          onClick={() => onPageChange(pagina)}
        >
          {pagina}
        </button>
      ))}
      <button
        className={styles.paginacaoBotao}
        onClick={() => onPageChange(totalPaginas)}
        disabled={paginaAtual === totalPaginas}
      >
        »
      </button>
    </div>
  );
};

export default ListaProjetos;
