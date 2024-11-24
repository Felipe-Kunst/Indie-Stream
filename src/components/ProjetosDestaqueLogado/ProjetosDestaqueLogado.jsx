import React, { useState, useEffect } from "react";
import BoxProjetos from "../BoxProjetos/BoxProjetos";
import styles from "./ProjetosDestaqueLogado.module.css";

const ProjetoDestaqueLogado = () => {
  const [projetos, setProjetos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/projetos?_limit=3")
      .then((response) => response.json())
      .then((data) => setProjetos(data))
      .catch((error) => console.error("Erro ao buscar projetos:", error));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.titulo}>Projetos em Destaque</h2>
      <div className={styles.projetos}>
        {projetos.map((projeto) => (
          <BoxProjetos key={projeto.id} projeto={projeto} />
        ))}
      </div>
      <a href="/projetos" className={styles.link}>
        Ver todos os resultados em projetos
      </a>
    </div>
  );
};

export default ProjetoDestaqueLogado;
