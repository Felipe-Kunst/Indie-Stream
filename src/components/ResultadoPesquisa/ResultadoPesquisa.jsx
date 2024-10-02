import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import BoxProjeto from '../BoxProjetos/BoxProjetos';
import BoxUsuario from '../BoxUsuarios/BoxUsuarios';
import styles from './ResultadoPesquisa.module.css';

const ResultadosPesquisa = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState({ usuarios: [], projetos: [] });
  const [currentPageUsuarios, setCurrentPageUsuarios] = useState(1);
  const [currentPageProjetos, setCurrentPageProjetos] = useState(1);
  const resultsPerPage = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuarios = await fetch(`http://localhost:3002/usuarios`).then(res => res.json());
        const projetos = await fetch(`http://localhost:3002/projetos`).then(res => res.json());

        const usuariosFiltrados = usuarios.filter(usuario =>
          usuario.nome.toLowerCase().includes(query.toLowerCase())
        );
        const projetosFiltrados = projetos.filter(projeto =>
          projeto.titulo.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults({ usuarios: usuariosFiltrados, projetos: projetosFiltrados });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  const totalPagesUsuarios = Math.ceil(searchResults.usuarios.length / resultsPerPage);
  const totalPagesProjetos = Math.ceil(searchResults.projetos.length / resultsPerPage);

  const handlePageChangeUsuarios = (page) => {
    setCurrentPageUsuarios(page);
  };

  const handlePageChangeProjetos = (page) => {
    setCurrentPageProjetos(page);
  };

  const indexOfLastUsuario = currentPageUsuarios * resultsPerPage;
  const indexOfFirstUsuario = indexOfLastUsuario - resultsPerPage;
  const currentUsuarios = searchResults.usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario);

  const indexOfLastProjeto = currentPageProjetos * resultsPerPage;
  const indexOfFirstProjeto = indexOfLastProjeto - resultsPerPage;
  const currentProjetos = searchResults.projetos.slice(indexOfFirstProjeto, indexOfLastProjeto);

  return (
    <div className={styles.resultadosContainer}>
      <h1>Resultados da busca por "{query}"</h1>

      {currentUsuarios.length > 0 && (
        <div>
          <div className={styles.tituloUsuarios}>
            <h3>Usuários</h3>
          </div>
          <div className={styles.usuariosContainer}>
            {currentUsuarios.map(usuario => (
              <BoxUsuario key={usuario.id} usuario={usuario} />
            ))}
          </div>
          <div className={styles.pagination}>
            {Array.from({ length: totalPagesUsuarios }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChangeUsuarios(i + 1)}
                disabled={currentPageUsuarios === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentProjetos.length > 0 && (
        <div>
          <div className={styles.tituloProjetos}>
            <h3>Projetos</h3>
          </div>
          <div className={styles.projetosContainer}>
            {currentProjetos.map(projeto => (
              <BoxProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
          <div className={styles.pagination}>
            {Array.from({ length: totalPagesProjetos }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChangeProjetos(i + 1)}
                disabled={currentPageProjetos === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentUsuarios.length === 0 && currentProjetos.length === 0 && (
        <p>Nenhum resultado encontrado para sua pesquisa.</p>
      )}
    </div>
  );
};

export default ResultadosPesquisa;
