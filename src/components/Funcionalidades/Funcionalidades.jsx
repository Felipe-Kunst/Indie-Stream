import React from "react";
import "./Funcionalidades.css";
import Estrela from "../../assets/Estrelinha.png"; 

function AquivcPode() {
  return (
    <section className="secao-aquivcpode">
      <h2>Aqui você pode</h2>
      <div className="Funcionalidades-grid">
        <div className="Funcionalidades-card">
          <img src={Estrela} alt="Ícone de Estrela" className="Estrela-icon" />
          <p>Conectar-se com profissionais da área</p>
        </div>
        <div className="Funcionalidades-card">
          <img src={Estrela} alt="Ícone de Estrela" className="Estrela-icon" />
          <p>Expor sua criatividade</p>
        </div>
        <div className="Funcionalidades-card">
          <img src={Estrela} alt="Ícone de Estrela" className="Estrela-icon" />
          <p>Catalogar Produções Independentes</p>
        </div>
        <div className="Funcionalidades-card">
          <img src={Estrela} alt="Ícone de Estrela" className="Estrela-icon" />
          <p>Participar de um grande projeto</p>
        </div>
      </div>
    </section>
  );
}

export default AquivcPode;
