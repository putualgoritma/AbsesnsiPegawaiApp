import React from 'react';
import {
    Text,
    StyleSheet,
    TouchableOpacity,
  } from 'react-native';
  import IconOut from '../../assets/icon/iconOut.svg'
  const Out =(props)=>{
      return(
        <TouchableOpacity style={styles.section} onPress={props.onPress}>
            <IconOut/>
            <Text style={styles.text}>{props.title}</Text>
        </TouchableOpacity>
      )
  }
const styles = StyleSheet.create({
  section:{
    flexDirection:'row',
    justifyContent:'flex-end',
    paddingVertical:10,
    width:'80%',
    },
   text:{
    padding:5,
    fontSize:15, 
    fontWeight:'bold'   
   }
});
  export default Out