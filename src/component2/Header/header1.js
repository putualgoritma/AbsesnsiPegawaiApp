import React from 'react';
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
  } from 'react-native';
  import Header from '../../assets/img/header1.svg'
  const header1=(props)=>{
    return(
        <View style={styles.Container}>
           {/* <Header height={Dimensions.get('window').height*(18/100)} width={'100%'}/> */}
            {/* <Image source={require('../../assets/img/header1.png')} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height*(15/100)}} /> */}
            <Image source={require('../../assets/img/header1.png')} style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height/100*19,top:0}}/>
        </View>
    )
  }
const styles = StyleSheet.create({
    Container:{
        alignItems:'center',
    },
});
  export default header1