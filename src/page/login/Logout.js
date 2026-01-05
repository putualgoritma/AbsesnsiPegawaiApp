import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../../service';
import ScreenLoading from '../loading/ScreenLoading';
import { Alert, PermissionsAndroid, ScrollView, StyleSheet, View, Image, Text,Dimensions, TouchableOpacity, useColorScheme } from 'react-native';

const Logout = ({navigation}) => {
  const TOKEN = useSelector((state) => state.TokenReducer);
      const USER = useSelector ((state) => state.UserReducer);
      const scheme = useColorScheme();
  const [loading, setLoading] = useState(false)
  const logout = () => {
      setLoading(true)
      API.logout(TOKEN).then((result) => {
        if(result.success){
          AsyncStorage.clear()
      setTimeout(function () {
          // setLoading(false)
          navigation.navigate("Login")
      }, 2000); 
        }else{
            alert(result.message)
            setLoading(false)
        }
    });
      
  }
  useEffect(()=>
  {
    // logout();
  }
  )
  return (
    <View>
      {loading &&
            <ScreenLoading/>
      }
{!loading &&
<View>
  <Text style={{ marginTop : Dimensions.get('window').height*0.3, textAlign : 'center', fontSize : 30, color: scheme === 'dark' ? '#000000' : '#000000' }}>Yakin Melakukan Logout</Text>
  <View style={{ flexDirection : "row" }}>
<TouchableOpacity style={styles.buttonY} onPress={()=> logout()}>
   <Text style={[styles.label2white, {color: scheme === 'dark' ? '#000000' : '#000000'}]}>Ya</Text>
 </TouchableOpacity>
 <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Home')}>
   <Text style={[styles.label2white,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>Tidak</Text>
 </TouchableOpacity>
</View>
</View>
}
      
    </View>
  )
}

export default Logout

const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;

const styles = StyleSheet.create({

  label2white :{
    color:'#FFFFFF',
    fontSize: 20,
  },
  buttonY:{
    marginHorizontal : windowWidht*0.05,
    width: windowWidht*0.4,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'red',
    alignItems : "center",
  },

  button:{
    marginHorizontal : windowWidht*0.05,
    width: windowWidht*0.4,
    borderRadius : 3,
    // borderWidth : 1,
    // borderColor : "red",
    height : windowHeight*0.05,
    backgroundColor:'#1DA0E0',
    alignItems : "center",
  },
})