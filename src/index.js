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
import HomelogadoPage from "./Pages/HomaLogadoPage.jsx";

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}> </Route>  
            <Route path="testes" element={<Teste />} />
            <Route path="EsqueceuSenha" element={<EsqueceuSenha />} />
            <Route path="Login" element={<Login />} />
            <Route path="Cadastro" element={<Cadastro />} />
            <Route path="HomelogadoPage" element={<HomelogadoPage />} />
            <Route path="ConhecaPlanos" element={<ConhecaPlanos />} />


        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);

reportWebVitals();