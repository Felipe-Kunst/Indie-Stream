import React from "react";

import CriarProjeto from "../components/CriarProjeto/CriarProjeto";
import HeaderLogado from "../components/HeaderLogado/HeaderLogado";

export default function Main() {
  return (
    <div className="containerGeral">
      <HeaderLogado />
      <CriarProjeto />
    </div>
  );
}
