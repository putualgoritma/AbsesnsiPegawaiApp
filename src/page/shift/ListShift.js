import { TouchableOpacity, Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ListShift = ({navigation, route}) => {
  console.log(route.params)
  return (
    <View>
             <Text style = {{ fontSize : 24, fontWeight : 'bold', color : '#000000', marginBottom : windowHeight*0.01, marginBottom : windowHeight*0.02, marginLeft : 'auto', marginRight : 'auto' }}>
        List Shift
        </Text>
       <TouchableOpacity style={[styles.listMenu,{backgroundColor: '#443cf4'}]} onPress={()=>{navigation.navigate('AbsenceLoading')}}>
       <Text style={styles.btnText}>
            Jadwal Shift
       </Text>
     </TouchableOpacity>

     <TouchableOpacity style={[styles.listMenu,{backgroundColor: '#443cf4'}]} onPress={()=>{navigation.navigate('AbsenceLoading')}}>
       <Text style={styles.btnText}>
         Tukar Shift
       </Text>
     </TouchableOpacity>
{/* 
{route.params.duty != null && route.params.duty.type == "duty_out" &&
       <TouchableOpacity style={[styles.listMenu,{backgroundColor: '#443cf4'}]} onPress={()=>{navigation.navigate('DutyOut',{title : "Dinas Keluar", data : route.params.duty})}}>
       <Text style={styles.btnText}>
         Dinas
       </Text>
     </TouchableOpacity>
        }
           {route.params.permit != null &&
       <TouchableOpacity style={[styles.listMenu,{backgroundColor: '#fc4414'}]} onPress={()=>{navigation.navigate('Permit',{title : "Permisi", data : route.params.permit})}}>
       <Text style={styles.btnText}>
         Permisi
       </Text>
     </TouchableOpacity>
        }
 
 {route.params.extra != null &&
       <TouchableOpacity style={[styles.listMenu,{backgroundColor: '#ffa500'}]} onPress={()=>{navigation.navigate('Overtime',{title : "Lembur", data : route.params.extra})}}>
       <Text style={styles.btnText}>
        Lembur
       </Text>
     </TouchableOpacity>
        } */}
    </View>
  )
}

export default ListShift

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  listMenu: {
    marginVertical: windowHeight * 0.01,
    width: windowWidht * 0.8,
    height: windowHeight * 0.044,
    borderWidth: 1,
    borderRadius: 2,
    borderColor : '#00000030' ,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
  }
})