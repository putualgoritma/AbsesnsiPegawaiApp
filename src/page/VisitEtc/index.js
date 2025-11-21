import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Label from '../../Components/Title/Label';
import TextInpt from '../../Components/Input/TextInpt';
import MultypleImage from '../../Components/Input/MultypleImage';
import { ScrollView } from 'react-native-gesture-handler';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ButtonCstm from '../../Components/Button/ButtonCstm';
import API from '../../service';
import TextAreaInpt from '../../Components/Input/TextAreaInpt';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Colors';
import MultypleCbox from '../../Components/Input/MultypleCbox';
import Dropdown from '../../Components/Input/Dropdown';
import { useIsFocused } from '@react-navigation/native';
import CboxArrFunction from '../../Function/CboxArrFunction';
import Loading from '../../Components/Loading';
import { useSelector } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import myFunctions from '../../functions';

const VisitEtc = ({ navigation, route }) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const [form, setForm] = useState({
    description: '',
    category_id: '',
    lat: 0,
    lng: 0,
  });
  const [staffs, setStaffs] = useState([
    {
      name: 'staff_id[]',
      data: USER.staff_id,
      staffName: USER.name,
    },
  ]);

  const [dataImage, setDataImage] = useState([]);
  const [categories, setcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();

  const permissionCamera = async () => {
    //setLoading(true);
    try {
      const res = await check(
        Platform.select({
          android: PERMISSIONS.ANDROID.CAMERA,
          ios: PERMISSIONS.IOS.CAMERA,
        }),
      );
      if (res === RESULTS.GRANTED) {
        console.log('CameraGranted check', 'Yes');
        //setLoading(false);
        return true;
      } else if (res === RESULTS.DENIED) {
        const res2 = await request(
          Platform.select({
            android: PERMISSIONS.ANDROID.CAMERA,
            ios: PERMISSIONS.IOS.CAMERA,
          }),
        );
        if (res2 === RESULTS.GRANTED) {
          console.log('CameraGranted request', 'Yes');
          //setLoading(false);
          console.log('tesss1');
          return true;
        } else {
          console.log('CameraGranted request', 'No');
          //setLoading(false);
          console.log('tesss2');
          return false;
        }
      }
    } catch (err) {
      console.log('err CameraGranted request', err);
      //setLoading(false);
      return false;
    }
  };

  const getData = () => {
    // API.getDataCbox(TOKEN).then(result => {
    //   setcategories(result.cat);
    // });
  };

  // useEffect(() => {
  //   // Alert.alert('jhbvcx');
  //   if (isFocused) {
  //     getData();
  //     permissionCamera();
  //   }
  // }, [isFocused]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
    ])
      .then(res => {
        setLoading(true);
        //if perrmission loc
        if (res[1]) {
          //check gps
          myFunctions
            .checkGps(route.params.highAccuracy)
            .then(function (gps) {
              if (!gps.status) {
                setLoading(false);
                console.log('checkGps useeffect', 'false');
              } else {
                console.log('position', gps.data);
                setForm({
                  ...form,
                  lat: gps.data.latitude,
                  lng: gps.data.longitude,
                });
              }
            })
            .catch(error => {
              console.log('err checkGps useeffect', error.message);
              setLoading(false);
            });
        } else {
          Alert.alert(
            'Location Permission',
            'Location Permission tidak diizinkan.',
          );
        }
        setLoading(false);
      })
      .catch(e => {
        console.log('err promise all', e);
        setLoading(false);
      });

    setLoading(false);
  }, []);

  const handleForm = () => {
    setLoading(true);
    // let formData = [
    //   {name: 'description', data: form.description},
    //   {name: 'visit_category_id', data: form.category_id},
    //   // {name: 'lat', data: String(position.coords.latitude)},
    //   // {name: 'lng', data: String(position.coords.longitude)},
    //   {
    //     name: 'absence_request_id',
    //     data: String(route.params.absence_request_id),
    //   },
    // ];
    // let stf = [];
    // for (i = 0; i < staffs.length; i++) {
    //   stf = [...stf, {name: 'staff_id[]', data: String(staffs[i].data)}];
    // }
    // let sendData = [...dataImage, ...stf, ...formData];

    // console.log(formData, stf, sendData);

    if (dataImage.length > 0 && staffs.length > 0) {
      if (form.description !='') {
      console.log('skxocem');
      // LocationServicesDialogBox.checkLocationServicesIsEnabled({
      //   message:
      //     "<h2 style='color: #0af13e'>Use Location ?</h2>This app wants to change your device settings:<br/><br/>Use GPS, Wi-Fi, and cell network for location<br/><br/><a href='#'>Learn more</a>",
      //   ok: 'YES',
      //   cancel: 'NO',
      // })

      myFunctions
        .checkGps(false)
        .then(function (success) {
          console.log('corrrrrr', success);
          Geolocation.getCurrentPosition(
            position => {
              let formData = [
                { name: 'description', data: form.description },
                { name: 'visit_category_id', data: form.category_id },
                {
                  name: 'absence_request_id',
                  data: String(route.params.absence_request_id),
                },
                { name: 'lat', data: position.coords.latitude?String(position.coords.latitude):form.lat },
                { name: 'lng', data: position.coords.longitude?String(position.coords.longitude):form.lng },
              ];
              let stf = [];
              for (i = 0; i < staffs.length; i++) {
                stf = [
                  ...stf,
                  { name: 'staff_id[]', data: String(staffs[i].data) },
                ];
              }
              let sendData = [...dataImage, ...stf, ...formData];

              API.visitEtc(sendData, TOKEN).then(result => {
                console.log(result);
                Alert.alert('Berhasil !', result.message);
                navigation.goBack();
                setLoading(false);
              });
            },
            error => {
              // console.log(error);
              // Alert.alert('Gagal !', 'Tolong Cek GPS anda');
              // setLoading(false);
              let formData = [
                { name: 'description', data: form.description },
                { name: 'visit_category_id', data: form.category_id },
                { name: 'lat', data: '0' },
                { name: 'lng', data: '0' },
              ];
              let stf = [];
              for (i = 0; i < staffs.length; i++) {
                stf = [
                  ...stf,
                  { name: 'staff_id[]', data: String(staffs[i].data) },
                ];
              }
              let sendData = [...dataImage, ...stf, ...formData];

              API.visitEtc(sendData, TOKEN).then(result => {
                console.log(result);
                Alert.alert('Berhasil !', result.message);
                navigation.navigate('Menu');
                setLoading(false);
              });
            },
            {
              enableHighAccuracy: true,
              timeout: 120000,
              accuracy: 'high',
            },
          );
        })
        .catch(error => {
          //   navigation.navigate('Register')
          Alert.alert('Gagal !', 'Tolong Cek GPS anda');
          console.log('ini', error);
          setLoading(false);
        });

      // console.log('tesssd ', data);
      } else {
      Alert.alert('Keterangan kosong !', 'mohon isi keterangan');
      setLoading(false);
    }
    } else {
      Alert.alert('Gambar Kosong !', 'pilih gambar terlebih dahulu');
      setLoading(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    // colors={['#86BEDA', Colors.primary + 30]}
    >
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Loading />
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: windowHeight * 0.03,
            }}>
            <Label title="Bukti Dinas" size={24} color="#000000" />
          </View>

          {/* <Label title="Pilih Kategori" size={16} color="#000000" />
          <Dropdown categories={categories} setForm={setForm} form={form} /> */}
          <Label title="Keterangan" size={16} color="#000000" />
          <TextAreaInpt
            gMarginBottom={0.02}
            gMarginTop={0.02}
            marginLeft={0}
            placeholder="Masukan Keterangan"
            type="description"
            form={form}
            setForm={setForm}
          />

          {/* <MultypleCbox
        listStaffs={listStaffs}
        staffs={staffs}
        setStaffs={setStaffs}
      /> */}
          {console.log(
            'ini staff',
            route.params ? route.params : 'kosong',
            'ini jumlah staff',
            staffs.length,
          )}
          {/* {staffs.map((data, key) => {
            return (
              <View
                key={key}
                style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Text style={styles.name}>{data.staffName}</Text>
                <TouchableOpacity
                  style={styles.btnDelete}
                  onPress={() => {
                    CboxArrFunction.deleteCbox(staffs, setStaffs, key);
                  }}>
                  <Text style={{fontWeight: 'bold', color: Colors.white}}>
                    Hapus
                  </Text>
                </TouchableOpacity>
              </View>
            ); */}
          {/* })} */}
          {/* <ButtonCstm title="Tambah Staff" onPress={selectStaff} /> */}
          <Label title="Pilih Gambar" size={16} color="#000000" />
          <MultypleImage dataImage={dataImage} setDataImage={setDataImage} />
          <ButtonCstm title="Simpan" onPress={handleForm} />
        </ScrollView>
      )}
    </View>
  );
};

export default VisitEtc;

const windowWitdh = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  btnDelete: {
    width: windowWitdh * 0.15,
    height: windowHeight * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.danger,
    borderRadius: 5,
  },
  name: {
    marginLeft: windowWitdh * 0.05,
    width: windowWitdh * 0.73,
    marginRight: windowWitdh * 0.02,
    padding: windowWitdh * 0.02,
    color: '#000000',
    backgroundColor: Colors.secondary + 30,
    borderColor: '#000000',
    borderWidth: 1,
  },
});
