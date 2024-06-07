import { StyleSheet } from "react-native";



export default StyleSheet.create({
    container:{
    },
    innerContainer:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#444db3',
        marginVertical: 5,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        borderRadius: 15,

    },
        titleHour:{
        fontWeight: 'bold',
        fontSize: 17,
        color: '#f5f4f4'
    },
    titleTime:{
        fontWeight: 'semibold',
        color: '#f4f4f4'
    },

})