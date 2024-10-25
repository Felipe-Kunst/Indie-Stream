import React from "react";
import ReactDOM from "react-dom";
import "./index.css"; // Importe o CSS global
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./Pages/Main-Public.jsx";
import Teste from "./Pages/Pageteste.jsx";
import EsqueceuSenha from "./Pages/PaginaEsqueciSenha.jsx";
import Login from "./Pages/PaginadeLogin.jsx";
import Cadastro from "./Pages/PaginadeCadastro.jsx";
import Planos from "./Pages/PlanosPage.jsx";
import HomelogadoPage from "./Pages/HomeLogadoPage.jsx";
import EditarUsuario from "./Pages/EditarUsuarioPage.jsx";
import VisualizarUsuario from "./Pages/VisualizaUsuario.jsx";
import ResultadosPesquisa from "./Pages/ResultadoPesquisa.jsx";
import ListaUsuarios from "./Pages/Usuarios.jsx";
import UserPage from "./Pages/UserPage.jsx";
import ListaProjetos from "./components/UsersProjetos/UserProjetos2.jsx"; // Novo componente de lista de projetos
import CriarProjeto from "./Pages/PaginaCriarProjeto.jsx";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="testes" element={<Teste />} />
      <Route path="EsqueceuSenha" element={<EsqueceuSenha />} />
      <Route path="PaginadeLogin" element={<Login />} />
      <Route path="PaginadeCadastro" element={<Cadastro />} />
      <Route path="HomelogadoPage" element={<HomelogadoPage />} />
      <Route path="Planos" element={<Planos />} />
      <Route path="EditarUsuario" element={<EditarUsuario />} />
      <Route path="VisualizarUsuario" element={<VisualizarUsuario />} />
      <Route path="ResultadosPesquisa" element={<ResultadosPesquisa />} />
      <Route path="Usuarios" element={<ListaUsuarios />} />
      <Route path="CriarProjeto" element={<CriarProjeto />} />
      <Route path="/UserPage/:id" element={<UserPage />} />
      <Route path="/projetos/:id" element={<ListaProjetos />} /> {/* Novo */}
    </Routes>
  </BrowserRouter>,

  document.getElementById("root")
);

reportWebVitals();
