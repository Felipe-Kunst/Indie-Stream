import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import BoxProjetos from '../BoxProjeto2/BoxProjeto2'; 
import styles from './UserProjetos.modules.css';

const UserProjetos = () => {
    const [projetos, setProjetos] = useState([]);
    const [cookies, setCookie] = useCookies(['projeto_pagina']);
    const [pagina, setPagina] = useState(cookies.projeto_pagina || 1);

    useEffect(() => {
        const fetchProjetos = async () => {
            try {
                const response = await axios.get('http://localhost:3002/projetos');
                setProjetos(response.data);
            } catch (error) {
                console.error('Erro ao buscar projetos:', error);
            }
        };

        fetchProjetos();
    }, []);

    useEffect(() => {
        setCookie('projeto_pagina', pagina, { path: '/' });
    }, [pagina, setCookie]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Projetos</h2>
            <div className={styles.paginate}>
                {pagina} de {Math.ceil(projetos.length / 3)}
            </div>
            <div className={styles.projetos}>
                {projetos.slice((pagina - 1) * 3, pagina * 3).map((projeto) => (
                    <BoxProjetos key={projeto.id} projeto={projeto} /> 
                ))}
            </div>
            <div className={styles.paginationButtons}>
                <button
                    onClick={() => setPagina((prev) => Math.max(prev - 1, 1))}
                    className={styles.button}
                    disabled={pagina === 1}
                >
                    Anterior
                </button>
                <button
                    onClick={() =>
                        setPagina((prev) => Math.min(prev + 1, Math.ceil(projetos.length / 3)))
                    }
                    className={styles.button}
                    disabled={pagina === Math.ceil(projetos.length / 3)}
                >
                    Próximo
                </button>
            </div>
        </div>
    );
};

export default UserProjetos;
