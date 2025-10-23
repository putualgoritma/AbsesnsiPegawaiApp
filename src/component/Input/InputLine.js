import * as React from 'react';
import {
    TextInput,
    StyleSheet,
  } from 'react-native';
const InputLine =(props)=>{
    return(
            <TextInput style={styles.input} placeholder={props.placeholder} placeholderTextColor='#c7c7c7' value={props.value} editable = {props.editable}/>
    )
}
const styles = StyleSheet.create({
    input:{
      width:'80%',
      backgroundColor:'#ffffff',
      paddingHorizontal:20,
      borderColor:'#087CDB',
      borderBottomWidth:1,
      color:'black'
    },
});
export default InputLine;