import * as React from 'react';
import {
   Text,
   View,
   StyleSheet
  } from 'react-native';
const TextInput =(props)=>{
    return(
        <View style={[styles.section,{width:props.width ? props.width:'80%'}]}>
            <View style={{flex:1}}>
                <Text style={[styles.textinput,{fontWeight:props.fontWeight ? props.fontWeight:null}]}>{props.title}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    textinput:{
        color:'#696969',
        fontSize:16,
        paddingVertical:10,
    },
    section:{
        flexDirection:'row', 
        justifyContent:'center', 
    }
});    
export default TextInput;