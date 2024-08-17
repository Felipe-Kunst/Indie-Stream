import React from "react";
import HeaderPublic from '../components/HeaderTeste/HeaderTeste';
import ImagemFundo from "../components/ImagemFundo/ImagemFundo";
import TopProjetos from "../components/ProjetosDestaques/ProjetosDestaque";
import AquivcPode from "../components/Funcionalidades/Funcionalidades";
import Flutter from "../components/Flutter/Flutter";
import Header from "../components/HeaderTeste/HeaderTeste2";
export default function Main() {
  return (
    <div>
        <Header/>
        <TopProjetos/>
        <AquivcPode/>
        <Flutter/>
    
    </div>
  );
}


