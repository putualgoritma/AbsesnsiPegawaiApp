import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import API from '../../service'
import { useSelector } from 'react-redux'
import ScreenLoading from '../loading/ScreenLoading'

const NowLoading = ({navigation}) => {

  const TOKEN = useSelector((state) => state.TokenReducer);
  const USER = useSelector((state) => state.UserReducer);
  const USER_ID = useSelector((state) => state.UserReducer.id);
    const [data, setData] = useState([])
    const [cek, setCek] = useState('')




  const getMenu = () => 
    {
        // API.menu(USER_ID).then((result) => {
        //   if(result){
        //     console.log(result.month1)

            // navigation.replace('Home', {duty : result.duty, extra : result.extra, permit : result.permit, monthN1 : result.month1, monthN2 : result.month2, monthN3 : result.month3})
          // }
          //   else{
          //     alert(result.message);
          //     setLoading(false)
          // }
          // });

          navigation.replace('Home', {duty : [], extra : [], permit : [], monthN1 : [], monthN2 : [], monthN3 : []})
                  
            
              
      }
  


    useEffect(()=> {

getMenu()


},[]);

  return (
    <View>
     <ScreenLoading/>
    </View>
  )
}

export default NowLoading

const styles = StyleSheet.create({})