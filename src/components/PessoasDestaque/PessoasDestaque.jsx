import React, { useEffect, useState } from "react";
import CardPessoa from "../BoxUsuarios/BoxUsuarios";
import styles from "./PessoasDestaque.module.css";

const PessoasEmDestaque = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/usuarios")
      .then(response => response.json())
      .then(data => setUsuarios(data.slice(0, 4))) 
      .catch(error => console.error("Erro ao buscar dados:", error));
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.pessoasEmDestaque}>
        <h2>Pessoas em Destaque</h2>
        <div className={styles.gridPessoas}>
          {usuarios.map((usuario) => (
            <CardPessoa key={usuario.id} usuario={usuario} />
          ))}
        </div>
        <a href="#" className={styles.verMais}>
          VER TODOS OS RESULTADOS EM PESSOAS
        </a>
      </section>
    </div>
  );
};

export default PessoasEmDestaque;


