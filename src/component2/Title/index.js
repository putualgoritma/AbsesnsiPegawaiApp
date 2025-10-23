import * as React from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity
  } from 'react-native';
const Title =(props)=>{
    return(
        <View style={{flexDirection:'row',width:props.width ? props.width:'80%', paddingVertical:15}}>
            <Text style={styles.title}>{props.title}</Text>
        </View>   
    )
}
const styles = StyleSheet.create({
    title:{
        color:'#1186E0', 
        fontSize:25, 
        fontWeight:'bold',
    },
});
export default Title;