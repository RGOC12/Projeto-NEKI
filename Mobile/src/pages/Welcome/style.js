import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    
    container:{
        flex : 1,
        backgroundColor : '#87CEFA'
    },
    
    containerLogo : {
        flex : 2,
        justifyContent : 'center',
        alignItems : 'center'

    },
    containerTexto : {
        flex : 1,
        backgroundColor : '#50abe4',
        borderTopLeftRadius : 25,
        borderTopRightRadius : 25,
        paddingStart : '5%',
        paddingEnd : '5%',
    },

    titulo : {
        fontSize : 24,
        fontWeight : 'bold',
        marginTop : 28,
        marginBottom:12
    },
    texto : {
        color : '#c1c1c1'
    },
    botao : {
        position : 'absolute',
        backgroundColor : '#c1c1c1',
        borderRadius : 50,
        paddingVertical : 8,
        width : '60%',
        alignSelf : 'center',
        bottom : '15%',
        alignItems : 'center',
        justifyContent : 'center'
    },

    textoBotao : {
        fontSize : 18,
        fontWeight : 'bold',
    }
})