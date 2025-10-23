import * as React from 'react';
import {Dimensions,Text, View, StyleSheet,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'



const Footer = (props) => {
    return (
        <View style={{ backgroundColor : "#FFFFFF", height : windowHeight*0.1, marginTop : 'auto', borderTopWidth : 1, borderColor : '#00000050',}}>
  <View style={{ flexDirection : 'row', marginTop : 'auto', marginBottom : 'auto' }}>
<TouchableOpacity onPress={()=>props.navigation.navigate('Home', {screen : 'Home'})} style = {styles.navMenu} disabled={props.focus == "Home"?true:false}>
<Icon name="home" size={30} color={props.focus == "Home"?'#256CFC':'#DCDCDC'} />
  <Text>Absen</Text>
</TouchableOpacity>

<TouchableOpacity onPress={()=>props.navigation.navigate('User', {screen : 'User'})} style = {[styles.navMenu,{  marginLeft : 'auto',}]} disabled={props.focus == "User"?true:false}>
<Icon name="user" size={30} color={props.focus == "User"?'#256CFC':'#DCDCDC'} />
  <Text>User</Text>
</TouchableOpacity>


</View>
</View>
    )
}
const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;
const styles = StyleSheet.create({
    navMenu : {

        alignItems : 'center',
        marginHorizontal : windowWidht*0.1,
      
      }
});
export default Footer