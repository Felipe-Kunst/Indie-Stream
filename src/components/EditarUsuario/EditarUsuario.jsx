import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './EditarUsuario.module.css';

const EditarUsuario = ({ onSave, onDelete }) => {
    const [cookies] = useCookies(['userId']); 
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');

    useEffect(() => {
        const userId = cookies.userId; 
        if (userId) {
            fetch(`http://localhost:3001/usuarios/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setUsuario(data);
                    setNome(data.nome);
                    setFoto(data.imagem);
                });
        }
    }, [cookies.userId]);

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFoto(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        const userId = cookies.userId; // Recupera o ID do cookie
        const updatedUser = { ...usuario, nome, imagem: foto };
        
        fetch(`http://localhost:3001/usuarios/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
        .then(response => response.json())
        .then(data => onSave(data));
    };

    const handleDelete = () => {
        const userId = cookies.userId; // Recupera o ID do cookie
        fetch(`http://localhost:3001/usuarios/${userId}`, {
            method: 'DELETE'
        })
        .then(() => onDelete(userId));
    };

    if (!usuario) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.container}>
            <h2>Editar Usuário</h2>
            <div className={styles.formGroup}>
                <label>Nome:</label>
                <input 
                    type="text" 
                    value={nome} 
                    onChange={handleNomeChange} 
                    className={styles.input}
                />
            </div>
            <div className={styles.formGroup}>
                <label>Foto:</label>
                <input 
                    type="file" 
                    onChange={handleFotoChange} 
                    className={styles.input}
                />
                {foto && <img src={foto} alt="Foto do Usuário" className={styles.preview} />}
            </div>
            <div className={styles.buttons}>
                <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                <button onClick={handleDelete} className={styles.deleteButton}>Remover Usuário</button>
            </div>
        </div>
    );
};

export default EditarUsuario;

