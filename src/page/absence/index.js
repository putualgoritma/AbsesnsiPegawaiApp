import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  PermissionsAndroid,
  TouchableOpacity,
  Image,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import {useSelector} from 'react-redux';
import API from '../../service';
import ReactNativeBiometrics from 'react-native-biometrics';
import RNFetchBlob from 'react-native-blob-util';
import {getDistance} from 'geolib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ScreenLoading from '../loading/ScreenLoading';
import {SafeAreaView} from 'react-native-safe-area-context';
import myFunctions from '../../functions';
import {launchCamera} from 'react-native-image-picker';
import {
  isMockingLocation,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';
import Config from 'react-native-config';
import Textarea from 'react-native-textarea';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {
  SET_DATA_PERMISSION,
  SET_DATA_TOKEN,
  SET_DATA_USER,
  SET_DATA_HIGHTACCURACY,
} from '../../redux/action';

const Absence = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [timeD, setTimeD] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const [j1, setJ1] = useState(0);
  const [fakeGpsV, setfakeGpsV] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const [courseDetails, setCourseDetails] = useState();
  const [jarak, setJarak] = useState('1');
  const [test, setTest] = useState('');
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.4922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [time, setTime] = React.useState(30);
  const [finger, setFinger] = useState('ON');
  const [imageUri, setImageUri] = useState('');
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
  const [highAccuracy, setHighAccuracy] = useState(
    useSelector(state => state.HightAccuracyReducer),
  );
  const [loading, setLoading] = useState(true);
  const latref = route.params.lat; // 37.78537398105849
  const lngref = route.params.lng; // -122.40441607671049
  const dispatch = useDispatch();
  const rnBiometrics = new ReactNativeBiometrics();

  const fakeGps = async () => {
    console.log('Fake GPS');
    // return true;
    await isMockingLocation()
      .then(({isLocationMocked}) => {
        if (isLocationMocked === true) {
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
    console.log('route.params', route.params);
    setLoading(true);
    fakeGps();
    // myFunctions.fakeGps();
    Promise.all([
      myFunctions.checkFingerprint(),
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
      // myFunctions.fakeGps(),
      // ,
    ])
      .then(res => {
        console.log('rpromise all', res);
        setLoading(true);
        //if fingerprint off
        console.log('kdjdkclcorf :', res[3]);
        if (!res[0]) {
          setFinger('OFF');
        }
        //if perrmission loc
        if (res[2]) {
          //check gps
          myFunctions
            .checkGps(highAccuracy)
            .then(function (gps) {
              if (!gps.status) {
                setLoading(false);
                console.log('checkGps useeffect', 'false');
              } else {
                console.log('position', gps.data);
                //get distance
                const j = getDistance(gps.data, {
                  latitude: parseFloat(latref),
                  longitude: parseFloat(lngref),
                });
                console.log('distance', j);
                setTest(j);
                if (j > route.params.radius) {
                  setJarak('1');
                  setJ1(j);
                  if (gps.data.accuracy > 40) {
                    Alert.alert(
                      'Peringatan',
                      'Anda berada di luar jangkauan, akurasi GPS: ' +
                        gps.data.accuracy +
                        ', tolong kalibrasi GPS atau pakai Internet yang lebih kuat.',
                    );
                  }

                  Alert.alert(
                    'Anda Berada Diluar',
                    'Apa Anda mau mengganti accuracy GPS anda',
                    [
                      {
                        text: 'Ya',
                        onPress: () => {
                          gpsChange(!highAccuracy);
                        },
                      },
                      {
                        text: 'TIdak',
                        onPress: () => console.log('OK Pressed'),
                        style: 'cancel',
                      },
                    ],
                  );
                } else {
                  setJarak('2');
                }

                // positionNew = position
                console.log(
                  'posisiisii ',
                  gps.data.latitude,
                  gps.data.longitude,
                );
                setForm({
                  ...form,
                  lat: gps.data.latitude,
                  lng: gps.data.longitude,
                  accuracy: gps.data.accuracy,
                  distance: j,
                });
                setLoading(false);
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
          setLoading(false);
        }
      })
      .catch(e => {
        console.log('err promise all', e);
        setLoading(false);
      });

    // setLoading(false);
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log(route.params);
    setLoading(true);
    setfakeGpsV(0);
    fakeGps();
    Promise.all([
      myFunctions.checkFingerprint(),
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
    ])
      .then(res => {
        setLoading(true);
        //if fingerprint off
        if (!res[0]) {
          setFinger('OFF');
        }
        //if perrmission loc
        if (res[2]) {
          //check gps
          myFunctions
            .checkGps(highAccuracy)
            .then(function (gps) {
              if (!gps.status) {
                console.log('checkGps useeffect', 'false');
                setLoading(false);
              } else {
                console.log('position', gps.data);
                //get distance
                const j = getDistance(gps.data, {
                  latitude: parseFloat(latref),
                  longitude: parseFloat(lngref),
                });
                console.log('distance', j);
                setTest(j);
                if (j > route.params.radius) {
                  setJarak('1');
                  setJ1(j);
                  if (gps.data.accuracy > 40) {
                    Alert.alert(
                      'Peringatan',
                      'Anda berada di luar jangkauan, akurasi GPS: ' +
                        gps.data.accuracy +
                        ', tolong kalibrasi GPS atau pakai Internet yang lebih kuat.',
                    );
                  }
                  Alert.alert(
                    'Anda Berada Diluar',
                    'Apa Anda mau mengganti accuracy GPS anda',
                    [
                      {
                        text: 'Ya',
                        onPress: () => {
                          gpsChange(!highAccuracy);
                        },
                      },
                      {
                        text: 'TIdak',
                        onPress: () => console.log('OK Pressed'),
                        style: 'cancel',
                      },
                    ],
                  );
                } else {
                  setJarak('2');
                }

                // positionNew = position
                console.log(
                  'posisiisii ',
                  gps.data.latitude,
                  gps.data.longitude,
                );
                setForm({
                  ...form,
                  lat: gps.data.latitude,
                  lng: gps.data.longitude,
                });
                setLoading(false);
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

          setLoading(false);
        }
      })
      .catch(e => {
        console.log('err promise all', e);
        setLoading(false);
      });

    setLoading(false);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // if(route.params.img == {}){
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

  const gpsChange = data => {
    setLoading(true);
    setHighAccuracy(data);
    storeDataHightAccuracy(data);

    fakeGps();
    // myFunctions.fakeGps();
    Promise.all([
      myFunctions.checkFingerprint(),
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
      // myFunctions.fakeGps(),
      // ,
    ])
      .then(res => {
        console.log('rpromise all', res);
        setLoading(true);
        //if fingerprint off
        console.log('kdjdkclcorf :', res[3]);
        if (!res[0]) {
          setFinger('OFF');
        }
        //if perrmission loc
        if (res[2]) {
          //check gps
          myFunctions
            .checkGps(data)
            .then(function (gps) {
              if (!gps.status) {
                setLoading(false);
                console.log('checkGps useeffect', 'false');
              } else {
                console.log('position', gps.data);
                //get distance
                const j = getDistance(gps.data, {
                  latitude: parseFloat(latref),
                  longitude: parseFloat(lngref),
                });
                console.log('distance', j);
                setTest(j);
                if (j > route.params.radius) {
                  setJarak('1');
                  setJ1(j);
                  if (gps.data.accuracy > 40) {
                    Alert.alert(
                      'Peringatan',
                      'Anda berada di luar jangkauan, akurasi GPS: ' +
                        gps.data.accuracy +
                        ', tolong kalibrasi GPS atau pakai Internet yang lebih kuat.',
                    );
                  }

                  Alert.alert(
                    'Anda Berada Diluar',
                    'Apa Anda mau mengganti accuracy GPS anda',
                    [
                      {
                        text: 'Ya',
                        onPress: () => {
                          gpsChange(!highAccuracy);
                        },
                      },
                      {
                        text: 'TIdak',
                        onPress: () => console.log('OK Pressed'),
                        style: 'cancel',
                      },
                    ],
                  );
                } else {
                  setJarak('2');
                }

                // positionNew = position
                console.log(
                  'posisiisii ',
                  gps.data.latitude,
                  gps.data.longitude,
                );
                setForm({
                  ...form,
                  lat: gps.data.latitude,
                  lng: gps.data.longitude,
                  accuracy: gps.data.accuracy,
                  distance: j,
                });
                setLoading(false);
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
          setLoading(false);
        }
      })
      .catch(e => {
        console.log('err promise all', e);
        setLoading(false);
      });

    // setLoading(false);
  };

  const storeDataHightAccuracy = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@LocalHightAccuracy', jsonValue);
    } catch (e) {
      console.log('no save');
    }
    dispatch(SET_DATA_HIGHTACCURACY(value));
  };

  const sendDataNoImg = () => {
    console.log('sendDataNoImg', '3');
    setLoading(true);
    console.log('ssdddddddd', loading);
    RNFetchBlob.fetch(
      'POST',
      Config.REACT_APP_BASE_URL + '/close/absence/absence/storeN3w',
      {
        Authorization: `Bearer ${TOKEN}`,
        otherHeader: 'foo',
        Accept: 'application/json',
        // 'Content-Type': 'multipart/form-data',
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
        {name: 'distance', data: highAccuracy ? '1111' : '2222'},
        {name: 'status', data: '0'},
      ],
    )
      .then(result => {
        let data = JSON.parse(result.data);
        if (data.data) {
          console.log(result);

          Alert.alert(data.message);
          setLoading(false);
          console.log('ssssaaaaa', loading);
          navigation.goBack();
        } else {
          setLoading(false);
          Alert.alert(data.message);
        }

        // navigation.navigate('Action')
      })
      .catch(e => {
        // console.log(e);
        Alert.alert('lokasi tidak ditemukan');
        setLoading(false);
      });
  };

  const sendData = () => {
    console.log('senddata', '3');
    // setLoading(true);
    RNFetchBlob.fetch(
      'POST',
      Config.REACT_APP_BASE_URL + '/close/absence/absence/storeN3w',
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
        {name: 'distance', data: highAccuracy ? '1111' : '2222'},
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
        Alert.alert('lokasi tidak ditemukan');
        setLoading(false);
      });
  };

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

  const handleAction = () => {
    const data = {
      lat: form.lat,
      lng: form.lng,
    };
    setLoading(true);

    Promise.all([
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
    ])
      .then(res => {
        // setLoading(true);
        if (res[1]) {
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
          // //get distance
          // const j = getDistance(gps.data, {
          //   latitude: parseFloat(latref),
          //   longitude: parseFloat(lngref),
          // });
          // console.log('distance', j);

          // setTest(j);
          // if (j > route.params.radius) {
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
          //       console.log('data : ', form);
          //       Alert.alert('Lengkapi data terlebih dahulu');
          //       setLoading(false);
          //     }
          //   } else {
          //     setJarak('1');
          //     Alert.alert('diluar area');
          //     setLoading(false);
          //   }
          // }
          // else {
          // setJarak('2');
          console.log(form.lat, form.lng);

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
            // console.log('data : ', form);
            Alert.alert('Lengkapi data terlebih dahulu');
            setLoading(false);
          }
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
          // }
          // })
          // .catch(error => {
          //   console.log('err checkGps handleaction', error.message);
          //   setLoading(false);
          // });
        } else {
          Alert.alert(
            'Location Permission',
            'Location Permission tidak diizinkan.',
          );
        }
        // setLoading(false);
      })
      .catch(e => {
        console.log('err promise all', e);
        setLoading(false);
      });
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
              {jarak == '1' ? 'Diluar Jangkauan' : 'Dalam Jangkauan'}
            </Text>
            <Text>
              Note : Anda menggunakan akurasi{' '}
              {highAccuracy ? 'tinggi' : 'rendah'}
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
                  latitude: parseFloat(latref),
                  longitude: parseFloat(lngref),
                  latitudeDelta: 0.00683,
                  longitudeDelta: 0.0035,
                }}>
                <Circle
                  center={{
                    latitude: parseFloat(latref),
                    longitude: parseFloat(lngref),
                  }}
                  radius={route.params.radius}
                  strokeWidth={1}
                  strokeColor="#ff0000"
                  fillColor="#ff000030"
                />

                <Marker
                  coordinate={{
                    latitude: parseFloat(latref),
                    longitude: parseFloat(lngref),
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
            </View>

            {/* <View style={styles.mapS}>

        </View> */}

            <Text>Map</Text>

            {/* untuk gambar start */}
            {route.params.selfie == 'ON' && (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    console.log(route.params.type, route.params.image.filename);
                  }}>
                  {/* <Text>Tesssssx</Text> */}
                </TouchableOpacity>
                {route.params.type == 'break' ? (
                  <TouchableOpacity
                    onPress={() =>
                      launchCamera(
                        {
                          mediaType: 'photo',
                          includeBase64: true,
                          maxHeight: 900,
                          maxWidth: 900,
                          cameraType: 'back',
                        },
                        response => {
                          console.log('ini respon', response);
                          if (response.assets) {
                            let image = response.assets[0];
                            route.params.image = image;
                            route.params.image.filename = image.fileName;
                            route.params.image.uri = image.uri;
                            setImageUri(image.uri);
                          }
                        },
                      )
                    }>
                    {imageUri == '' ? (
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
                        source={{uri: imageUri}}
                        // source={image.uri=='' || image.uri==null ? require('../../../assets/img/ImageFoto.png'): {uri: image.from=='local' ? image.uri : `https://simpletabadmin.ptab-vps-storage.com/` + `${String(image.uri).replace('public/', '')}?time="${new Date()}`}}
                      />
                    )}
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CamDect', {
                        highAccuracy: route.params.highAccuracy,
                        fingerfrint: route.params.fingerfrint,
                        selfie: route.params.selfie,
                        link: 'Absence',
                        lat: latref,
                        lng: lngref,
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
                      />
                    )}
                  </TouchableOpacity>
                )}
                <Text>Image</Text>
              </View>
            )}
            {/* untuk gambar end */}

            {/* {route.params.type == 'break' && (
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                placeholder="Tuliskan Memo"
                editable={true}
                maxLength={255}
                value={form.memo}
                onChangeText={value =>
                  setForm({...form, memo: value})
                }></Textarea>
            )} */}
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
      </SafeAreaView>
    );
  } else {
    return (
      <View>
        <ScreenLoading />
      </View>
    );
  }
};

export default Absence;

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
  textareaContainer: {
    width: windowWidht * 0.7,
    height: 120,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  textarea: {
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#696969',
  },
});
