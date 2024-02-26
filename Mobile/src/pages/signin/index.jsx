import { View, Text, TextInput,  TouchableHighlight} from 'react-native'
import {styles} from './style'
import * as Animatable from 'react-native-animatable'
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Biblioteca para fazer chamadas à API
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Signin() {
    
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
                onChangeText={()=>{} }
            />
            <Text style = {styles.titulo}>Senha:</Text>
            <TextInput
                style = {styles.input}
                placeholder='Digite sua senha'
                onChangeText={()=>{} }
            />

            <TouchableHighlight style={styles.botaoLogar} >
                <Text style={styles.textoLogar}>Acessar</Text>
            </TouchableHighlight>

            <TouchableHighlight style = {styles.botaoCadastro}>
                <Text style = {styles.textoCadastro}>Cadastre-se agora</Text>
        

            </TouchableHighlight>
        </Animatable.View>
    </View>
  )
}