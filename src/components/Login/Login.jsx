import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import styles from './Login.module.css';
import Logo from "../../assets/Logo.png";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cookies, setCookie] = useCookies(['userId']);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3001/usuarios?email=${email}`);
      const data = await response.json();

      if (data.length > 0) {
        const loggedInUser = data[0];

        if (loggedInUser.senha === password) {
          setError('');
          setCookie('userId', loggedInUser.id, { path: '/', maxAge: 86400 }); 
          navigate('/HomelogadoPage');
        } else {
          setError('Senha incorreta.');
        }
      } else {
        setError('Email ou senha incorretos.');
      }
    } catch (error) {
      setError('Erro ao tentar realizar o login.');
    }
  };

  return (
    <div className={styles.containerLogin}>
      <form onSubmit={handleLogin}>
        <img src={Logo} alt="Logo_IndieStream" className={styles.logo} />
        <h2 className={styles.h2}>Entre em sua conta</h2>

        <div className={styles.grupoInput}>
          <label htmlFor="email">Nome de usuário</label>
          <input 
            type="email" 
            id="email" 
            placeholder="Insira seu email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className={error ? `${styles.input} ${styles.inputErro}` : styles.input}
          />
        </div>

        <div className={styles.grupoInput}>
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Insira sua senha" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className={error ? `${styles.input} ${styles.inputErro}` : styles.input}
          />
        </div>

        <a href="/EsqueceuSenha" className={styles.linkEsqueciSenha}>Esqueceu sua senha?</a>
        
        <button type="submit" className={styles.botao}>Login</button>

        <p className={styles.text}>Não possui conta? <a href="/PaginadeCadastro" className={styles.link}>Cadastre-se</a></p>
      </form>
    </div>
  );
}

export default Login;






