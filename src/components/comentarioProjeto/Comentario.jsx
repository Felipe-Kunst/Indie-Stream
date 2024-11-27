import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import styles from "./Comentario.module.css";

const Comentarios = () => {
  const { id: projetoId } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState("");
  const [cookies] = useCookies(["userId"]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const fetchUsuarioLogado = async () => {
      try {
        if (cookies.userId) {
          const response = await axios.get(
            `http://localhost:8080/user/${cookies.userId}`
          );
          setUsuarioLogado(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar o usuário logado:", error);
      }
    };

    const fetchComentarios = async () => {
      try {
        if (!projetoId) return;

        const response = await axios.get(
          `http://localhost:8080/projetos/${projetoId}`
        );

        // Assumimos que os comentários estão no campo 'comentarios'
        setComentarios(response.data.comentarios);
      } catch (error) {
        console.error("Erro ao buscar os comentários:", error);
      }
    };

    fetchUsuarioLogado();
    fetchComentarios();
  }, [projetoId, cookies]);

  const handleAddComentario = async () => {
    if (!novoComentario.trim()) return;

    try {
      const usuarioId = cookies.userId;

      // Adiciona o novo comentário ao backend
      const response = await axios.post(
        `http://localhost:8080/comentarios/projeto/${projetoId}/usuario/${usuarioId}`,
        { texto: novoComentario }
      );

      // Atualiza os comentários localmente com o novo dado retornado
      setComentarios((prev) => [...prev, response.data]);
      setNovoComentario("");
    } catch (error) {
      console.error("Erro ao adicionar o comentário:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Comentários</h3>
      <hr className={styles.divider} />
      <div className={styles.novoComentario}>
        <div className={styles.comentarioItem}>
          {usuarioLogado && (
            <img
              src={usuarioLogado.imagemUrl}
              alt={`Imagem de ${usuarioLogado.nome}`}
              className={styles.usuarioImagem}
            />
          )}
          <textarea
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Adicione seu comentário"
            className={styles.textarea}
          />
        </div>
      </div>
      <button onClick={handleAddComentario} className={styles.botaoAdicionar}>
        Adicionar Comentário
      </button>

      <div className={styles.comentariosList}>
        {comentarios.length > 0 ? (
          comentarios.map((comentario) => (
            <div key={comentario.id}>
              <div className={styles.comentarioItem}>
                <img
                  src={comentario.usuarioImagemUrl}
                  alt={`Imagem de ${comentario.usuarioNome}`}
                  className={styles.comentarioImagem}
                />
                <div className={styles.comentarioTexto}>
                  <p>
                    <strong>{comentario.usuarioNome}</strong>:{" "}
                    {comentario.texto}
                  </p>
                </div>
              </div>
              <hr className={styles.divisor} />
            </div>
          ))
        ) : (
          <p>Nenhum comentário ainda.</p>
        )}
      </div>
    </div>
  );
};

export default Comentarios;
