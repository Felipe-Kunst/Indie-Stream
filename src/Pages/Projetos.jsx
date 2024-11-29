import React from "react";

import HeaderLogado from "../components/HeaderLogado/HeaderLogado";
import ListaProjetos from "../components/ListaProjetos/ListaProjetos";

export default function Main() {
  return (
    <div className="containerGeral">
      <HeaderLogado />
      <ListaProjetos />
    </div>
  );
}
