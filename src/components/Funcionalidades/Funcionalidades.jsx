import React from "react";
import styles from "./Funcionalidades.module.css";
import Estrela from "../../assets/Estrelinha.png"; 

function AquivcPode() {
  return (
    <section className={styles.secaoAquivcpode}>
      <h2 className={styles.secaoAquivcpodeH2}>Aqui você pode</h2>
      <div className={styles.FuncionalidadesGrid}>
        <div className={styles.FuncionalidadesCard}>
          <img src={Estrela} alt="Ícone de Estrela" className={styles.EstrelaIcon} />
          <p className={styles.FuncionalidadesCardP}>Conectar-se com profissionais da área</p>
        </div>
        <div className={styles.FuncionalidadesCard}>
          <img src={Estrela} alt="Ícone de Estrela" className={styles.EstrelaIcon} />
          <p className={styles.FuncionalidadesCardP}>Expor sua criatividade</p>
        </div>
        <div className={styles.FuncionalidadesCard}>
          <img src={Estrela} alt="Ícone de Estrela" className={styles.EstrelaIcon} />
          <p className={styles.FuncionalidadesCardP}>Catalogar Produções Independentes</p>
        </div>
        <div className={styles.FuncionalidadesCard}>
          <img src={Estrela} alt="Ícone de Estrela" className={styles.EstrelaIcon} />
          <p className={styles.FuncionalidadesCardP}>Participar de um grande projeto</p>
        </div>
      </div>
    </section>
  );
}

export default AquivcPode;
