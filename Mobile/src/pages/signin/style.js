import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    
    container:{
        flex : 1,
        backgroundColor : '#87CEFA'
    },
    
    containerHeader:{
        marginTop:'14%',
        marginBottom:'8%',
        paddingStart : '5%'
    },

    menssagem : {
        fontSize : 28,
        fontWeight : 'bold',
    },

    containerForm : {
        flex : 1,
        backgroundColor : '#50abe4',
        borderTopLeftRadius : 25,
        borderTopRightRadius : 25,
        paddingStart : '5%',
        paddingEnd : '5%'
    },

    titulo : {
        fontSize : 20,
        marginTop : 28
    },

    input : {
        borderBottomWidth : 1,
        height : 40,
        marginBottom : 12,
        fontSize : 16
    },

    botaoLogar : {
        backgroundColor : '#c1c1c1',
        borderRadius : 4,
        paddingVertical : 8,
        width : '100%',
        marginTop : 14,
        alignItems : 'center',
        justifyContent : 'center'
    },

    textoLogar : {
        fontSize : 18,
        fontWeight : 'bold'
    },

    botaoCadastro : {
        marginTop : 14,
        alignSelf : 'center',
    },
    textoCadastro : {
        color : '#add8e6'
    }
})