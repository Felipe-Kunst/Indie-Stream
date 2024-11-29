import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import styles from "./ProjetoDetalhes.module.css";

const VisualizarProjeto = () => {
  const { id } = useParams();
  const [cookies] = useCookies(["userId"]);
  const [projeto, setProjeto] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [solicitado, setSolicitado] = useState(false);
  const [isEnvolvido, setIsEnvolvido] = useState(false);

  useEffect(() => {
    const usuarioId = parseInt(cookies.userId, 10);

    // Buscar o projeto pelo ID
    axios
      .get(`http://localhost:8080/projetos/${id}`)
      .then((response) => {
        setProjeto(response.data);

        // Verificar se o usuário logado já está na lista de solicitantes
        if (
          response.data.usuariosSolicitantes &&
          response.data.usuariosSolicitantes.some(
            (solicitante) => solicitante.id === usuarioId
          )
        ) {
          setSolicitado(true);
        }

        // Verificar se o usuário logado já está na lista de pessoas envolvidas
        if (
          response.data.pessoasEnvolvidas &&
          response.data.pessoasEnvolvidas.some(
            (pessoa) => pessoa.id === usuarioId
          )
        ) {
          setIsEnvolvido(true);
        }
      })
      .catch((error) => console.error("Erro ao buscar o projeto:", error));

    // Buscar informações do usuário logado
    if (usuarioId) {
      axios
        .get(`http://localhost:8080/user/${usuarioId}`)
        .then((response) => setUsuarioLogado(response.data))
        .catch((error) =>
          console.error("Erro ao buscar usuário logado:", error)
        );
    }
  }, [id, cookies]);

  if (!projeto) {
    return <div>Carregando...</div>;
  }

  const {
    titulo,
    imagemUrl,
    descricao,
    status,
    usuarioCriador,
    usuariosSolicitantes,
    pessoasEnvolvidas,
  } = projeto;

  const statusClass =
    status === "Concluído" ? styles.concluido : styles.andamento;

  const handleSolicitar = () => {
    const usuarioId = cookies.userId;

    if (usuarioId) {
      axios
        .put(
          `http://localhost:8080/projetos/${id}/add-solicitante/${usuarioId}`
        )
        .then(() => {
          setSolicitado(true);
          // Atualizar a lista de solicitantes localmente
          setProjeto((prev) => ({
            ...prev,
            usuariosSolicitantes: [
              ...(prev.usuariosSolicitantes || []),
              usuarioLogado,
            ],
          }));
        })
        .catch((error) =>
          console.error("Erro ao adicionar o usuário como solicitante:", error)
        );
    }
  };

  const isCriador = usuarioCriador && usuarioCriador.id === cookies.userId;

  return (
    <div className={styles.container}>
      <section className={styles.projetoSection}>
        <h2 className={styles.title}>Visualizar Projeto</h2>
        <hr className={styles.divider} />
        <h3 className={styles.projetoNome}>{titulo}</h3>
        {imagemUrl && (
          <img src={imagemUrl} alt={titulo} className={styles.projetoImagem} />
        )}
        <p className={styles.descricao}>{descricao}</p>
        <div className={`${styles.statusContainer} ${statusClass}`}>
          <span className={styles.statusDot}></span>
          <span className={styles.status}>{status}</span>
        </div>

        <div className={styles.criadorContainer}>
          <span className={styles.criadoPor}>Criado por:</span>
          <Link
            to={`/VisualizarUsuario/${usuarioCriador.id}`}
            className={styles.linkCriador}
          >
            <img
              src={usuarioCriador.imagemUrl}
              alt={usuarioCriador.nome}
              className={styles.criadorImagem}
            />
            <span className={styles.criadorNome}>{usuarioCriador.nome}</span>
          </Link>
        </div>

        {/* Botão de solicitar aparece apenas se o usuário não for o criador, não for um envolvido, e ainda não tiver solicitado */}
        {!isCriador && !isEnvolvido && (
          <button
            className={styles.contatoButton}
            onClick={handleSolicitar}
            disabled={solicitado}
          >
            {solicitado ? "Solicitado" : "Entrar em contato"}
          </button>
        )}
      </section>
    </div>
  );
};

export default VisualizarProjeto;
