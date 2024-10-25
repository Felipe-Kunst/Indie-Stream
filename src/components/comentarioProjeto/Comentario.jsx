import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import styles from './Comentario.module.css';

const Comentarios = () => {
  const { id: projetoId } = useParams();
  const [comentarios, setComentarios] = useState([]);
  const [novoComentario, setNovoComentario] = useState('');
  const [cookies] = useCookies(['userId']);
  const [usuarios, setUsuarios] = useState({});
  const [usuarioLogado, setUsuarioLogado] = useState(null);

  useEffect(() => {
    const fetchUsuarioLogado = async () => {
      try {
        if (cookies.userId) {
          const response = await axios.get(`http://localhost:3002/usuarios/${cookies.userId}`);
          setUsuarioLogado(response.data);
        }
      } catch (error) {
        console.error('Erro ao buscar o usuário logado:', error);
      }
    };

    const fetchComentarios = async () => {
      try {
        if (!projetoId) return;

        const responseProjeto = await axios.get(`http://localhost:3002/projetos/${projetoId}`);
        const projeto = responseProjeto.data;

        if (projeto && Array.isArray(projeto.Comentarios)) {
          setComentarios(projeto.Comentarios);

          const usuarioIds = [...new Set(projeto.Comentarios.map(c => c.usuarioid))];
          const usuariosResponse = await Promise.all(
            usuarioIds.map(id => axios.get(`http://localhost:3002/usuarios/${id}`))
          );

          const usuariosData = {};
          usuariosResponse.forEach(response => {
            const usuario = response.data;
            usuariosData[usuario.id] = usuario;
          });
          setUsuarios(usuariosData);
        }
      } catch (error) {
        console.error('Erro ao buscar os comentários:', error);
      }
    };

    fetchUsuarioLogado();
    fetchComentarios();
  }, [projetoId, cookies]);

  const handleAddComentario = async () => {
    if (!novoComentario.trim()) return;

    const usuarioId = cookies.userId;
    const novoComentarioObj = { usuarioid: usuarioId, comentario: novoComentario };

    try {
      const responseProjeto = await axios.get(`http://localhost:3002/projetos/${projetoId}`);
      const projeto = responseProjeto.data;
      const comentariosAtualizados = [...projeto.Comentarios, novoComentarioObj];

      await axios.patch(`http://localhost:3002/projetos/${projetoId}`, {
        Comentarios: comentariosAtualizados
      });

      setComentarios(comentariosAtualizados);
      setNovoComentario('');
    } catch (error) {
      console.error('Erro ao adicionar o comentário:', error);
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
              src={usuarioLogado.imagem} 
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
          comentarios.map((comentario, index) => {
            const usuario = usuarios[comentario.usuarioid];
            return (
              <div key={index}>
                <div className={styles.comentarioItem}>
                  {usuario && (
                    <img 
                      src={usuario.imagem} 
                      alt={`Imagem de ${usuario.nome}`} 
                      className={styles.comentarioImagem} 
                    />
                  )}
                  <div className={styles.comentarioTexto}>
                    <p>{comentario.comentario}</p>
                  </div>
                </div>
                <hr className={styles.divisor} />
              </div>
            );
          })
        ) : (
          <p>Nenhum comentário ainda.</p>
        )}
      </div>

      
    </div>
  );
};

export default Comentarios;
