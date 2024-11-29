import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import CardPessoaSolicitante from "../BoxUsuarios/BoxUsuariosSolicitantes";
import styles from "./ProjetoUsuariosSolicitantes.module.css";

const ProjetoUsuarioSolicitantes = () => {
  const { id } = useParams(); // ID do projeto da URL
  const [cookies] = useCookies(["userId"]);
  const [solicitantes, setSolicitantes] = useState([]);
  const [usuarioCriador, setUsuarioCriador] = useState(null);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const usuariosPorPagina = 4;

  useEffect(() => {
    const fetchSolicitantes = async () => {
      try {
        const projetoResponse = await fetch(
          `http://localhost:8080/projetos/${id}`
        );
        const projeto = await projetoResponse.json();

        // Verifica se o usuário logado é o criador do projeto
        if (
          projeto.usuarioCriador &&
          projeto.usuarioCriador.id === parseInt(cookies.userId, 10)
        ) {
          setUsuarioCriador(projeto.usuarioCriador);
          setSolicitantes(projeto.usuariosSolicitantes || []);
        }
      } catch (error) {
        console.error("Erro ao buscar os solicitantes do projeto:", error);
      }
    };

    fetchSolicitantes();
  }, [id, cookies]);

  const handleAceitar = async (usuarioId) => {
    try {
      await fetch(
        `http://localhost:8080/projetos/${id}/add-pessoa/${usuarioId}`,
        {
          method: "PUT",
        }
      );

      setSolicitantes((prevSolicitantes) =>
        prevSolicitantes.filter((usuario) => usuario.id !== usuarioId)
      );
    } catch (error) {
      console.error("Erro ao aceitar o solicitante:", error);
    }
  };

  const handleRecusar = async (usuarioId) => {
    try {
      await fetch(
        `http://localhost:8080/projetos/${id}/remove-solicitante/${usuarioId}`,
        {
          method: "PUT",
        }
      );

      setSolicitantes((prevSolicitantes) =>
        prevSolicitantes.filter((usuario) => usuario.id !== usuarioId)
      );
    } catch (error) {
      console.error("Erro ao recusar o solicitante:", error);
    }
  };

  if (!usuarioCriador) {
    return (
      <div>
        Você não tem permissão para visualizar os solicitantes deste projeto.
      </div>
    );
  }

  const indiceUltimoUsuario = paginaAtual * usuariosPorPagina;
  const indicePrimeiroUsuario = indiceUltimoUsuario - usuariosPorPagina;
  const usuariosExibidos = solicitantes.slice(
    indicePrimeiroUsuario,
    indiceUltimoUsuario
  );

  const mudarPagina = (numeroPagina) => {
    setPaginaAtual(numeroPagina);
  };

  const totalPaginas = Math.ceil(solicitantes.length / usuariosPorPagina);

  return (
    <div className={styles.container}>
      <section className={styles.solicitantesSection}>
        <h3>Solicitantes</h3>
        <div className={styles.solicitantesContainer}>
          {usuariosExibidos.length > 0 ? (
            usuariosExibidos.map((usuario) => (
              <div key={usuario.id} className={styles.cardWrapper}>
                <CardPessoaSolicitante
                  usuario={usuario}
                  onAceitar={handleAceitar}
                  onRecusar={handleRecusar}
                />
              </div>
            ))
          ) : (
            <p>Não há solicitantes neste projeto.</p>
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

export default ProjetoUsuarioSolicitantes;
