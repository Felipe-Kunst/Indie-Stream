import React from "react";
import "./BoxDestaque.css";

function BoxDestaques({ Projetos }) {
  const {imagem, title } = Projetos;

  return (
    <div className="Box_Destaques">
      <img src={imagem} alt={title} />
      <div className="Info_Projetos">
         <h2>{title}</h2>
      </div>
    </div>
  );
}

export default BoxDestaques;
