import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
  RefreshControl,
  Image,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import API from '../../service';
import ReactNativeBiometrics from 'react-native-biometrics';
import RNFetchBlob from 'react-native-blob-util';
import {getDistance} from 'geolib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera} from 'react-native-image-picker';
import ScreenLoading from '../loading/ScreenLoading';
import {SafeAreaView} from 'react-native-safe-area-context';
import myFunctions from '../../functions';
import {
  isMockingLocation,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';
import Config from 'react-native-config';

const AbsenceExtra = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [timeD, setTimeD] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [finger, setFinger] = useState('ON');
  const [j1, setJ1] = useState(0);

  const [isMounted, setIsMounted] = useState(true);
  const [courseDetails, setCourseDetails] = useState();
  const [jarak, setJarak] = useState('1');
  const [test, setTest] = useState('');
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.4922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [time, setTime] = React.useState(30);
  const [form, setForm] = useState({
    lat: 0,
    lng: 0,
    customer_id: '',
    memo: '',
    type: '',
    accuracy: '',
    distance: '',
    // staff_id : USER_ID,
    todo: '',
  });
  const [loading, setLoading] = useState(true);
  const [fakeGpsV, setfakeGpsV] = useState(0);
  const rnBiometrics = new ReactNativeBiometrics();

  const fakeGps = async () => {
    console.log('Fake GPS');
    // return true;
    await isMockingLocation()
      .then(({isLocationMocked}) => {
        if (isLocationMocked === true) {
          // alert('gps falsu');
          setfakeGpsV(2);
          return (
            <View>
              <Text>
                Anda Menggunakan Fake GPS Tolong Matikan Fake GPS dan restart HP
                Anda Kembali
              </Text>
            </View>
          );
          // return true;
        } else {
          // alert('gps asli');
          setfakeGpsV(3);
          return (
            <View>
              <Text>
                Anda Menggunakan Fake GPS Tolong Matikan Fake GPS dan restart HP
                Anda Kembali
              </Text>
            </View>
          );
          // return true;
        }

        // isLocationMocked: boolean
        // boolean result for Android and iOS >= 15.0
      })
      .catch(error => {
        // error.message - descriptive message
        switch (error.code) {
          case MockLocationDetectorErrorCode.GPSNotEnabled: {
            // user disabled GPS
            console.log('fake 1');
            return true;
          }
          case MockLocationDetectorErrorCode.NoLocationPermissionEnabled: {
            // user has no permission to access location
            console.log('fake 2');
            return true;
          }
          case MockLocationDetectorErrorCode.CantDetermine: {
            console.log('fake 3');
            return true;
            // always for iOS < 15.0
            // for android and iOS if couldn't fetch GPS position
          }
        }
      });
  };

  useEffect(() => {
  let isMounted = true;

  const init = async () => {
    try {
      setLoading(true);

      // Run Fake GPS but DO NOT block init
      myFunctions.fakeGps()
        .then(isFake => {
          if (!isMounted) return;
          setfakeGpsV(isFake ? 2 : 3);
        })
        .catch(err => console.log("fakeGps error:", err));

      const [fingerOK, cameraOK, locationOK] = await Promise.all([
        myFunctions.checkFingerprint(),
        myFunctions.permissionCamera(),
        myFunctions.permissionLocation(),
      ]);

      if (!isMounted) return;

      if (!fingerOK){
                Alert.alert(
                  "Fingerprint Permission",
                  "Fingerprint Error."
                );
                // setFinger("OFF");
              }

      if (!locationOK) {
        Alert.alert(
          "Location Permission",
          "Location Permission tidak diizinkan."
        );
        return;
      }

      const gps = await myFunctions.checkGps(route.params.highAccuracy);

      if (!gps.status) {
        console.log("checkGps useEffect:", "false");
        return;
      }

      const j = getDistance(gps.data, {
        latitude: parseFloat(route.params.lat),
        longitude: parseFloat(route.params.lng),
      });

      setTest(j);

      if (j > route.params.radius) {
        setJarak("1");
        setJ1(j);

        if (gps.data.accuracy > 40) {
          Alert.alert(
            "Peringatan",
            "Anda berada di luar jangkauan, akurasi GPS: " +
              gps.data.accuracy +
              ", tolong kalibrasi GPS atau pakai Internet yang lebih kuat."
          );
        }
      } else {
        setJarak("2");
      }

      if (!isMounted) return;

      setForm(prev => ({
        ...prev,
        lat: gps.data.latitude,
        lng: gps.data.longitude,
        accuracy: gps.data.accuracy,
        distance: j,
      }));
    } catch (e) {
      console.log("err init useEffect:", e);
    } finally {
      if (isMounted) setLoading(false);
    }
  };

  init();

  return () => {
    isMounted = false;
  };
}, []);


  const onRefresh = React.useCallback(() => {
  let isMounted = true;

  const refresh = async () => {
    try {
      setRefreshing(true);
      setLoading(true);

      // Reset fake GPS value
      setfakeGpsV(0);

      myFunctions.fakeGps()
        .then(isFake => {
          if (!isMounted) return;
          setfakeGpsV(isFake ? 2 : 3);
        })
        .catch(err => console.log("fakeGps error:", err));

      const [fingerOK, cameraOK, locationOK] = await Promise.all([
        myFunctions.checkFingerprint(),
        myFunctions.permissionCamera(),
        myFunctions.permissionLocation(),
      ]);

      if (!isMounted) return;

      if (!fingerOK){
                Alert.alert(
                  "Fingerprint Permission",
                  "Fingerprint Error."
                );
                // setFinger("OFF");
              }

      if (!locationOK) {
        Alert.alert(
          "Location Permission",
          "Location Permission tidak diizinkan."
        );
        return;
      }

      const gps = await myFunctions.checkGps(route.params.highAccuracy);

      if (!gps.status) {
        console.log("checkGps refresh:", "false");
        return;
      }

      const j = getDistance(gps.data, {
        latitude: parseFloat(route.params.lat),
        longitude: parseFloat(route.params.lng),
      });

      setTest(j);

      if (j > route.params.radius) {
        setJarak("1");
        setJ1(j);
      } else {
        setJarak("2");
      }

      if (!isMounted) return;

      setForm(prev => ({
        ...prev,
        lat: gps.data.latitude,
        lng: gps.data.longitude,
      }));
    } catch (e) {
      console.log("err onRefresh:", e);
    } finally {
      if (isMounted) {
        setLoading(false);
        setRefreshing(false);
      }
    }
  };

  refresh();

  return () => {
    isMounted = false;
  };
}, []);


  const [image, set_image] = useState({
    base64: '',
    fileName: '',
    fileSize: 0,
    height: 0,
    type: '',
    uri: '',
    width: 0,
    from: 'api',
  });

  const authCurrent = () => {
    rnBiometrics.simplePrompt({ promptMessage: 'Scan your fingerprint' })
          .then(resultObject => {
            const { success } = resultObject;
            if (success) {
              console.log('Authenticated successfully');
              handleAction();
            } else {
              setLoading(false);
              console.log('User cancelled biometric prompt');
            }
          })
          .catch(error => {
            setLoading(false);
            if (error.name == 'DeviceLocked') {
              // if(timeD > 0){
              //   Alert.alert('Tunggu beberapa saat dan klik ulang tombol absen')
              // }
              // else{
              Alert.alert('Tunggu sekitar 30 detik dan klik ulang tombol absen');
              // }
    
              // setTimeD(30);
              // handleActionErr()
            } else if (error.name == 'DeviceLockedPermanent') {
              Alert.alert('Kunci HP Anda dan masuk dengan sandi anda');
            } else if (error.name == 'DeviceLockedPermanent') {
              Alert.alert('Kunci HP Anda dan masuk dengan sandi anda');
            } else if (error.name == 'NotEnrolled') {
              Alert.alert(
                'Aktifkan Fingerprint anda, masuk ke setting/sandi&keamanan pilih sidik jari',
              );
            } else {
              // Alert.alert('Aktifkan Fingerprint anda, masuk ke setting/sandi&keamanan pilih sidik jari')
              // test
              Alert.alert('Err Fingerprint: ', error.name);
            }
            console.log('Biometric error', error);
          });  
  };

  const sendDataNoImg = () => {
    setLoading(true);
    RNFetchBlob.fetch(
      'POST',
      Config.REACT_APP_BASE_URL + '/close/absence/absence/storeExtra',
      {
        Authorization: `Bearer ${TOKEN}`,
        otherHeader: 'foo',
        Accept: 'application/json',
        //   'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'id', data: route.params.id.toString()},
        {name: 'absence_id', data: route.params.absence_id.toString()},
        {name: 'type', data: route.params.type.toString()},
        {name: 'queue', data: route.params.queue.toString()},
        {name: 'staff_id', data: STAFF_ID.toString()},
        {name: 'lat', data: form.lat.toString()},
        {name: 'lng', data: form.lng.toString()},
        {name: 'accuracy', data: form.accuracy.toString()},
        {name: 'distance', data: form.distance.toString()},
        {name: 'status', data: '0'},
      ],
    )
      .then(result => {
        let data = JSON.parse(result.data);
        if (data.data) {
          console.log(result);
          setLoading(false);
          navigation.goBack();

          Alert.alert(data.message);
        } else {
          setLoading(false);
          Alert.alert(data.message);
        }
        // navigation.navigate('Action')
      })
      .catch(e => {
        // console.log(e);
        setLoading(false);
      });
  };

  const sendData = () => {
    setLoading(true);
    RNFetchBlob.fetch(
      'POST',
      Config.REACT_APP_BASE_URL + '/close/absence/absence/storeExtra',
      {
        Authorization: `Bearer ${TOKEN}`,
        otherHeader: 'foo',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: route.params.image.filename,
          data: route.params.image.base64,
        },
        {name: 'id', data: route.params.id.toString()},
        {name: 'absence_id', data: route.params.absence_id.toString()},
        {name: 'type', data: route.params.type.toString()},
        {name: 'queue', data: route.params.queue.toString()},
        {name: 'staff_id', data: STAFF_ID.toString()},
        {name: 'lat', data: form.lat.toString()},
        {name: 'lng', data: form.lng.toString()},
        {name: 'accuracy', data: form.accuracy.toString()},
        {name: 'distance', data: form.distance.toString()},
        {name: 'status', data: '0'},
      ],
    )
      .then(result => {
        let data = JSON.parse(result.data);
        if (data.data) {
          console.log(result);
          setLoading(false);
          navigation.goBack();

          Alert.alert(data.message);
        } else {
          setLoading(false);
          Alert.alert(data.message);
        }
        // navigation.navigate('Action')
      })
      .catch(e => {
        // console.log(e);
        setLoading(false);
      });
  };

  const handleAction = () => {
    const data = {
      lat: form.lat,
      lng: form.lng,
    };

    setLoading(true);

    Promise.all([
      myFunctions.checkFingerprint(),
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
    ])
      .then(res => {
        setLoading(true);
        //if fingerprint off
        if (!res[0]){
                  Alert.alert(
                    "Fingerprint Permission",
                    "Fingerprint Error."
                  );
                  // setFinger("OFF");
                }
        //if perrmission loc
        if (res[2]) {
          //check gps
          // myFunctions
          //   .checkGps(route.params.highAccuracy)
          //   .then(function (gps) {
          // if (!gps.status) {
          //   Alert.alert(
          //     'Gagal Mengirim Data',
          //     'Tolong cek kembali lokasi anda',
          //   );
          //   setLoading(false);
          //   console.log('checkGps useeffect', 'false');
          // } else {
          // console.log('position', gps.data);
          // console.log(
          //   'You are ',
          //   getDistance(gps.data, {
          //     latitude: parseFloat(route.params.lat),
          //     longitude: parseFloat(route.params.lng),
          //   }),
          //   'meters away from 51.525, 7.4575',
          // );

          // tesss1

          // start input
          // const j = getDistance(gps.data, {
          //   latitude: parseFloat(route.params.lat),
          //   longitude: parseFloat(route.params.lng),
          // });
          // Working with W3C Geolocation API

          // setTest(j);
          // if (j > route.params.radius) {
          //   setJarak('1');
          //   if (j - j1 < 20) {
          //     if (route.params.selfie == 'OFF') {
          //       sendDataNoImg(gps.data);
          //     } else if (route.params.image == null) {
          //       Alert.alert('Pilih Gambar Terlebih dahulu');
          //       setLoading(false);
          //     } else if (
          //       form.lat != '' &&
          //       form.lng != '' &&
          //       route.params.image.filename != '' &&
          //       route.params.image.filename != null
          //     ) {
          //       sendData(gps.data);
          //     } else {
          //       Alert.alert('Lengkapi data terlebih dahulu');
          //       setLoading(false);
          //     }
          //   }
          //   Alert.alert('diluar area');
          // } else {
          // setJarak('2');

          // console.log(form.lat, form.lng);
          if (route.params.selfie == 'OFF') {
            sendDataNoImg();
          } else if (route.params.image == null) {
            Alert.alert('Pilih Gambar Terlebih dahulu');
            setLoading(false);
          } else if (
            form.lat != '' &&
            form.lng != '' &&
            route.params.image.filename != '' &&
            route.params.image.filename != null
          ) {
            sendData();
          } else {
            Alert.alert('Lengkapi data terlebih dahulu');
            setLoading(false);
          }
          // }
          // end input

          // console.log('posisi',position);
          // defaultLoc = {
          //     latitude: gps.data.latitude,
          //     longitude: gps.data.longitude,
          // }
          // positionNew = position
          // console.log(
          //   'posisiisii ',
          //   gps.data.latitude,
          //   gps.data.longitude,
          // );
          // setForm({
          //   ...form,
          //   lat: gps.data.latitude,
          //   lng: gps.data.longitude,
          // });
          // setLoading(false);
          // }
          // })
          // .catch(error => {
          //   console.log('err checkGps useeffect', error.message);
          //   setLoading(false);
          // });
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
  };

  if (fakeGpsV === 2) {
    return (
      <View>
        <Text>
          Anda Menggunakan Fake GPS Tolong Matikan Fake GPS dan restart HP Anda
          Kembali
        </Text>
      </View>
    );
  } else if (!loading && jarak != '' && fakeGpsV != 0) {
    return (
      <SafeAreaView style={{flex: 1}}>
        {/* <Text>{timeD}</Text> */}
        <ScrollView
          scrollEnabled={true}
          contentContainerStyle={styles.scrollView}
          nestedScrollEnabled={true}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{alignItems: 'center'}}>
            <Text
              style={[
                {marginVertical: windowHeight * 0.01},
                jarak == '1' ? {color: '#ff0000'} : '',
              ]}>
              anda berada di{' '}
              {jarak == '1' ? 'Diluar Jangkauan' : 'Dalam Jangkauan'}, {test}
            </Text>

            <Text style={[{marginVertical: windowHeight * 0.05, fontSize: 24}]}>
              Absen
            </Text>
            <View
              style={{
                height: windowHeight * 0.3,
                width: windowWidht * 0.8,
                backgroundColor: '#FFFFFF',
              }}>
              <MapView
                style={{flex: 1}} //window pake Dimensions
                // showsUserLocation={true}
                showsMyLocationButton={true}
                region={{
                  latitude: parseFloat(route.params.lat),
                  longitude: parseFloat(route.params.lng),
                  latitudeDelta: 0.00683,
                  longitudeDelta: 0.0035,
                }}>
                <Circle
                  center={{
                    latitude: parseFloat(route.params.lat),
                    longitude: parseFloat(route.params.lng),
                  }}
                  radius={route.params.radius}
                  strokeWidth={1}
                  strokeColor="#ff0000"
                  fillColor="#ff000030"
                />

                <Marker
                  coordinate={{
                    latitude: parseFloat(route.params.lat),
                    longitude: parseFloat(route.params.lng),
                  }}>
                  <Callout>
                    <View>
                      <Text>Posisi Kantor</Text>
                    </View>
                  </Callout>
                </Marker>

                <Marker
                  pinColor={'blue'}
                  coordinate={{
                    latitude: form.lat,
                    longitude: form.lng,
                  }}>
                  <Callout>
                    <View>
                      <Text>Posisi Anda</Text>
                    </View>
                  </Callout>
                </Marker>
              </MapView>
              {/* <Text>
                {form.lat}, {form.lng}
              </Text> */}
            </View>

            {/* <View style={styles.mapS}>

        </View> */}
            <Text>Map</Text>

            {/* untuk gambar start */}
            {route.params.selfie == 'ON' && (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CamDect', {
                    highAccuracy: route.params.highAccuracy,
                    fingerfrint: route.params.fingerfrint,
                    selfie: route.params.selfie,
                    link: 'AbsenceExtra',
                    lat: route.params.lat,
                    lng: route.params.lng,
                    radius: route.params.radius,
                    id: route.params.id,
                    queue: route.params.queue,
                    absence_id: route.params.absence_id,
                    type: route.params.type,
                    image: null,
                  })
                }>
                {route.params.image == null ? (
                  <View style={styles.image}>
                    <Icon
                      name="camera-retro"
                      size={windowHeight * 0.08}
                      color="#000000"
                    />
                  </View>
                ) : (
                  <Image
                    style={styles.image}
                    source={{uri: route.params.image.uri}}
                    // source={image.uri=='' || image.uri==null ? require('../../../assets/img/ImageFoto.png'): {uri: image.from=='local' ? image.uri : `https://simpletabadmin.ptab-vps-storage.com/` + `${String(image.uri).replace('public/', '')}?time="${new Date()}`}}
                  />
                )}
              </TouchableOpacity>
            )}

            {/* untuk gambar end */}

            <Text>Image</Text>
          </View>
        </ScrollView>
        {jarak != 1 && finger == 'ON' && route.params.fingerfrint == 'ON' && (
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              authCurrent();
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
              Absen
            </Text>
          </TouchableOpacity>
        )}

        {jarak != 1 && route.params.fingerfrint == 'OFF' && finger == 'ON' && (
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              handleAction();
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
              Absen
            </Text>
          </TouchableOpacity>
        )}

        {jarak != 1 && route.params.fingerfrint == 'ON' && finger == 'OFF' && (
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              handleAction();
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
              Absen
            </Text>
          </TouchableOpacity>
        )}
        {/* <TouchableOpacity style={[styles.btn]} onPress={()=>{setTimeD(40); console.log('dldldld', timeD)}}>
 <Text style={{ color : '#FFFFFF', fontSize : 24, fontWeight : 'bold' }}>
   Absen
   </Text>
 </TouchableOpacity>
        */}

        {/* {jarak != 1 &&
 <TouchableOpacity style={[styles.btn]} onPress={()=>{handleAction()}}>
 <Text style={{ color : '#FFFFFF', fontSize : 24, fontWeight : 'bold' }}>
   Absen
   </Text>
 </TouchableOpacity>
} */}

        {/* <TouchableOpacity style={[styles.btn]} onPress={()=>{handleAction()}}>
     <Text style={{ color : '#FFFFFF', fontSize : 24, fontWeight : 'bold' }}>
       Absen
       </Text>
     </TouchableOpacity> */}
      </SafeAreaView>
    );
  } else {
  //   Alert.alert(
  //   "Peringatan Loading",
  //   `loading: ${loading}` + ` fakeGpsV: ${fakeGpsV}` + ` jarak: ${jarak}`
  // );
    return (
      <View>
        <ScreenLoading />
      </View>
    );
  }
};

export default AbsenceExtra;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mapS: {
    width: windowWidht * 0.8,
    height: windowHeight * 0.25,
    backgroundColor: '#FFFFFF',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidht * 0.7,
    height: windowWidht * 1.0,
    backgroundColor: '#00000010',
  },
  btn: {
    width: windowWidht * 0.76,
    height: windowHeight * 0.07,
    backgroundColor: '#00B2FF',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
