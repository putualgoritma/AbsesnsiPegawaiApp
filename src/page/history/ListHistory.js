import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const ListHistory = ({navigation, route}) => {
  console.log(route.params);
  return (
    <View>
      <Text
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          color: '#000000',
          marginBottom: windowHeight * 0.01,
          marginBottom: windowHeight * 0.02,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
        List Histori
      </Text>
      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#443cf4'}]}
        onPress={() => {
          navigation.navigate('History', {
            start: null,
            end: null,
            type: route.params.type,
          });
        }}>
        <Text style={styles.btnText}>Histori Absen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#fc4414'}]}
        onPress={() => {
          navigation.navigate('HistoryRequest');
        }}>
        <Text style={styles.btnText}>Histori Pengajuan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#e6bc15'}]}
        onPress={() => {
          navigation.navigate('HistoryExtra');
        }}>
        <Text style={styles.btnText}>Histori Lembur</Text>
      </TouchableOpacity>

      {route.params.type == 'shift' && (
        <TouchableOpacity
          style={[styles.listMenu, {backgroundColor: '#09aeae'}]}
          onPress={() => {
            navigation.navigate('changeShiftProposal');
          }}>
          <Text style={styles.btnText}>List Pengajuan Pertukaran Shift</Text>
        </TouchableOpacity>
      )}
      {route.params.type == 'shift' && (
        <TouchableOpacity
          style={[styles.listMenu, {backgroundColor: '#1fae51'}]}
          onPress={() => {
            navigation.navigate('changeShift');
          }}>
          <Text style={styles.btnText}>List Pesetujuan Pertukaran Shift</Text>
        </TouchableOpacity>
      )}

      {/* <TouchableOpacity style={[styles.listMenu,{backgroundColor: '#ffa500'}]} onPress={()=>{navigation.navigate('HistoryCShift')}}>
       <Text style={styles.btnText}>
         Histori Shift
       </Text>
     </TouchableOpacity> */}
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
  );
};

export default ListHistory;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  listMenu: {
    marginVertical: windowHeight * 0.01,
    width: windowWidht * 0.8,
    height: windowHeight * 0.044,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00000030',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});