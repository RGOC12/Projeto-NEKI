import { View, Text, TextInput,  TouchableHighlight} from 'react-native'
import {styles} from './style'
import * as Animatable from 'react-native-animatable'
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Biblioteca para fazer chamadas à API
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Signin() {
    
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    
    console.log( login);
    const handleLogin = async () => {
        try {
          const response = await axios.post('http://localhost:8080/auth/login', {
            login,
            password,
          });
      
          console.log('Resposta da API:', response.data);
      
          if (response.data.success) {
            setToken(response.data.token);
            await AsyncStorage.setItem('token', response.data.token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            // Redirecionar para a tela principal ou exibir mensagem de sucesso
          } else {
            console.error('Login inválido');
          }
        } catch (error) {
          // Exibir mensagem de erro
          console.error('Erro ao fazer a requisição de login:', error);
      
          // Adicione logs específicos para verificar se há uma resposta do servidor
          if (error.response) {
            console.error('Resposta do servidor:', error.response.data);
            console.error('Status do servidor:', error.response.status);
          } else if (error.request) {
            console.error('Sem resposta do servidor');
          } else {
            console.error('Erro ao configurar a solicitação:', error.message);
          }
        }
      };
    
        useEffect(() => {
            // Recuperar o token do AsyncStorage durante a inicialização
            AsyncStorage.getItem('token')
                .then(token => setToken(token))
                .catch(error => console.error(error));
        }, []);
        
        return (
    <View style = {styles.container}>
        <Animatable.View delay={500} animation = "fadeInLeft" style = {styles.containerHeader}>
            <Text style = {styles.menssagem}>Bem-vindo(a)</Text>
        </Animatable.View>

        <Animatable.View animation="fadeInUp" style = {styles.containerForm}>
            <Text style = {styles.titulo}>Login:</Text>
            <TextInput
                style = {styles.input}
                placeholder = 'Digite seu login'
                onChangeText={(Text) => setLogin(Text)}
            />
            <Text style = {styles.titulo}>Senha:</Text>
            <TextInput
                style = {styles.input}
                placeholder='Digite sua senha'
                onChangeText={(Text) => setPassword(Text)}
            />

            <TouchableHighlight style={styles.botaoLogar} onPress={handleLogin}>
                <Text style={styles.textoLogar}>Acessar</Text>
            </TouchableHighlight>

            <TouchableHighlight style = {styles.botaoCadastro}>
                <Text style = {styles.textoCadastro}>Cadastre-se agora</Text>
        

            </TouchableHighlight>
        </Animatable.View>
    </View>
  )
}