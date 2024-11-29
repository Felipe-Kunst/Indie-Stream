import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResultadosUsuarios from "../ResultadosUsuarios/ResultadoUsuarios";
import ResultadosProjetos from "../ResultadosProjetos/ResultadosProjetos";
import styles from "./ResultadoPesquisa.module.css";

const ResultadosPesquisa = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchResults, setSearchResults] = useState({
    usuarios: [],
    projetos: [],
  });
  const [currentPageUsuarios, setCurrentPageUsuarios] = useState(1);
  const [currentPageProjetos, setCurrentPageProjetos] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await fetch(`http://localhost:8080/user`).then((res) =>
          res.json()
        );
        const projetos = await fetch(`http://localhost:8080/projetos`).then(
          (res) => res.json()
        );

        const usuariosFiltrados = usuarios.filter((usuario) =>
          usuario.nome.toLowerCase().includes(query.toLowerCase())
        );
        const projetosFiltrados = projetos.filter((projeto) =>
          projeto.titulo.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults({
          usuarios: usuariosFiltrados,
          projetos: projetosFiltrados,
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const totalPagesUsuarios = Math.ceil(
    searchResults.usuarios.length / resultsPerPage
  );
  const totalPagesProjetos = Math.ceil(
    searchResults.projetos.length / resultsPerPage
  );

  const indexOfLastUsuario = currentPageUsuarios * resultsPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - resultsPerPage;
  const currentUsuarios = searchResults.usuarios.slice(
    indexOfFirstUsuario,
    indexOfLastUsuario
  );

  const indexOfLastProjeto = currentPageProjetos * resultsPerPage;
  const indexOfFirstProjeto = indexOfLastProjeto - resultsPerPage;
  const currentProjetos = searchResults.projetos.slice(
    indexOfFirstProjeto,
    indexOfLastProjeto
  );

  return (
    <div className={styles.resultadosContainer}>
      <h1>Resultados da busca por "{query}"</h1>

      <ResultadosUsuarios
        usuarios={currentUsuarios}
        currentPage={currentPageUsuarios}
        totalPages={totalPagesUsuarios}
        onPageChange={setCurrentPageUsuarios}
      />

      <ResultadosProjetos
        projetos={currentProjetos}
        currentPage={currentPageProjetos}
        totalPages={totalPagesProjetos}
        onPageChange={setCurrentPageProjetos}
      />

      {currentUsuarios.length === 0 && currentProjetos.length === 0 && (
        <p>Nenhum resultado encontrado para sua pesquisa.</p>
      )}
    </div>
  );
};

export default ResultadosPesquisa;
