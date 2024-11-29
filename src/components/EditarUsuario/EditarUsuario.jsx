import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import styles from "./EditarUsuario.module.css";
import editarIcon from "../../assets/EditarUsuario.png";
import lixeiraIcon from "../../assets/Lixeira.png";
import facebookIcon from "../../assets/Facebook.png";
import twitterIcon from "../../assets/X.png";
import instagramIcon from "../../assets/Instagram.png";
import noneIcon from "../../assets/None.png";
import ticktokIcon from "../../assets/Ticktoc.png";
import pinterestIcon from "../../assets/Pinterest.png";
import outlookIcon from "../../assets/Outlook.png";
import LinkedinIcon from "../../assets/Linkedin.png";
import gmailIcon from "../../assets/Gmail.png";
import EmailGenerico from "../../assets/EmailGenerico.png";
import AvisoDeletar from "../AvisoDeletar/AvisoDeletar";

const EditarUsuario = ({ onSave = () => {}, onDelete = () => {} }) => {
  const [cookies] = useCookies(["userId"]);
  const [usuario, setUsuario] = useState(null);
  const [nome, setNome] = useState("");
  const [foto, setFoto] = useState("");
  const [habilidades, setHabilidades] = useState([]);
  const [profissao, setProfissao] = useState("");
  const [localizacao, setLocalizacao] = useState({
    estadoId: "",
    cidadeId: "",
  });
  const [redeSociais, setRedeSociais] = useState([]);
  const [sobreMim, setSobreMin] = useState("");
  const [todasHabilidades, setTodasHabilidades] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [estados, setEstados] = useState([]);
  const [cidades, setCidades] = useState([]);
  const [todasProfissoes, setTodasProfissoes] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/estados")
      .then((response) => response.json())
      .then((data) => setEstados(data));

    fetch("http://localhost:8080/habilidades")
      .then((response) => response.json())
      .then((data) => setTodasHabilidades(data));

    fetch("http://localhost:8080/profissoes")
      .then((response) => response.json())
      .then((data) => setTodasProfissoes(data));
  }, []);

  useEffect(() => {
    const userId = cookies.userId;
    if (userId) {
      fetch(`http://localhost:8080/user/${userId}`)
        .then((response) => response.json())
        .then((data) => {
          setUsuario(data);
          setNome(data.nome);
          setFoto(data.imagemUrl);
          setLocalizacao({
            estadoId: data.estadoId || "",
            cidadeId: data.cidadeId || "",
          });
          setRedeSociais(data.redesSociais || []);
          setSobreMin(data.sobreMim || "");
          setProfissao(data.profissaoId || "");
          setHabilidades(data.habilidades || []);
        })
        .catch((error) => console.error("Erro ao carregar usuário:", error));
    }
  }, [cookies.userId]);

  useEffect(() => {
    if (localizacao.estadoId) {
      fetch(`http://localhost:8080/cidades?estadoId=${localizacao.estadoId}`)
        .then((response) => response.json())
        .then((data) => setCidades(data))
        .catch((error) => console.error("Erro ao carregar cidades:", error));
    } else {
      setCidades([]);
    }
  }, [localizacao.estadoId]);

  const handleNomeChange = (e) => {
    setNome(e.target.value);
  };

  const handleFotoChange = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
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
    setLocalizacao((prevState) => ({
      ...prevState,
      [campo]: valor,
    }));
  };

  const handleRedeSociaisChange = (index, value) => {
    const novasRedes = [...redeSociais];
    novasRedes[index] = value;
    setRedeSociais(novasRedes);
  };

  const handleSobreMinChange = (e) => {
    const value = e.target.value;
    if (value.length <= 1000) {
      setSobreMin(value);
    }
  };

  const handleHabilidadesChange = (e) => {
    const habilidadeId = e.target.value;
    const habilidadeSelecionada = todasHabilidades.find(
      (h) => h.id === parseInt(habilidadeId, 10)
    );

    if (
      habilidadeSelecionada &&
      !habilidades.some((h) => h.id === habilidadeSelecionada.id)
    ) {
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

    // Criando o objeto atualizado SEM incluir o campo senha
    const updatedUser = {
      id: userId,
      nome,
      imagemUrl: foto,
      estadoId: localizacao.estadoId,
      cidadeId: localizacao.cidadeId,
      redesSociais: redeSociais,
      sobreMim,
      habilidades: habilidades.map((h) => h.id),
      profissaoId: profissao,
    };

    fetch(`http://localhost:8080/user/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((response) => response.json())
      .then((data) => {
        onSave(data);
      })
      .catch((error) => console.error("Erro ao salvar usuário:", error));
  };

  const handleDelete = () => {
    setShowDeleteWarning(true);
  };

  const confirmDelete = () => {
    setShowDeleteWarning(false);
    const userId = cookies.userId;
    fetch(`http://localhost:8080/user/${userId}`, {
      method: "DELETE",
    }).then(() => {
      onDelete(userId);
      window.location.href = "/";
    });
  };

  const cancelDelete = () => {
    setShowDeleteWarning(false);
  };

  const handleAddRedeSocial = () => {
    setRedeSociais([...redeSociais, ""]);
  };

  const handleRemoveRedeSocial = (index) => {
    const novasRedes = redeSociais.filter((_, i) => i !== index);
    setRedeSociais(novasRedes);
  };

  const getSocialIcon = (url) => {
    if (url.includes("facebook.com")) {
      return facebookIcon;
    } else if (url.includes("twitter.com")) {
      return twitterIcon;
    } else if (url.includes("instagram.com")) {
      return instagramIcon;
    } else if (url.includes("tiktok.com")) {
      return ticktokIcon;
    } else if (url.includes("linkedin.com")) {
      return LinkedinIcon;
    } else if (url.includes("@gmail")) {
      return gmailIcon;
    } else if (url.includes("pinterest.com")) {
      return pinterestIcon;
    } else if (url.includes("@outlook") || url.includes("@hotmail")) {
      return outlookIcon;
    } else if (
      url.includes("@") &&
      !url.includes("@gmail") &&
      !url.includes("@hotmail") &&
      !url.includes("@outlook")
    ) {
      return EmailGenerico;
    }

    return noneIcon;
  };

  if (!usuario) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.contentContainer}>
        <h2 className={styles.title}>Editar Usuário</h2>
        <div className={styles.formGroup}>
          <div className={styles.imageContainer}>
            {foto && (
              <img
                src={foto}
                alt="Foto do Usuário"
                className={styles.preview}
              />
            )}
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
            onChange={(e) =>
              handleLocalizacaoChange("estadoId", e.target.value)
            }
            className={styles.input}
          >
            <option value="">Selecione um estado</option>
            {estados.map((estado) => (
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
            onChange={(e) =>
              handleLocalizacaoChange("cidadeId", e.target.value)
            }
            className={styles.input}
          >
            <option value="">Selecione uma cidade</option>
            {cidades.map((cidade) => (
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
            {todasProfissoes.map((profissao) => (
              <option key={profissao.id} value={profissao.id}>
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
            {todasHabilidades.map((habilidade) => (
              <option key={habilidade.id} value={habilidade.id}>
                {habilidade.nome}
              </option>
            ))}
          </select>

          <div className={styles.habilidadesContainer}>
            {habilidades.map((habilidade, index) => (
              <div key={index} className={styles.habilidadeItem}>
                <span>{habilidade.nome}</span>
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
          {redeSociais.map((rede, index) => (
            <div key={index} className={styles.iconWrapper}>
              <img
                src={getSocialIcon(rede)}
                alt="Ícone da Rede Social"
                className={styles.socialIcon}
              />
              <input
                type="text"
                value={rede}
                onChange={(e) => handleRedeSociaisChange(index, e.target.value)}
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
            value={sobreMim}
            onChange={handleSobreMinChange}
            className={styles.inputSobreMin}
          />
          <p className={styles.charCount}>{sobreMim.length}/1000</p>
        </div>
        <div className={styles.buttons}>
          <button onClick={handleSave} className={styles.saveButton}>
            Salvar
          </button>
          <button onClick={handleDelete} className={styles.deleteButton}>
            Deletar
          </button>
        </div>
      </div>
      {showDeleteWarning && (
        <AvisoDeletar onConfirm={confirmDelete} onCancel={cancelDelete} />
      )}
    </div>
  );
};

export default EditarUsuario;
