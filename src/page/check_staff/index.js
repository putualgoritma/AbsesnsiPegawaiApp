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
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import API from '../../service';
import RNFetchBlob from 'react-native-blob-util';
import {getDistance} from 'geolib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera} from 'react-native-image-picker';
import ScreenLoading from '../loading/ScreenLoading';
import myFunctions from '../../functions';
import {
  isMockingLocation,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';

const Check_Staff = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [timeD, setTimeD] = useState(0);
  const [isMounted, setIsMounted] = useState(true);
  const [courseDetails, setCourseDetails] = useState();
  const [jarak, setJarak] = useState('1');
  const [test, setTest] = useState('');
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const [fakeGpsV, setfakeGpsV] = useState(0);
  const LATITUDE_DELTA = 0.4922;
  const [refreshing, setRefreshing] = React.useState(false);
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [time, setTime] = React.useState(30);
  const [j1, setJ1] = useState(0);
  const [form, setForm] = useState({
    lat: '',
    lng: '',
    customer_id: '',
    memo: '',
    type: '',
    // staff_id : USER_ID,
    todo: '',
  });
  const [loading, setLoading] = useState(true);

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

  const latref = route.params.lat; // 37.78537398105849
  const lngref = route.params.lng;

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
        // if (!res[0]) {
        //   setFinger('OFF');
        // }
        //if perrmission loc
        if (res[2]) {
          //check gps
          myFunctions
            .checkGps(route.params.highAccuracy)
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
        }
        setLoading(false);
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
        // if (!res[0]) {
        //   setFinger('OFF');
        // }
        //if perrmission loc
        if (res[2]) {
          //check gps
          myFunctions
            .checkGps(route.params.highAccuracy)
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
        }
        setLoading(false);
      })
      .catch(e => {
        console.log('err promise all', e);
        setLoading(false);
      });

    // setLoading(false);
  }, []);

  const handleAction = () => {
    setLoading(true);
    const data = {
      lat: form.lat,
      lng: form.lng,
    };
    console.log('ini data lokasi ', form);
    if (form.lat != '' && form.lng != '') {
      API.checkStaff({id: route.params.id, lng: form.lng, lat: form.lat}, TOKEN)
        .then(result => {
          // console.log('tessaaaaaas');
          navigation.goBack();
          setLoading(true);
          // resetData()
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      alert('Lengkapi data terlebih dahulu');
    }
  };

  if (!loading && jarak != '') {
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
                showsUserLocation={true}
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
              </MapView>
            </View>

            {/* <View style={styles.mapS}>

        </View> */}
            <Text>Map</Text>
          </View>
        </ScrollView>

        {/* {jarak != 1 && ( */}
        <TouchableOpacity
          style={[styles.btn]}
          onPress={() => {
            handleAction();
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
            Absen
          </Text>
        </TouchableOpacity>
        {/* )} */}

        {/* {jarak != 1 && finger == 'ON' && route.params.fingerfrint == 'ON' && (
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              authCurrent();
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
              Absen
            </Text>
          </TouchableOpacity>
        )} */}

        {/* {jarak != 1 && route.params.fingerfrint == 'OFF' && finger == 'ON' && (
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              handleAction();
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
              Absen
            </Text>
          </TouchableOpacity>
        )} */}

        {/* {jarak != 1 && route.params.fingerfrint == 'ON' && finger == 'OFF' && (
          <TouchableOpacity
            style={[styles.btn]}
            onPress={() => {
              handleAction();
            }}>
            <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
              Absen
            </Text>
          </TouchableOpacity>
        )} */}
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

export default Check_Staff;

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
    height: windowHeight * 0.3233,
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
