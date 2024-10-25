import React from "react";
import styles from "./Planos.module.css";

const Planos = () => {
  return (
    <div className={styles.planosContainer}>
      {/* Plano Básico */}
      <div className={styles.plano}>
        <h2>Plano Básico</h2>
        <p className={styles.preco}>Gratuito</p>
        <ul className={styles.beneficios}>
          <li>Direito a adicionar apenas 1 projeto por vez</li>
          <li>Recomendação Padrão de Algoritmo</li>
          <li>Limitação de envio de convite para até 5 projetos</li>
        </ul>
      </div>

      {/* Plano Premium Mensal */}
      <div className={styles.plano}>
        <h2>Plano Premium Mensal</h2>
        <p className={styles.preco}>R$ 50/mês</p>
        <ul className={styles.beneficios}>
          <li>Direito a adicionar projetos de maneira ilimitada</li>
          <li>Recomendação Aprimorada com o botão Impulsionar-se</li>
          <li>Sem limitações de envio de convites</li>
        </ul>
        <button className={styles.assinarBtn}>ASSINAR AGORA</button>
      </div>

      {/* Plano Premium Anual */}
      <div className={styles.plano}>
        <h2>Plano Premium Anual</h2>
        <p className={styles.preco}>R$ 550/ano</p>
        <ul className={styles.beneficios}>
          <li>Direito a adicionar projetos de maneira ilimitada</li>
          <li>Recomendação Aprimorada com o botão Impulsionar-se</li>
          <li>Sem limitações de envio de convites</li>
        </ul>
        <button className={styles.assinarBtn}>ASSINAR AGORA</button>
      </div>
    </div>
  );
};

export default Planos;
