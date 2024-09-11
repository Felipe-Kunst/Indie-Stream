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
    const [habilidades, setHabilidades] = useState([]);
    const [profissao, setProfissao] = useState('');
    const [localizacao, setLocalizacao] = useState({ estadoId: '', cidadeId: '' });
    const [redesSociais, setRedesSociais] = useState([]);
    const [sobreMin, setSobreMin] = useState('');
    const [todasHabilidades, setTodasHabilidades] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const [estados, setEstados] = useState([]);
    const [cidades, setCidades] = useState([]);
    const [todasProfissoes, setTodasProfissoes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3002/estados')
            .then(response => response.json())
            .then(data => setEstados(data));

        fetch('http://localhost:3002/habilidades')
            .then(response => response.json())
            .then(data => setTodasHabilidades(data));

        fetch('http://localhost:3002/profissoes')
            .then(response => response.json())
            .then(data => setTodasProfissoes(data));
    }, []);

    useEffect(() => {
        const userId = cookies.userId; 
        if (userId) {
            fetch(`http://localhost:3002/usuarios/${userId}`)
                .then(response => response.json())
                .then(data => {
                    setUsuario(data);
                    setNome(data.nome);
                    setFoto(data.imagem);
                    setLocalizacao(data.localizacao);
                    setRedesSociais(data.redeSociais);
                    setSobreMin(data.sobreMin);
                    setProfissao(data.profissao);

                    fetch(`http://localhost:3002/usuario_habilidades?usuarioId=${userId}`)
                        .then(response => response.json())
                        .then(habilidadeRelacionadas => {
                            const habilidadesPromises = habilidadeRelacionadas.map(uh =>
                                fetch(`http://localhost:3002/habilidades/${uh.habilidadeId}`)
                                    .then(response => response.json())
                            );
                            Promise.all(habilidadesPromises).then(habilidadesData => {
                                setHabilidades(habilidadesData.map(h => h.nome));
                            });
                        });
                });
        }
    }, [cookies.userId]);

    useEffect(() => {
        if (localizacao.estadoId) {
            fetch(`http://localhost:3002/cidades?estadoId=${localizacao.estadoId}`)
                .then(response => response.json())
                .then(data => setCidades(data));
        } else {
            setCidades([]);
        }
    }, [localizacao.estadoId]);

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
        } else if (url.includes('@') && !url.includes('@gmail')  && !url.includes('@hotmail')  && !url.includes('@outlook')) {
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

    const handleLocalizacaoChange = (campo, valor) => {
        setLocalizacao(prevState => ({
            ...prevState,
            [campo]: valor
        }));
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
        const habilidadeSelecionada = e.target.value;
        if (habilidadeSelecionada && !habilidades.includes(habilidadeSelecionada)) {
            setHabilidades([...habilidades, habilidadeSelecionada]);
        }
    };

    const handleRemoveHabilidade = (index) => {
        const novasHabilidades = habilidades.filter((_, i) => i !== index);
        setHabilidades(novasHabilidades);
    };

    const handleProfissaoChange = (e) => {
        setProfissao(e.target.value);
    };

    const handleSave = () => {
        const userId = cookies.userId;
        const updatedUser = { 
            ...usuario, 
            nome, 
            imagem: foto, 
            localizacao,
            redesSociais,
            sobreMin,
            habilidades,
            profissao 
        };
        
        fetch(`http://localhost:3002/usuarios/${userId}`, {
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
        fetch(`http://localhost:3002/usuarios/${userId}`, {
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
           
            <div className={styles.contentContainer}>
                 <h2>Editar Usuário</h2>             
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
                    <label>Estado:</label>
                    <select 
                        value={localizacao.estadoId} 
                        onChange={(e) => handleLocalizacaoChange('estadoId', e.target.value)} 
                        className={styles.input}
                    >
                        <option value="">Selecione um estado</option>
                        {estados.map(estado => (
                            <option key={estado.id} value={estado.id}>
                                {estado.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Cidade:</label>
                    <select 
                        value={localizacao.cidadeId} 
                        onChange={(e) => handleLocalizacaoChange('cidadeId', e.target.value)} 
                        className={styles.input}
                    >
                        <option value="">Selecione uma cidade</option>
                        {cidades.map(cidade => (
                            <option key={cidade.id} value={cidade.id}>
                                {cidade.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Profissão:</label>
                    <select 
                        value={profissao} 
                        onChange={handleProfissaoChange} 
                        className={styles.input}
                    >
                        <option value="">Selecione uma profissão</option>
                        {todasProfissoes.map(profissao => (
                            <option key={profissao.id} value={profissao.nome}>
                                {profissao.nome}
                            </option>
                        ))}
                    </select>
                </div>
                <div className={styles.formGroup}>
    <label>Habilidades:</label>
    <select 
        value="" 
        onChange={handleHabilidadesChange} 
        className={styles.input}
    >
        <option value="">Selecione uma habilidade</option>
        {todasHabilidades.map(habilidade => (
            <option key={habilidade.id} value={habilidade.nome}>
                {habilidade.nome}
            </option>
        ))}
    </select>

    <div className={styles.habilidadesContainer}>
        {habilidades.map((habilidade, index) => (
            <div key={index} className={styles.habilidadeItem}>
                <span>{habilidade}</span> 
                <button 
                    onClick={() => handleRemoveHabilidade(index)} 
                    className={styles.removeButton}
                >
                    Remover
                </button>
            </div>
        ))}
    </div>
</div>

                <div className={styles.formGroup}>
                    <label>Redes Sociais:</label>
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
