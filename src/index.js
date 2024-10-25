import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './Pages/Main-Public.jsx';
import Teste from "./Pages/Pageteste.jsx";
import EsqueceuSenha from "./Pages/PaginaEsqueciSenha.jsx";
import Login from "./Pages/PaginadeLogin.jsx";
import Cadastro from "./Pages/PaginadeCadastro.jsx";
import ConhecaPlanos from "./Pages/ConhecaPlanosPage.jsx";
import HomelogadoPage from "./Pages/HomeLogadoPage.jsx";
import EditarUsuario from "./Pages/EditarUsuarioPage.jsx";
import VisualizarUsuario from "./Pages/VisualizaUsuario.jsx" 
import ResultadosPesquisa from "./Pages/ResultadoPesquisa.jsx";
import ListaUsuarios from "./Pages/Usuarios.jsx";
import UserPage from "./Pages/UserPage.jsx";
import ProjetoDetalhe from './Pages/ProjetoDetalhe.jsx'
ReactDOM.render(

    <BrowserRouter>    
        <Routes>
            <Route path="/" element={<MainPage/>}> </Route>  
            <Route path="testes" element={<Teste />} />
            <Route path="EsqueceuSenha" element={<EsqueceuSenha />} />
            <Route path="PaginadeLogin" element={<Login />} />
            <Route path="PaginadeCadastro" element={<Cadastro />} />
            <Route path="HomelogadoPage" element={<HomelogadoPage />} />
            <Route path="ConhecaPlanos" element={<ConhecaPlanos />} />
            <Route path="EditarUsuario" element={<EditarUsuario />} />
            <Route path="VisualizarUsuario" element={<VisualizarUsuario />} />
            <Route path="ResultadosPesquisa" element={<ResultadosPesquisa />} />
m           <Route path="Usuarios" element={<ListaUsuarios />} />      
            <Route path="/UserPage/:id" element={<UserPage />} />
            <Route path="/ProjetoDetalhe/:id" element={<ProjetoDetalhe />} />
    


        </Routes>
    </BrowserRouter>,

document.getElementById("root")
);

reportWebVitals();