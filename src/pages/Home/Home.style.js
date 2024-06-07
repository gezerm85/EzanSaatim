import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
    },
    title:{
        fontSize: 30,
        fontWeight: 'bold'
    },
    bodyContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    pickerSelect:{
        width: '60%',
        height: 50,
        backgroundColor: '#444db3',
        borderWidth:1,
        borderColor: '#fff',
        borderRadius: 10,
        justifyContent: 'center',
        color: '#fff'
    },
    countdownText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        
      },
      inputAndroid: {
        fontSize: 18,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: '#fff',  
        paddingRight: 30,
      },
      icon:{
        position: 'relative',
        top: 18,
        right: 15,
      },
      flatContainer:{
        paddingHorizontal: 25,
        marginBottom: 15,
      }

})
 