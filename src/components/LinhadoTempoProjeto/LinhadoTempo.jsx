import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./LinhadoTempo.module.css";

const LinhaDoTempo = () => {
  const { id } = useParams(); // ID do projeto da URL
  const [linhaDoTempo, setLinhaDoTempo] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itensPorPagina = 1;

  useEffect(() => {
    const fetchLinhaDoTempo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/linhaDoTempo/projeto/${id}`
        );
        setLinhaDoTempo(response.data);
      } catch (error) {
        console.error("Erro ao buscar a linha do tempo:", error);
      }
    };

    fetchLinhaDoTempo();
  }, [id]);

  if (linhaDoTempo.length === 0) {
    return <div>Sem dados na linha do tempo para este projeto.</div>;
  }

  const indiceUltimoItem = paginaAtual * itensPorPagina;
  const indicePrimeiroItem = indiceUltimoItem - itensPorPagina;
  const itensPaginaAtual = linhaDoTempo.slice(
    indicePrimeiroItem,
    indiceUltimoItem
  );
  const totalPaginas = Math.ceil(linhaDoTempo.length / itensPorPagina);

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <section className={styles.linhaDoTempoSection}>
        <h3>Linha do Tempo</h3>
        <hr className={styles.divider} />
        {itensPaginaAtual.map((item) => (
          <div key={item.id} className={styles.linhaDoTempoContainer}>
            <img
              src={item.imagem}
              alt="Linha do tempo"
              className={styles.linhaDoTempoImagem}
            />
            <p className={styles.descricao}>{item.descricao}</p>
          </div>
        ))}
        <div className={styles.paginacao}>
          {paginas.map((numero) => (
            <button
              key={numero}
              className={`${styles.pagina} ${
                numero === paginaAtual ? styles.paginaAtiva : ""
              }`}
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
