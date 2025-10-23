import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
  } from 'react-native';
  import Footer from '../../assets/img/footer1.svg'
  const Footer1=(props)=>{
    return(
        <View style={styles.Container}>
           <Footer height={290} width={'100%'}/>
        </View>
    )
  }
const styles = StyleSheet.create({
    Container:{
        alignItems:'center',
        backgroundColor:'black'
    },
});
  export default Footer1