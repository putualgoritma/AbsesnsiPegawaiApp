import React from 'react';
import { Image,View,StyleSheet,Dimensions} from 'react-native';

const HeaderBeranda =(props)=>{
    return(
        <View style={styles.Container}>
            <Image source={require('../../assets/img/HeaderBeranda.png')}  style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height/100*34}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    Container:{
        alignItems:'center'
    },
});
export default HeaderBeranda