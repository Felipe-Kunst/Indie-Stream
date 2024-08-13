import React from "react";
import Header from "../components/Header/Header"
import AquivcPode from "../components/Funcionalidades/Funcionalidades"
import TopProjetos from "../components/ProjetosDistaques/ProjetosDistaque"
import Flutter from "../components/Flutter/Flutter"

export default function Main() {
  return (
    <div>
        <Header/>
        <AquivcPode/>
        <TopProjetos/>
        <Flutter/>
    </div>
  );
}