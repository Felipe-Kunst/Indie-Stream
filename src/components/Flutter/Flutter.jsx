import React from "react";
import styles from "./Flutter.module.css";
import Logo from "../../assets/Logo.png";
import SetaCima from "../../assets/SetaCima.png";

function Flutter() {

  const scrollParaCima = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.flutterContainer}>
      <div className={styles.flutterConteudo}>
        <div className={`${styles.flutterSecao} ${styles.logoSecao}`}>
          <img src={Logo} alt="IndieStream Logo" className={styles.flutterLogo} />
          <p className={styles.contatoInfo}>(48) 98803-2018</p>
          <p className={styles.contatoInfo}>contact@indiestream.com</p>
        </div>
        <div className={`${styles.flutterSecao} ${styles.linksSecao}`}>
          <FooterLink text="Sobre" />
          <FooterLink text="Growers" />
          <FooterLink text="Merchants" />
          <FooterLink text="Parcerias" />
          <FooterLink text="Contato" />
        </div>
        <div className={`${styles.flutterSecao} ${styles.linksSecao}`}>
          <FooterLink text="Facebook" />
          <FooterLink text="Twitter" />
          <FooterLink text="LinkedIn" />
          <FooterLink text="Instagram" />
        </div>
      </div>
      <div className={styles.flutterBottom}>
        <p>© 2024 IndieStream. All rights reserved.</p>
      </div>
      <button className={styles.scrollTopButton} onClick={scrollParaCima}>
        <img src={SetaCima} alt="Scroll Para Cima" />
      </button>
    </div>
  );
}

function FooterLink({ text }) {
  return <p className={styles.flutterLink}>{text}</p>;
}

export default Flutter;
