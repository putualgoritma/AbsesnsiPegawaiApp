import React from 'react'
import {TouchableOpacity,View} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import {colors} from '../../utils/colors'
import Distance from '../../utils/distance'

const IconDelete =(props)=>{
    return(
        <View style={{width:'80%'}}>
            <Distance distanceV={1}/>
            <TouchableOpacity style={{backgroundColor:colors.danger, height:30, borderRadius:5,justifyContent:'center',alignItems:'center'}} onPress={props.onPress}>
                <FontAwesomeIcon icon={faTrashAlt} style={{color:'#FFFFFF', paddingVertical:5}} size={ 16 } />
            </TouchableOpacity>
            <Distance distanceV={1}/>
        </View>
    )
}
export default IconDelete