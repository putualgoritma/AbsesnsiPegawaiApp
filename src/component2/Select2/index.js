import React from 'react'
import { Text } from 'react-native'
import Select2 from "react-native-select-two"
const Select=({...rest})=>{
    return(
        <Select2
            // searchPlaceHolderText={props.searchPlaceHolderText}
            // title={props.title}
            isSelectSingle
            style={{
                    borderRadius: 10,
                    borderColor: '#087CDB',
                    borderWidth: 1,
                    height:50
            }}
            buttonStyle={{ 
                    backgroundColor:'#0C5CBF',
                    height:45,
                    borderRadius:5
            }}
            buttonTextStyle={{
                    color:'#FFFFFF'                                        
            }}
            selectedTitleStyle={{
                    color:'#c4c4c4'
            }}
            colorTheme={'#0C5CBF'}
            // popupTitle={props.popupTitle}
            // data={props.data}
            // onSelect={props.onSelect}
            // onRemoveItem={props.onRemoveItem} 
            selectButtonText ='Simpan'
            cancelButtonText='Batal'
            {...rest}
        />
    
    )
    
}
export default Select