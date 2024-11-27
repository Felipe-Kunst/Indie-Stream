import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardPessoa from "../BoxUsuarios/BoxUsuarios2";
import styles from "./PessoasEnvolvidas.module.css";

const VisualizarPessoasEnvolvidas = () => {
  const { id } = useParams(); // ID do projeto da URL
  const [usuariosEnvolvidos, setUsuariosEnvolvidos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const usuariosPorPagina = 4;

  useEffect(() => {
    const fetchPessoasEnvolvidas = async () => {
      try {
        // Obtém as informações do projeto
        const projetoResponse = await fetch(
          `http://localhost:8080/projetos/${id}`
        );
        const projeto = await projetoResponse.json();

        // Verifica se pessoasEnvolvidas está presente
        if (projeto && projeto.pessoasEnvolvidas) {
          console.log("Pessoas Envolvidas:", projeto.pessoasEnvolvidas); // Debug
          setUsuariosEnvolvidos(projeto.pessoasEnvolvidas);
        } else {
          console.error("Nenhuma pessoa encontrada no projeto.");
        }
      } catch (error) {
        console.error("Erro ao buscar o projeto:", error);
      }
    };

    fetchPessoasEnvolvidas();
  }, [id]);

  if (usuariosEnvolvidos.length === 0) {
    return <div>Nenhuma pessoa envolvida neste projeto.</div>;
  }

  const indiceUltimoUsuario = paginaAtual * usuariosPorPagina;
  const indicePrimeiroUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosExibidos = usuariosEnvolvidos.slice(
    indicePrimeiroUsuario,
    indiceUltimoUsuario
  );

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  const totalPaginas = Math.ceil(usuariosEnvolvidos.length / usuariosPorPagina);

  return (
    <div className={styles.container}>
      <section className={styles.pessoasSection}>
        <h3>Pessoas Envolvidas</h3>
        <div className={styles.pessoasContainer}>
          {usuariosExibidos.length > 0 ? (
            usuariosExibidos.map((usuario) => (
              <div key={usuario.id} className={styles.pessoaItem}>
                <CardPessoa usuario={usuario} />
              </div>
            ))
          ) : (
            <p>Nenhuma pessoa envolvida neste projeto.</p>
          )}
        </div>
        {totalPaginas > 1 && (
          <div className={styles.paginacao}>
            {Array.from({ length: totalPaginas }, (_, index) => (
              <button
                key={index}
                onClick={() => mudarPagina(index + 1)}
                className={
                  paginaAtual === index + 1 ? styles.paginaAtiva : styles.pagina
                }
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
