import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from './Pages/Main-Public.jsx';
import Teste from "./Pages/Pageteste.jsx"

ReactDOM.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainPage/>}> </Route>  
            <Route path="testes" element={<Teste />} />
        </Routes>
    </BrowserRouter>,
    document.getElementById("root")
);

reportWebVitals();