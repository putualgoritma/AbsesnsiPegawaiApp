import React from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
  } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
  const Button =(props)=>{
    return(
        <TouchableOpacity style={[{height : (props.height ? props.height : 50),width : (props.width ? props.width :'80%')  }, styles.buttonstyle]} onPress={props.onPress}>
            <View style={{flexDirection:'row',paddingVertical:3,justifyContent:'center', }}>    
                <View style={{justifyContent:'center'}}>
                    <Text style={[{fontSize : (props.text ? props.text :18)},styles.text]}>{props.title}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
  }
  const styles = StyleSheet.create({
    buttonstyle:{
        backgroundColor:'#0C5CBF', 
        // paddingVertical:10, 
        borderRadius:10,
        // paddingTop:10
        justifyContent:'center'
    },
    text:{
        color:'#FFFFFF', 
        fontWeight:'bold',
    }
 });
  export default Button