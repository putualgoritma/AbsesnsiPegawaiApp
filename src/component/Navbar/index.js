import { Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
// test

const Navbar = (props) => {
    const [data, setData] = useState([{'code' : 'RKN00001', 'contact_code' : 'CST00001', 'contact_name' : 'Sinta', 'balance' : '200.000'},
    {'code' : 'RKN00002', 'contact_code' : 'CST00002', 'contact_name' : 'Budi', 'balance' : '100.000'},
    {'code' : 'RKN00003', 'contact_code' : 'CST00002', 'contact_name' : 'Budi', 'balance' : '100.000'},
    {'code' : 'RKN00004', 'contact_code' : 'CST00002', 'contact_name' : 'Budi', 'balance' : '100.000'},
    {'code' : 'RKN00005', 'contact_code' : 'CST00002', 'contact_name' : 'Budi', 'balance' : '100.000'},
    {'code' : 'RKN00006', 'contact_code' : 'CST00002', 'contact_name' : 'Budi', 'balance' : '100.000'},
    {'code' : 'RKN00007', 'contact_code' : 'CST00002', 'contact_name' : 'Budi', 'balance' : '100.000'}


]);

const [dpdwn, setDpdwn] = useState(false);

useEffect(() => {
    // test
  });


    // const handleForm = (id) => {

    //  filter[id-1].name = 'budi'
    //  console.log(id)
    //  console.log( filter)
    //  console.log(1)
    // }
    

    function toRupiah(amount){
        const rupiah = Number(amount)
         .toFixed(2)
         .replace(/\d(?=(\d{3})+\.)/g, '$&.');
         return rupiah;
       }

  return (
    <View>


{props.FilterBar &&
<View>
<View style = {styles.row1}>

 <TouchableOpacity onPress={()=>{props.setFilterBar(false), props.setDpdwn(false),console.log(props.FilterBar)}}>
 <Icon name="search" size={24} color="#9B9B9B" />
 </TouchableOpacity>

 <Text> {[props.totalPage]} Pelanggan</Text>
 
{/* sementara */}
 <TouchableOpacity style ={{ marginLeft : 'auto' }} onPress={()=>{!props.dpdwn ? props.setDpdwn(true) : props.setDpdwn(false) , console.log(dpdwn)}}>

 <Icon name="sort" size={24} color="#9B9B9B" />

 
 </TouchableOpacity>

</View>
<TouchableOpacity style={{ backgroundColor : '#2675AD', borderRadius : 10, flexDirection : 'row', padding : 5, width : windowWidht*0.15, marginLeft : windowWidht*0.02, marginTop : windowHeight*0.01, alignItems : 'center', justifyContent : 'center' }} onPress={()=>{props.reset()}}>
    <Text style = {{ color : '#FFFFFF', marginRight :  windowWidht*0.01 }}>Reset</Text>
 </TouchableOpacity>



    </View>
}
{!props.FilterBar &&
<View>
<View style = {styles.row1}>
<TextInput 
 style={styles.search}
 autoFocus = {true}
/>



<View style={{ marginLeft : 'auto' }}>
<TouchableOpacity onPress={()=>{props.setFilterBar(true), console.log(props.FilterBar)}}>
 <Icon name="times" size={24} color="#9B9B9B" />
 </TouchableOpacity>
    </View>
    </View>



    <ScrollView horizontal={true} style = {styles.row2}>

    {props.filterStatus && props.filterStatus.map((item, index)=>{
        return <View  key = {item.id}>
        {!item.checked &&
            
            <TouchableOpacity style ={styles.icon} onPress={()=>{props.handleForm4(item.id)}} >
            <Text>{item.name}</Text>
                </TouchableOpacity>
               
        }
           {item.checked &&
            
            <TouchableOpacity style ={styles.iconActive} disabled ={true} >
            <Text style={{ color : '#FFFFFF' }}>{item.name}</Text>
                </TouchableOpacity>
               
        }
         </View>
      
    })

    }

</ScrollView>


    <ScrollView horizontal={true} style = {styles.row2}>

{props.filterPriority && props.filterPriority.map((item, index)=>{
    return <View  key = {item.id}>
    {!item.checked &&
        
        <TouchableOpacity style ={styles.icon} onPress={()=>{props.handleForm3(item.id)}} >
        <Text>{item.name}</Text>
            </TouchableOpacity>
           
    }
       {item.checked &&
        
        <TouchableOpacity style ={styles.iconActive} disabled ={true} >
        <Text style={{ color : '#FFFFFF' }}>{item.name}</Text>
            </TouchableOpacity>
           
    }
     </View>
  
})

}

</ScrollView>


    <ScrollView horizontal={true} style = {styles.row2}>

    {props.filter && props.filter.map((item, index)=>{
        return <View  key = {item.id}>
        {!item.checked &&
            
            <TouchableOpacity style ={styles.icon} onPress={()=>{props.handleForm(item.id)}} >
            <Text>{item.name}</Text>
                </TouchableOpacity>
               
        }
           {item.checked &&
            
            <TouchableOpacity style ={styles.iconActive} disabled ={true} >
            <Text style={{ color : '#FFFFFF' }}>{item.name}</Text>
                </TouchableOpacity>
               
        }
         </View>
      
    })

    }

</ScrollView>

<ScrollView horizontal={true} style = {styles.row2}>

{props.areas && props.areas.map((item, index)=>{
    return <View  key = {item.id}>
    {!item.checked &&
        
        <TouchableOpacity style ={styles.icon} onPress={()=>{props.handleForm2(item.id)}} >
        <Text>{item.code}</Text>
            </TouchableOpacity>
           
    }
       {item.checked &&
        
        <TouchableOpacity style ={styles.iconActive} disabled ={true} >
        <Text style={{ color : '#FFFFFF' }}>{item.code}</Text>
            </TouchableOpacity>
           
    }
     </View>
  
})

}

</ScrollView>

<View style = {styles.row3}>
<TouchableOpacity style={{ backgroundColor : '#2675AD', borderRadius : 10, flexDirection : 'row', padding : 5, width : windowWidht*0.2, marginLeft : 'auto', marginRight : windowWidht*0.02, marginTop : windowHeight*0.01 }} onPress={()=>{props.setFilterBar(true), props.handleSearch()}}>
    <Text style = {{ color : '#FFFFFF', marginRight :  windowWidht*0.01 }}>Filter</Text>
 <Icon name="search" size={24} color="#FFFFFF" />
 </TouchableOpacity>
</View>
</View>
}


    </View>
  )
}

export default Navbar


const windowWidht =Dimensions.get('window').width;
const windowHeight =Dimensions.get('window').height;
const styles = StyleSheet.create({
search : {
    width : windowWidht*0.74,
    height : windowHeight*0.046,
    marginRight: windowWidht*0.02,
    backgroundColor : '#FFFFFF',
    // borderBottomWidth : 1,

    // borderRadius : 5,
    

},
button : {
    width : windowWidht*0.24,
    height : windowHeight*0.06,
    marginLeft : windowWidht*0.05,
    backgroundColor : '#256CFC',
    flexDirection : 'row',
    borderRadius : 5,
    alignItems: 'center',
    justifyContent: 'center',
    
},
detailProfile : {
    width : windowWidht*0.91,
    backgroundColor : '#FFFFFF',
    paddingVertical : windowHeight*0.02,
    paddingHorizontal : windowWidht*0.02,
    marginLeft : 'auto',
    marginRight : 'auto',
    marginVertical : windowHeight*0.01,
    elevation: 5,
    // borderRadius : 10,
    
},
rowProfile : {
    borderBottomWidth : 1,
    width : windowWidht*0.912,
    marginBottom : windowHeight*0.02,
    marginLeft : -windowWidht*0.02,
    borderColor : '#00000030'
},
rowProfile2 : {
    borderTopWidth : 1,
    marginTop : windowHeight*0.02,
    width : windowWidht*0.912,
    paddingHorizontal : windowWidht*0.02,
    marginLeft : -windowWidht*0.02,
    borderColor : '#00000030'
},
row1 : {
    height : windowHeight*0.06,
    paddingHorizontal : windowWidht*0.03,
    paddingVertical : windowHeight*0.01,
    borderBottomWidth : 1,
    borderColor : '#00000040',
    flexDirection : 'row',
    
},
row2 : {
    // width : windowWidht*0.9,
    height : windowHeight*0.06,
    // paddingHorizontal : windowWidht*0.03,
    paddingVertical : windowHeight*0.01,
    borderBottomWidth : 1,
    borderColor : '#00000040',
    flexDirection : 'row',
    
},
row3 : {
    paddingHorizontal : windowWidht*0.03,
    paddingTop : windowHeight*0.01,
    // borderBottomWidth : 1,
    // borderColor : '#00000040',
    flexDirection : 'row',
    
},
colL : {
    width : windowWidht*0.41,
    color : '#000000',
    
},
colC : {
    width : windowWidht*0.01,
    color : '#000000',
    
},
colR : {
    width : windowWidht*0.43,
    color : '#000000',
textAlign : 'right',

},
btnProfile : {
    marginTop : windowHeight*0.01,
    width : windowWidht*0.2,
    marginLeft : windowWidht*0.01,
    height : windowHeight*0.04,
    borderRadius : 5,
    alignItems : 'center',
    
},
icon : {
height : windowHeight*0.032,
backgroundColor : '#D9D9D9',
paddingHorizontal : windowHeight*0.01,
marginHorizontal : windowWidht*0.01,
marginBottom : 'auto',
marginTop : 'auto',
borderRadius : 10,

},
iconActive : {
    height : windowHeight*0.032,
    backgroundColor : '#A8E4E1',
    paddingHorizontal : windowHeight*0.01,
    marginBottom : 'auto',
    marginTop : 'auto',
    borderRadius : 10,
    
    },
dropdown:{
    position: 'absolute',
    marginLeft :  windowWidht*0.68,
    backgroundColor : '#FFFFFF',
    marginTop : windowHeight*0.05,
    width : windowWidht*0.3,
    padding : windowWidht*0.02,
    zIndex: 100,
    elevation: 5,
  }
})