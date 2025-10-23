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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MapView, {Callout, Marker, Circle} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {useSelector} from 'react-redux';
import API from '../../service';
import RNFetchBlob from 'react-native-blob-util';
import ReactNativeBiometrics from 'react-native-biometrics';
import {getDistance} from 'geolib';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera} from 'react-native-image-picker';
import ScreenLoading from '../loading/ScreenLoading';
import myFunctions from '../../functions';

const DutyOut = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
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
  const [isMounted, setIsMounted] = useState(true);
  const [courseDetails, setCourseDetails] = useState();
  const [check, setCheck] = useState();
  const [jarak, setJarak] = useState();
  const {width, height} = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE_DELTA = 0.4922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const [time, setTime] = React.useState();
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
  const rnBiometrics = new ReactNativeBiometrics();

  const authCurrent = () => {
    rnBiometrics.simplePrompt({ promptMessage: 'Scan your fingerprint' })
      .then(resultObject => {
        const { success } = resultObject;
        if (success) {
          console.log('Authenticated successfully');
          setLoading(true);
          handleAction();
        } else {
          setLoading(false);
          console.log('User cancelled biometric prompt');
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('Biometric error', error);
      });
  };

  React.useEffect(() => {
    if (isMounted) {
      const timer = setInterval(() => {
        setTime(
          new Date().getDate() +
            '-' +
            parseInt(new Date().getMonth() + 1) +
            '-' +
            new Date().getFullYear() +
            ' ' +
            new Date().getHours() +
            ':' +
            new Date().getMinutes() +
            ':' +
            new Date().getSeconds(),
        );

        Promise.all([
          myFunctions.checkFingerprint(),
          myFunctions.permissionCamera(),
          myFunctions.permissionLocation(),
        ])
          .then(res => {
            console.log('rpromise all', res);
            setLoading(true);
            //if fingerprint off
            if (!res[0]) {
              setFinger('OFF');
            }
            //if perrmission loc
            if (res[2]) {
              //check gps
              myFunctions
                .checkGps(false)
                .then(function (gps) {
                  if (!gps.status) {
                    console.log('checkGps useeffect', 'false');
                  } else {
                    console.log('position', gps.data);
                    const j = getDistance(gps.data, {
                      latitude: -8.5591154,
                      longitude: 115.1399312,
                    });
                    // Working with W3C Geolocation API

                    if (j > 150) {
                      setJarak('1');
                    } else {
                      setJarak('2');
                    }

                    // positionNew = position
                    // console.log('posisiisii ', (gps.data.latitude),(gps.data.longitude));
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
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [setCourseDetails]);

  useEffect(() => {
    return () => {
      setCourseDetails(null);
      setIsMounted(false);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    API.absenceLCheck(USER_ID, route.params.data.id, TOKEN).then(result => {
      if (result) {
        console.log(result.data);
        setCheck(result.data);
      } else {
        alert(result.message);
      }
    });

    Promise.all([
      myFunctions.checkFingerprint(),
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
    ])
      .then(res => {
        console.log('rpromise all', res);
        setLoading(true);
        //if fingerprint off
        if (!res[0]) {
          setFinger('OFF');
        }
        //if perrmission loc
        if (res[2]) {
          //check gps
          myFunctions
            .checkGps(false)
            .then(function (gps) {
              if (!gps.status) {
                console.log('checkGps useeffect', 'false');
              } else {
                console.log('position', gps.data);
                console.log(
                  'You are ',
                  getDistance(gps.data, {
                    latitude: -8.5591154,
                    longitude: 115.1399312,
                  }),
                  'meters away from 51.525, 7.4575',
                );

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
  }, []);

  const handleAction = () => {
    setLoading(true);
    const data = {
      lat: form.lat,
      lng: form.lng,
    };
    console.log(form.lat, form.lng);
    RNFetchBlob.fetch(
      'POST',
      'https://simpletabadmin.ptab-vps-storage.com/api/close/absence/absence/storeLocationNew',
      {
        Authorization: `Bearer ${TOKEN}`,
        otherHeader: 'foo',
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'image',
          filename: image.fileName,
          data: image.base64,
        },
        {name: 'user_id', data: USER_ID.toString()},
        {name: 'lat', data: form.lat.toString()},
        {name: 'lng', data: form.lng.toString()},
        {name: 'id', data: route.params.data.id.toString()},
        {name: 'status', data: check == '0' ? 'approve' : 'close'},
        {name: 'absence_category_id', data: check == '0' ? '23' : '24'},
      ],
    )
      .then(result => {
        let data = JSON.parse(result.data);
        console.log(result);
        navigation.pop(2);
        setLoading(false);
        alert(data.message);
        // navigation.navigate('Action')
      })
      .catch(e => {
        // console.log(e);
        setLoading(false);
      });
  };

  if (!loading) {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{alignItems: 'center'}}>
            {/* <Text style = {[{marginVertical : windowHeight*0.01},jarak == "1" ? {color : '#ff0000'}:'']}>
      anda berada di {jarak == "1" ? 'Diluar Jangkauan':'Dalam Jangkauan'}
       </Text> */}

            <Text style={[{marginVertical: windowHeight * 0.05, fontSize: 24}]}>
              Absen {route.params.title ? route.params.title : ''}
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
                  latitude: -8.5591154,
                  longitude: 115.1399312,
                  latitudeDelta: 0.00683,
                  longitudeDelta: 0.0035,
                }}>
                <Circle
                  center={{
                    latitude: -8.5591154,
                    longitude: 115.1399312,
                  }}
                  radius={150}
                  strokeWidth={1}
                  strokeColor="#ff0000"
                  fillColor="#ff000030"
                />

                <Marker
                  coordinate={{
                    latitude: -8.5591154,
                    longitude: 115.1399312,
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

            <TouchableOpacity
              onPress={() =>
                launchCamera(
                  {
                    mediaType: 'photo',
                    includeBase64: true,
                    maxHeight: 500,
                    maxWidth: 500,
                    cameraType: 'front',
                  },
                  response => {
                    // console.log('ini respon', response);
                    if (response.assets) {
                      let image = response.assets[0];
                      set_image(image);
                    }
                  },
                )
              }>
              {image.uri == '' || image.uri == null ? (
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
                  source={{uri: image.uri}}
                  // source={image.uri=='' || image.uri==null ? require('../../../assets/img/ImageFoto.png'): {uri: image.from=='local' ? image.uri : `https://simpletabadmin.ptab-vps-storage.com/` + `${String(image.uri).replace('public/', '')}?time="${new Date()}`}}
                />
              )}
            </TouchableOpacity>

            <Text>Image</Text>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            authCurrent();
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
            Absen
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <ScreenLoading />
      </View>
    );
  }
};

export default DutyOut;

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
