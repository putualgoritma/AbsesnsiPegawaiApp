import React from 'react'
import {TouchableOpacity,View} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {colors} from '../../utils/colors'
import Distance from '../../utils/distance'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

const IconEdit =(props)=>{
    return(
        <View style={{width:'80%'}}>
            <Distance distanceV={1}/>
            <TouchableOpacity style={{backgroundColor:colors.primary, height:30, borderRadius:5,justifyContent:'center',alignItems:'center'}} onPress={props.onPress}>
                <FontAwesomeIcon icon={faPencilAlt} style={{color:'#FFFFFF', paddingVertical:5}} size={ 16 } />
            </TouchableOpacity>
            <Distance distanceV={1}/>
        </View>
    )
}
export default IconEdit