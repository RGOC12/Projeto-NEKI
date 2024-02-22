import { View, Text, Image, TouchableHighlight} from 'react-native'
import React from 'react'
import {styles} from "./style"
import * as Animatable from 'react-native-animatable'
import {useNavigation} from '@react-navigation/native'

export default function Welcome() {
    const navigation = useNavigation();
  return (
    <View style = {styles.container}>
      <View style = {styles.containerLogo}>
        <Animatable.Image
            animation = "flipInY"
            source={require("../../assets/neki-fundo-branco-1256x403-removebg-preview.png")}
            style = {{width : '100%'}}
            resizeMode='contain'
        />
      </View>
      <Animatable.View delay={600} animation = "fadeInUp" style = {styles.containerTexto}>
        <Text style = {styles.titulo}>Cuide e monitore as suas habilidades com carinho.</Text>
        <Text style = {styles.texto}>Comece já!</Text>
        <TouchableHighlight style = {styles.botao} onPress={() => navigation.navigate("Signin")}>
            <Text style = {styles.textoBotao}>Acessar</Text>
        </TouchableHighlight>
      </Animatable.View>
    </View>
  )
}