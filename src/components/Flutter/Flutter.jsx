import React from "react";
import "./Flutter.css";
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
    <div className="flutter-container">
      <div className="flutter-conteudo">
        <div className="flutter-secao logo-secao">
          <img src={Logo} alt="IndieStream Logo" className="flutter-logo" />
          <p className="Contato-info">(48) 98803-2018</p>
          <p className="Contato-info">contact@indiestream.com</p>
        </div>
        <div className="flutter-secao links-secao">
          <FooterLink text="Sobre" />
          <FooterLink text="Growers" />
          <FooterLink text="Merchants" />
          <FooterLink text="Parcerias" />
          <FooterLink text="Contato" />
        </div>
        <div className="flutter-secao links-secao">
          <FooterLink text="Facebook" />
          <FooterLink text="Twitter" />
          <FooterLink text="LinkedIn" />
          <FooterLink text="Instagram" />
        </div>
      </div>
      <div className="flutter-bottom">
        <p>© 2024 IndieStream. All rights reserved.</p>
      </div>
      <button className="scroll-top-button" onClick={scrollParaCima}>
        <img src={SetaCima} alt="Scroll Para Cima" />
      </button>
    </div>
  );
}

function FooterLink({ text }) {
  return <p className="footer-link">{text}</p>;
}

export default Flutter;
