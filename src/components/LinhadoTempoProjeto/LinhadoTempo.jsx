import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './LinhadoTempo.module.css';

const LinhaDoTempo = () => {
  const { id } = useParams();
  const [projeto, setProjeto] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 1;
  const [dadosCarregados, setDadosCarregados] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projetoResponse = await axios.get(`http://localhost:3002/projeto_LinhaDoTempo?projeto_id=${id}`);
        console.log('Resposta do projeto:', projetoResponse.data);

        if (projetoResponse.data.length > 0) {
          const linhaDoTempoResponse = await axios.get(`http://localhost:3002/linhaDoTempo?projeto_id=${id}`);
          console.log('Resposta da linha do tempo:', linhaDoTempoResponse.data);

          if (linhaDoTempoResponse.data.length > 0) {
            setProjeto(linhaDoTempoResponse.data);
          } else {
            setProjeto([]); 
          }
        }

        setDadosCarregados(true);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setDadosCarregados(true);
      }
    };

    fetchData();
  }, [id]);

  if (!dadosCarregados) {
    return <div>Carregando...</div>; 
  }
  if (projeto.length === 0) {
    return null; 
  }

  const indexUltimoItem = paginaAtual * itensPorPagina;
  const indexPrimeiroItem = indexUltimoItem - itensPorPagina;
  const itensPaginaAtual = projeto.slice(indexPrimeiroItem, indexUltimoItem);
  const totalPaginas = Math.ceil(projeto.length / itensPorPagina); 

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1); 

  return (
    <div className={styles.container}>
      <section className={styles.linhaDoTempoSection}>
        <h3>Linha do Tempo</h3>
        <hr className={styles.divider} />
        {itensPaginaAtual.map(item => (
          <div key={item.id} className={styles.linhaDoTempoContainer}>
            <img src={item.imagem} alt="Linha do tempo" className={styles.linhaDoTempoImagem} />
            <p className={styles.descricao}>{item.descricao}</p>
          </div>
        ))}

        <div className={styles.paginacao}>
          {paginas.map(numero => (
            <button
              key={numero}
              className={`${styles.pagina} ${numero === paginaAtual ? styles.paginaAtiva : ''}`}
              onClick={() => setPaginaAtual(numero)}
            >
              {numero}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LinhaDoTempo;
