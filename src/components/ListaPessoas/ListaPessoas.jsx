import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BoxUsuario from '../BoxUsuarios/BoxUsuarios';
import styles from './ListaPessoas.module.css';

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 12; 
  const [filtro, setFiltro] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3002/usuarios')
      .then(response => {
        setUsuarios(response.data);
      })
      .catch(error => {
        console.error("Houve um erro ao buscar os usuários:", error);
      });
  }, []);

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  const indiceUltimoUsuario = paginaAtual * itensPorPagina;
  const indicePrimeiroUsuario = indiceUltimoUsuario - itensPorPagina;
  const usuariosPaginaAtual = usuariosFiltrados.slice(indicePrimeiroUsuario, indiceUltimoUsuario);

  const totalPaginas = Math.ceil(usuariosFiltrados.length / itensPorPagina);

  const handlePageChange = (novaPagina) => {
    setPaginaAtual(novaPagina);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Busca de Usuários</h2>
      <input
        type="text"
        placeholder="Pesquisar usuários"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className={styles.inputPesquisa}
      />
      <p>{usuariosFiltrados.length} Usuários encontrados na Busca</p>
      <div className={styles.usuarios}>
        {usuariosPaginaAtual.map(usuario => (
          <div key={usuario.id} className={styles.usuarioContainer}>
            <BoxUsuario usuario={usuario} />
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
      {paginas.map(pagina => (
        <button 
          key={pagina} 
          className={`${styles.paginacaoBotao} ${paginaAtual === pagina ? styles.paginaAtiva : ''}`} 
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

export default ListaUsuarios;
