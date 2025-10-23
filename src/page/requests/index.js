import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import myFunctions from '../../functions';

const Requests = ({navigation, route}) => {
  useEffect(() => {
    // if(isFocused){
    console.log('test');
    myFunctions.permissionCamera();
    //    }
  }, []);

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
        List Permohonan
      </Text>
      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#fc4414'}]}
        onPress={() => {
          navigation.navigate('RPermit');
        }}>
        <Text style={styles.btnText}>Permisi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#443cf4'}]}
        onPress={() => {
          navigation.navigate('RDuty');
        }}>
        <Text style={styles.btnText}>Dinas Dalam Kota</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#5cdb5c'}]}
        onPress={() => {
          navigation.navigate('RDutyOut');
        }}>
        <Text style={styles.btnText}>Dinas Luar Kota</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#e6bc15'}]}
        onPress={() => {
          navigation.navigate('Permission');
        }}>
        <Text style={styles.btnText}>Izin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#ffa500'}]}
        onPress={() => {
          navigation.navigate('ROvertime');
        }}>
        <Text style={styles.btnText}>Lembur</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#8cdcf0'}]}
        onPress={() => {
          navigation.navigate('Leave');
        }}>
        <Text style={styles.btnText}>Cuti</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#4169E1'}]}
        onPress={() => {
          navigation.navigate('AbsenceOut');
        }}>
        <Text style={styles.btnText}>Absen Diluar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#4169E170'}]}
        onPress={() => {
          navigation.navigate('AdditionalTime');
        }}>
        <Text style={styles.btnText}>Additional Time</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#e6bc15'}]}
        onPress={() => {
          navigation.navigate('Forget');
        }}>
        <Text style={styles.btnText}>Lupa Absen</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#443cf4'}]}
        onPress={() => {
          navigation.navigate('Location');
        }}>
        <Text style={styles.btnText}>Titik Lokasi Absen</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.listMenu, {backgroundColor: '#a8bc15'}]}
        onPress={() => {
          navigation.navigate('Dispense');
        }}>
        <Text style={styles.btnText}>Dispensasi</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Requests;

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
