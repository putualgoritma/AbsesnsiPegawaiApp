import React from 'react'
import {View} from 'react-native'
import {faImages} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const ImageFoto = ()=>{
    return(
        <View style={{width:'90%', height:150, borderColor:'#087CDB', borderWidth:1}}>
            <View style={{alignItems:'center', justifyContent:'center', height:150}}>
                <FontAwesomeIcon icon={faImages} style={{color:'#0C5CBF'}} size={ 60 }/>
            </View>
        </View>
    )
}
export default ImageFoto
