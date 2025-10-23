import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  const ButtonIcon =(props)=>{
    return(
        <TouchableOpacity style={{
            backgroundColor:props.backgroundColor ?props.backgroundColor:'#0C5CBF', 
            width:props.width, 
            height:50,
            paddingVertical:8, 
            borderRadius:10,}} 
            onPress={props.onPress}>
            <View style={{flexDirection:'row',paddingVertical:3,justifyContent:'center'}}>    
                <View style={{paddingRight:10}}>
                    <FontAwesomeIcon icon={props.icon} style={{color:'#FFFFFF'}} size={ 27 } />
                </View>
                <View style={{justifyContent:'center'}}>
                    <Text style={styles.text}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }
  const styles = StyleSheet.create({
    text:{
        color:'#FFFFFF', 
        fontWeight:'bold',
        fontSize:18
    }
 });
  export default ButtonIcon