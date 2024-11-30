import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { FaTrash } from "react-icons/fa"; // Ícone de lixeira
import styles from "./ProjetoDetalhes.module.css";

const VisualizarProjeto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cookies] = useCookies(["userId"]);
  const [projeto, setProjeto] = useState(null);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [solicitado, setSolicitado] = useState(false);
  const [isEnvolvido, setIsEnvolvido] = useState(false);

  useEffect(() => {
    const usuarioId = parseInt(cookies.userId, 10);

    axios
      .get(`http://localhost:8080/projetos/${id}`)
      .then((response) => {
        setProjeto(response.data);

        if (
          response.data.usuariosSolicitantes &&
          response.data.usuariosSolicitantes.some(
            (solicitante) => solicitante.id === usuarioId
          )
        ) {
          setSolicitado(true);
        }

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

  const handleDeletarProjeto = () => {
    if (window.confirm("Tem certeza que deseja deletar este projeto?")) {
      axios
        .delete(`http://localhost:8080/projetos/${id}`)
        .then(() => {
          alert("Projeto deletado com sucesso.");
          navigate("/Projetos");
        })
        .catch((error) => console.error("Erro ao deletar o projeto:", error));
    }
  };

  const handleSolicitar = () => {
    const usuarioId = cookies.userId;

    if (usuarioId) {
      axios
        .put(
          `http://localhost:8080/projetos/${id}/add-solicitante/${usuarioId}`
        )
        .then(() => {
          setSolicitado(true);
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

  const isCriador = projeto.usuarioCriador?.id === parseInt(cookies.userId, 10);

  return (
    <div className={styles.container}>
      <section className={styles.projetoSection}>
        <h2 className={styles.title}>Visualizar Projeto</h2>
        <hr className={styles.divider} />
        <h3 className={styles.projetoNome}>{projeto.titulo}</h3>
        {projeto.imagemUrl && (
          <img
            src={projeto.imagemUrl}
            alt={projeto.titulo}
            className={styles.projetoImagem}
          />
        )}
        <p className={styles.descricao}>{projeto.descricao}</p>
        <div className={`${styles.statusContainer} ${styles[projeto.status]}`}>
          <span className={styles.statusDot}></span>
          <span className={styles.status}>{projeto.status}</span>
        </div>

        <div className={styles.criadorContainer}>
          <span className={styles.criadoPor}>Criado por:</span>
          <Link
            to={`/VisualizarUsuario/${projeto.usuarioCriador?.id}`}
            className={styles.linkCriador}
          >
            <img
              src={projeto.usuarioCriador?.imagemUrl}
              alt={projeto.usuarioCriador?.nome}
              className={styles.criadorImagem}
            />
            <span className={styles.criadorNome}>
              {projeto.usuarioCriador?.nome}
            </span>
          </Link>
        </div>

        {!isCriador && !isEnvolvido && (
          <button
            className={styles.contatoButton}
            onClick={handleSolicitar}
            disabled={solicitado}
          >
            {solicitado ? "Solicitado" : "Entrar em contato"}
          </button>
        )}

        {isCriador && (
          <button
            className={styles.deletarButton}
            onClick={handleDeletarProjeto}
          >
            <FaTrash className={styles.deletarIcon} /> Deletar
          </button>
        )}
      </section>
    </div>
  );
};

export default VisualizarProjeto;
