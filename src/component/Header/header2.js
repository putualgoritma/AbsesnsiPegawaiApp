import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image
  } from 'react-native';
  import Header from '../../assets/img/header2.svg'
  const header2=(props)=>{
    return(
         <View style={styles.Container}>
            <Image source={require('../../assets/img/header2.png')}  style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height/100*19, top:0}}/>
        </View>
        // <View style={styles.Container}>
        //    <Header height={102} width={'100%'}/>
        // </View>

    )
  }
const styles = StyleSheet.create({
  Container:{
    alignItems:'center'
  },
});
  export default header2