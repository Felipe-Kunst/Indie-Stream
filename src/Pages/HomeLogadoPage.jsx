import React from "react";
import PessoasEmDestaque from '../components/PessoasDestaque/PessoasDestaque';
import ProjetoDestaqueLogado from "../components/ProjetosDestaqueLogado/ProjetosDestaqueLogado";
import HeaderLogado from '../components/HeaderLogado/HeaderLogado';
import Flutter from "../components/Flutter/Flutter";
import BuscaGeral from "../components/BuscaGeral/BuscaGeral";

export default function Main() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <HeaderLogado/>   
        <BuscaGeral/>
        <ProjetoDestaqueLogado/>
        <PessoasEmDestaque/>
        <Flutter/>
    </div>
  );
}


