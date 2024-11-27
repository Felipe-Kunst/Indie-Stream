import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UsersSobreMim.module.css";

const SobreMim = () => {
  const [perfil, setPerfil] = useState(null);
  const { id } = useParams(); // Pega o ID do usuário da URL

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:8080/user/${id}`) // Usa o ID da URL
        .then((response) => response.json())
        .then((data) => setPerfil(data))
        .catch((error) => console.error("Erro ao carregar perfil:", error));
    }
  }, [id]);

  if (!perfil) return <p>Carregando...</p>;

  return (
    <div className={styles.sobreMimContainer}>
      <h2 className={styles.sobreMimTitulo}>Sobre mim</h2>
      <p className={styles.sobreMimTexto}>
        {perfil.sobreMim || "Nenhuma informação disponível sobre o usuário."}
      </p>
    </div>
  );
};

export default SobreMim;
