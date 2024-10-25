import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BoxUsuario2 from '../BoxUsuarios/BoxUsuarios';
import styles from './PessoasEnvolvidas.module.css';

const VisualizarPessoasEnvolvidas = () => {
  const { id } = useParams(); 
  const [projeto, setProjeto] = useState(null);
  const [usuariosEnvolvidos, setUsuariosEnvolvidos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const usuariosPorPagina = 4; 
  const [renderizar, setRenderizar] = useState(true); 

  useEffect(() => {
    const fetchProjeto = async () => {
      try {
        const projetoResponse = await axios.get(`http://localhost:3002/projetos/${id}`);
        setProjeto(projetoResponse.data);

        const pessoasEnvolvidas = projetoResponse.data?.PessoasEnvolvidas || [];
        const usuariosIds = pessoasEnvolvidas.map(pessoa => pessoa.usuarioid);
        setUsuariosEnvolvidos(usuariosIds);

        setRenderizar(usuariosIds.length > 0);
      } catch (error) {
        console.error('Erro ao buscar o projeto:', error);
      }
    };

    fetchProjeto();
  }, [id]);

  if (!projeto) {
    return <div>Carregando...</div>;
  }

  if (!renderizar) {
    return null; 
  }

  const indiceUltimoUsuario = paginaAtual * usuariosPorPagina;
  const indicePrimeiroUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosExibidos = usuariosEnvolvidos.slice(indicePrimeiroUsuario, indiceUltimoUsuario);

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  const totalPaginas = Math.ceil(usuariosEnvolvidos.length / usuariosPorPagina);

  return (
    <div className={styles.container}>
      <section className={styles.pessoasSection}>
        <h3>Pessoas Envolvidas</h3>
        <div className={styles.pessoasContainer}>
          {usuariosExibidos.map((usuarioId) => (
            <div key={usuarioId} className={styles.pessoaItem}>
              <BoxUsuario2 usuarioId={usuarioId} />
            </div>
          ))}
        </div>
        {totalPaginas > 1 && (
          <div className={styles.paginacao}>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index}
                onClick={() => mudarPagina(index + 1)}
                className={paginaAtual === index + 1 ? styles.paginaAtiva : styles.pagina}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default VisualizarPessoasEnvolvidas;
