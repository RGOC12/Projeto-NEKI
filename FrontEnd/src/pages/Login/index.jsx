import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './login.css';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Logo from '../../assets/Logo-Neki.png';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mensagemErro, setMensagemErro] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === '' || senha === '') {
        setMensagemErro('Preencha todos os campos');
        return;
    }

    try {
        const response = await axios.post('http://localhost:8080/auth/login', {
            email,
            senha
        });

        if (response.data.token) {
            setMensagemErro('');
            console.log('Login efetuado com sucesso!');
            // Armazene o token no localStorage ou em um contexto
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
        } else {
            setMensagemErro('Email ou senha inválidos');
        }
    } catch (error) {
        console.error(error);
        setMensagemErro('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    }
};
  const toggleMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div>
      <Header />
      <img src={Logo} alt="Logotipo" className="Logotipo" />
      <div className='wrapper'>
        <form onSubmit={handleLogin}>
          {mensagemErro && <div className="mensagem-erro">{mensagemErro}</div>}
          <h1>Login</h1>
          <div className="input-box">
            <input className="entrada" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input className="entrada" type={mostrarSenha ? 'text' : 'password'} placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} required />
            {mostrarSenha ? <FaEyeSlash className="icon" onClick={toggleMostrarSenha} /> : <FaEye className="icon" onClick={toggleMostrarSenha} />}
          </div>
          <div className="remember-forgot">
            <label><input className="gravar" type="checkbox" />Gravar Senha</label>
          </div>
          <button className="entrar" type="submit">Entrar</button>
          <div className="register-link">
            <p>Ainda não tem cadastro? <a href="/cadastro">Cadastre-se aqui</a></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}