import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../assets/Logo-Neki.png';
import Footer from '../../components/Footer';
import axios from 'axios';

export default function Login() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [lembrarSenha, setLembrarSenha] = useState(false); // Novo estado para lembrar a senha
  const [mensagemErro, setMensagemErro] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (login === '' || password === '') {
      setMensagemErro('Preencha todos os campos');
      return;
    }

    // Defina a variável headers antes da requisição:
    const headers = {
      'Content-Type': 'application/json',
    };

    console.log('Enviando dados de login:', login, password);
    console.log('Headers da requisição:', headers);
    console.log('Corpo da requisição:', JSON.stringify({ login, password }));

    try {
      console.log('entrou no try');
      const response = await axios.post(
        'http://localhost:8080/auth/login',
        { login, password },
        { headers }
      );

      console.log('Status da resposta:', response.status);

      if (response.status === 200) {
        const data = response.data;

        if (data.token) {
          console.log(data.token)
          setMensagemErro('');
          console.log('Login efetuado com sucesso!');
          localStorage.setItem('token', data.token);
          if (lembrarSenha) {
            localStorage.setItem('login', login);
            localStorage.setItem('password', password);
          }
          navigate('/home');
        } else {
          setMensagemErro('Login ou senha inválidos');
        }
      } else {
        throw new Error('Erro na requisição');
      }
    } catch (error) {
      console.error('Erro na requisição:', error.message);
      setMensagemErro('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    }

    // Limpa a senha se a opção "Lembrar Senha" não estiver marcada
    if (!lembrarSenha) {
      setPassword('');
    }
  };

  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleLembrarSenhaChange = () => {
    setLembrarSenha(!lembrarSenha);

    if (lembrarSenha) {
      localStorage.removeItem('login');
      localStorage.removeItem('password');
      setLogin('');
      setPassword('');
    }

  };

  useEffect(() => {
    const loginStorage = localStorage.getItem('login');
    const passwordStorage = localStorage.getItem('password');

    if (loginStorage && passwordStorage) {
      setLogin(loginStorage);
      setPassword(passwordStorage);
      setLembrarSenha(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
    setLogin(''); // Limpa o campo de login
    setPassword(''); // Limpa o campo de senha
  };

  return (
    <div>
      <img src={Logo} alt="Logotipo" className="Logotipo" />
      <div className="wrapper">
        <form onSubmit={handleLogin}>
          {mensagemErro && <div className="mensagem-erro">{mensagemErro}</div>}
          <h1>Login</h1>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              className="entrada"
              type="text"
              placeholder="Login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="input-box">
            {mostrarSenha ? (
              <FaEyeSlash className="icon" onClick={toggleMostrarSenha} />
            ) : (
              <FaEye className="icon" onClick={toggleMostrarSenha} />
            )}
            <input
              className="entrada"
              type={mostrarSenha ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="remember-forgot">
            <label>
              <input
                className="gravar"
                type="checkbox"
                checked={lembrarSenha}
                onChange={handleLembrarSenhaChange}
              />
              Gravar Senha
            </label>
          </div>
          <button className="entrar" type="submit">
            Entrar
          </button>
          <div className="register-link">
            <p>
              Ainda não tem cadastro? <a href="/cadastro">Cadastre-se aqui</a>
            </p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
