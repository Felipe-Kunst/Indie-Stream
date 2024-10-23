import React from "react";
import Header from "../components/Header/Header"
import AquivcPode from "../components/Funcionalidades/Funcionalidades"
import TopProjetos from "../components/ProjetosDestaques/ProjetosDestaque"
import Flutter from "../components/Flutter/Flutter"

export default function Main() {
  return (
    <div >
        <Header/>    
        <TopProjetos/>
        <AquivcPode/>
        <Flutter/>
    </div>
  );
}