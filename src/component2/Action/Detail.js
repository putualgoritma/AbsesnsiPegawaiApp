import { faFile } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React from 'react'
import { TouchableOpacity, View,Text } from 'react-native'
import { colors } from '../../utils/colors'
import Distance from '../../utils/distance'

const IconDetail =(props)=>{
    return(
        <View>
            <Distance distanceV={1}/>
                <TouchableOpacity onPress={props.onPress}>
                    <View style={{backgroundColor:colors.primary,width:40, height:40, borderRadius:50,justifyContent:'center',alignItems:'center'}} >
                        <FontAwesomeIcon icon={faFile} style={{color:'#FFFFFF', paddingVertical:5}} size={ 16 } />   
                    </View>
                    <Text>Detail</Text>
                </TouchableOpacity>
            <Distance distanceV={1}/>
        </View>
    )
}
export default IconDetail