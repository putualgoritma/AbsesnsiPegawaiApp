import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const Test1 = ({navigation}) => {
  return (
    <View style={{ flex : 1 }}>
      <Text></Text>

      <TouchableOpacity onPress={()=>{navigation.navigate('Home')}}>
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Test1