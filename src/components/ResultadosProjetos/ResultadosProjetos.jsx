import React from "react";
import BoxProjeto from "../BoxProjetos/BoxProjetos";
import styles from "./ResultadosProjetos.module.css";

const ResultadosProjetos = ({
  projetos,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      {projetos.length > 0 && (
        <>
          <div className={styles.tituloProjetos}>
            <h3>Projetos</h3>
          </div>
          <div className={styles.projetosContainer}>
            {projetos.map((projeto) => (
              <BoxProjeto key={projeto.id} projeto={projeto} />
            ))}
          </div>
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => onPageChange(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ResultadosProjetos;
