import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const ResultadosPesquisa = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState({ usuarios: [], projetos: [] });

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

  return (
    <div>
      <h2>Resultados de busca para: "{query}"</h2>
      {searchResults.usuarios.length > 0 && (
        <div>
          <h3>Usuários</h3>
          <ul>
            {searchResults.usuarios.map(usuario => (
              <li key={usuario.id}>
                <img src={usuario.imagem} alt={usuario.nome} width="40" height="40" />
                {usuario.nome}
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchResults.projetos.length > 0 && (
        <div>
          <h3>Projetos</h3>
          <ul>
            {searchResults.projetos.map(projeto => (
              <li key={projeto.id}>
                <img src={projeto.imagem} alt={projeto.titulo} width="40" height="40" />
                {projeto.titulo}
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchResults.usuarios.length === 0 && searchResults.projetos.length === 0 && (
        <p>Nenhum resultado encontrado para sua pesquisa.</p>
      )}
    </div>
  );
};

export default ResultadosPesquisa;
