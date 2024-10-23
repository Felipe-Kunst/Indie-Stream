import React from "react";
import BoxUsuario from "../BoxUsuarios/BoxUsuarios2";
import styles from "./ResultadosUsuarios.module.css";

const ResultadosUsuarios = ({
  usuarios,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      {usuarios.length > 0 && (
        <>
          <div className={styles.tituloUsuarios}>
            <h3>Usuários</h3>
          </div>
          <div className={styles.usuariosContainer}>
            {usuarios.map((usuario) => (
              <BoxUsuario key={usuario.id} usuario={usuario} />
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

export default ResultadosUsuarios;
