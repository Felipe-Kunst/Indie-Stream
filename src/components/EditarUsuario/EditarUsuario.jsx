import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from './EditarUsuario.module.css';
import editarIcon from '../../assets/EditarUsuario.png';
import lixeiraIcon from '../../assets/Lixeira.png'; 
import facebookIcon from '../../assets/Facebook.png'; 
import twitterIcon from '../../assets/X.png'; 
import instagramIcon from '../../assets/Instagram.png'; 
import noneIcon from '../../assets/None.png'; 
import ticktokIcon from '../../assets/Ticktoc.png';
import pinterestIcon from '../../assets/Pinterest.png';
import outlookIcon from '../../assets/Outlook.png';
import LinkedinIcon from '../../assets/Linkedin.png';
import gmailIcon from '../../assets/Gmail.png';
import EmailGenerico from '../../assets/EmailGenerico.png';
import AvisoDeletar from '../AvisoDeletar/AvisoDeletar';

const EditarUsuario = ({ onSave = () => {}, onDelete = () => {} }) => { 
    const [cookies] = useCookies(['userId']); 
    const [usuario, setUsuario] = useState(null);
    const [nome, setNome] = useState('');
    const [foto, setFoto] = useState('');
    const [profissao, setProfissao] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [redesSociais, setRedesSociais] = useState([]);
    const [sobreMin, setSobreMin] = useState('');
    const [habilidades, setHabilidades] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    useEffect(() => {
        const userId = cookies.userId; 
        if (userId) {
            fetch(`http://localhost:3001/usuarios/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setUsuario(data);
                    setNome(data.nome);
                    setFoto(data.imagem);
                    setProfissao(data.Ramos.join(', '));
                    setLocalizacao(data.Localizacao);
                    setRedesSociais(data.RedeSociais);
                    setSobreMin(data.SobreMin);
                    setHabilidades(data.Habilidades);
                });
        }
    }, [cookies.userId]);

    const getSocialIcon = (url) => {
        if (url.includes('facebook.com')) {
            return facebookIcon;
        } else if (url.includes('twitter.com')) {
            return twitterIcon;
        } else if (url.includes('instagram.com')) {
            return instagramIcon;
        } else if (url.includes('tiktok.com')){
            return ticktokIcon;
        } else if (url.includes('linkedin.com')){
            return LinkedinIcon;
        } else if (url.includes('@gmail')){
            return gmailIcon;
        } else if (url.includes('pinterest.com')) {
            return pinterestIcon;
        } else if (url.includes('@outlook') || url.includes('@hotmail')) {
            return outlookIcon;
        } else if (url.includes('@') && !url.includes('@gmail') && !url.includes('@hotmail') && !url.includes('@outlook')) {
            return EmailGenerico;
        }
        
        return noneIcon; 
    };

    const handleNomeChange = (e) => {
        setNome(e.target.value);
    };

    const handleFotoChange = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFoto(reader.result);
            };
            if (file) {
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    };

    const handleProfissaoChange = (e) => {
        setProfissao(e.target.value);
    };

    const handleLocalizacaoChange = (e) => {
        setLocalizacao(e.target.value);
    };

    const handleRedesSociaisChange = (index, value) => {
        const novasRedes = [...redesSociais];
        novasRedes[index] = value;
        setRedesSociais(novasRedes);
    };

    const handleAddRedeSocial = () => {
        setRedesSociais([...redesSociais, '']);
    };

    const handleRemoveRedeSocial = (index) => {
        const novasRedes = redesSociais.filter((_, i) => i !== index);
        setRedesSociais(novasRedes);
    };

    const handleSobreMinChange = (e) => {
        const value = e.target.value;
        if (value.length <= 1000) {
            setSobreMin(value);
        }
    };

    const handleHabilidadesChange = (e) => {
        setHabilidades(e.target.value);
    };

    const handleSave = () => {
        const userId = cookies.userId;
        const updatedUser = { 
            ...usuario, 
            nome, 
            imagem: foto, 
            Ramos: profissao.split(', '), 
            Localizacao: localizacao,
            RedeSociais: redesSociais,
            SobreMin: sobreMin,
            Habilidades: habilidades
        };
        
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
        setShowDeleteWarning(true);
    };

    const confirmDelete = () => {
        setShowDeleteWarning(false);
        const userId = cookies.userId;
        fetch(`http://localhost:3001/usuarios/${userId}`, {
            method: 'DELETE'
        })
        .then(() => {
            onDelete(userId);
            window.location.href = '/'; 
        });
    };

    const cancelDelete = () => {
        setShowDeleteWarning(false);
    };

    if (!usuario) {
        return <p>Carregando...</p>;
    }

    return (
        <div className={styles.container}>
            <h2>Editar Usuários</h2>
            <div className={styles.contentContainer}>
                <div className={styles.formGroup}>
                    <div className={styles.imageContainer}>
                        {foto && <img src={foto} alt="Foto do Usuário" className={styles.preview} />}
                        <img
                            src={editarIcon}
                            alt="Alterar Imagem"
                            onClick={handleFotoChange}
                            className={styles.editIcon}
                        />
                    </div>
                </div>
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
                    <label>Profissão:</label>
                    <input 
                        type="text" 
                        value={profissao} 
                        onChange={handleProfissaoChange} 
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Localização:</label>
                    <input 
                        type="text" 
                        value={localizacao} 
                        onChange={handleLocalizacaoChange} 
                        className={styles.input}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label>Rede Sociais:</label>
                    {redesSociais.map((rede, index) => (
                        <div key={index} className={styles.iconWrapper}>
                            <img
                                src={getSocialIcon(rede)}
                                alt="Ícone da Rede Social"
                                className={styles.socialIcon}
                            />
                            <input 
                                type="text" 
                                value={rede} 
                                onChange={(e) => handleRedesSociaisChange(index, e.target.value)} 
                                className={styles.input} 
                            />
                            <img
                                src={lixeiraIcon}
                                alt="Remover"
                                onClick={() => handleRemoveRedeSocial(index)}
                                className={styles.deleteIcon}
                            />
                        </div>
                    ))}
                    <button onClick={handleAddRedeSocial} className={styles.addButton}>
                        + Adicionar
                    </button>
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.labelSobreMin}>Sobre Mim:</label>
                    <textarea 
                        value={sobreMin} 
                        onChange={handleSobreMinChange} 
                        className={styles.inputSobreMin} 
                    />
                    <p className={styles.charCount}>{sobreMin.length}/1000</p>
                </div>
                <div className={styles.formGroup}>
                    <label>Habilidades:</label>
                    <input 
                        type="text" 
                        value={habilidades} 
                        onChange={handleHabilidadesChange} 
                        className={styles.input}
                    />
                </div>
                <div className={styles.buttons}>
                    <button onClick={handleSave} className={styles.saveButton}>Salvar</button>
                    <button onClick={handleDelete} className={styles.deleteButton}>Deletar</button>
                </div>
            </div>
            {showDeleteWarning && (
                <AvisoDeletar onConfirm={confirmDelete} onCancel={cancelDelete} />
            )}
        </div>
    );
};

export default EditarUsuario;
