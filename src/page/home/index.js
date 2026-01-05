import {
  Dimensions,
  StyleSheet,
  Text,
  PermissionsAndroid,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  ImageBackground,
  Alert,
  Platform,
  useColorScheme
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { MultyDevice } from '../../assets';
import Footer from '../../component/Footer';
import { useSelector } from 'react-redux';
import API from '../../service';
import { SafeAreaView } from 'react-native-safe-area-context';
import DeviceInfo from 'react-native-device-info';
import { useIsFocused } from '@react-navigation/native';
import ScreenLoading from '../loading/ScreenLoading';
import myFunctions from '../../functions';
import SelectDropdown from 'react-native-select-dropdown';
import JailMonkey from 'jail-monkey';
import {
  isMockingLocation,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';

const Home = ({ navigation }) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const [data, setData] = useState({ staff: [], messageM: '', messageCount: '' });
  const [message, setMessage] = useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();
  const [data2, setData2] = useState({});
  const [loading, setLoading] = useState(true);
  const [fakeGpsV, setfakeGpsV] = useState(0);
  const scheme = useColorScheme();

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

  async function requestLocationPermission() {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to continue.',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
          return true;
        } else {
          Alert.alert(
            'Permission denied',
            'Please enable location permission in settings for better accuracy.'
          );
          return false;
        }
      } catch (err) {
        console.warn('Permission error:', err);
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    //alert('home')
    fakeGps();
    console.log('jailmonk di home', JailMonkey.isJailBroken());
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }
    Promise.all([
      myFunctions.checkFingerprint(),
      myFunctions.permissionCamera(),
      myFunctions.permissionLocation(),
    ])
      .then(res => {
        console.log('promise all', res);
        getData();
        getChart();
        // setLoading(false);
      })
      .catch(e => {
        console.log('err promise all', e);
        // setLoading(false);
      });
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    setRefreshing(false);
  }, []);

  DeviceInfo.getDeviceName().then(deviceName => {
    console.log('nama hp', deviceName);
  });

  let model = DeviceInfo.getModel();
  console.log('nama hp', model);
  DeviceInfo.getFingerprint().then(fingerprint => {
    console.log('nama hp', fingerprint);
  });

  const getData = () => {
    API.menu(USER.staff_id, TOKEN).then(result => {
      if (result) {
        console.log('data2', result);
        setData(result);
        if (result.versionNow == 'not') {
          Alert.alert(result.version);
        }
        setLoading(false);
      } else {
        Alert.alert(result.message);
      }
    });
  };

  const getChart = () => {
    API.chart(USER.staff_id, TOKEN).then(result => {
      if (result) {
        console.log('data2', result);
        setData2(result);
        // setLoading(false)
      } else {
        Alert.alert(result.message);
      }
    });
  };

  if (fakeGpsV === 2) {
      return (
        <View>
          <Text>
            777 Anda Menggunakan Fake GPS Tolong Matikan Fake GPS dan restart HP Anda
            Kembali
          </Text>
        </View>
      );
    }

  if (JailMonkey.isJailBroken()) {
    //if (2<1) {
    // Alternative behaviour for jail-broken/rooted devices.
    return (
      <View>
        <Text>Device Anda di root tolong kembalikan seperti semula</Text>
      </View>
    );
  } else if (!loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFFFFF', color: scheme === 'dark' ? '#000000' : '#000000' }}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF', color: scheme === 'dark' ? '#000000' : '#000000' }}>
          <ScrollView
            // style={{ backgroundColor : 'blue'}}
            scrollEnabled={true}
            contentContainerStyle={styles.scrollView}
            nestedScrollEnabled={true}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            {/* <Text>{data.staff.type}</Text> */}
            <View style={{ backgroundColor: '#16D5FF', width: windowWidht * 1, color: scheme === 'dark' ? '#000000' : '#000000' }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: windowWidht * 0.85,
                  marginBottom: windowHeight * 0.08,
                  marginTop: windowHeight * 0.02,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('User', { screen: 'User' })}>
                  <Image
                    style={[styles.iconRadius,{color: scheme === 'dark' ? '#000000' : '#000000'}]}
                    source={{
                      uri:
                        `https://simpletabadmin.ptab-vps-storage.com` +
                        `${String(data.staff.image).replace('public/', '')}`,
                    }}
                  />
                </TouchableOpacity>

                <View style={{ marginLeft: windowHeight * 0.01 }}>
                  <Text style={{ color: '#FFFFFF' }}>{USER.name}</Text>
                  <Text style={{ color: '#FFFFFF' }}>{USER.phone}</Text>
                  <Text style={{ color: '#FFFFFF' }}>V-15-12-2025 V1</Text>                  
                </View>
                <TouchableOpacity
                  style={{ marginLeft: 'auto', marginTop: windowHeight * 0.01 }}
                  onPress={() => {
                    navigation.navigate('message', {
                      lat: data.staff.lat,
                      lng: data.staff.lng,
                      radius: data.staff.radius,
                    });
                  }}>
                  <Icon
                    name="bell"
                    size={windowHeight * 0.04}
                    color="#FFFFFF"
                    solid
                  />
                  {data.messageCount != '' && (
                    <View
                      style={{
                        justifyContent: 'center',
                        marginTop: -40,
                        backgroundColor: 'red',
                        width: windowWidht * 0.05,
                        height: windowWidht * 0.05,
                        borderRadius: (windowWidht * 0.05) / 2,
                      }}>
                      <Text
                        style={{
                          color: '#FFFFFF',
                          textAlign: 'center',
                          fontSize: 10,
                        }}>
                        {data.messageCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  borderTopLeftRadius: 30,
                  borderTopRightRadius: 30,
                }}>
                <View style={styles.floatingView}>
                  {/* <Text style={{color: '#000000'}}>
                    {data.messageM.length < 22
                      ? `${data.messageM}`
                      : `${data.messageM.substring(0, 21)}...`}
                  </Text> */}
                </View>

                <Image
                  style={{ height: windowHeight * 0.23, width: windowWidht }}
                  source={MultyDevice}></Image>

                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidht * 0.8,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: windowHeight * 0.03,
                  }}>
                  <View style={{ marginRight: 'auto' }}>
                    <TouchableOpacity
                      style={[styles.btnRadius, { backgroundColor: '#22820030' }]}
                      onPress={() =>
                        navigation.navigate('ListAbsence', {
                          type: data.staff.type,
                        })
                      }>
                      <Icon
                        name="fingerprint"
                        size={windowHeight * 0.03}
                        color="#228200"
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: scheme === 'dark' ? '#000000' : '#000000' }}>Absen</Text>
                  </View>
                  <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <TouchableOpacity
                      style={[styles.btnRadius, { backgroundColor: '#82008530' }]}
                      onPress={() => navigation.navigate('Request')}>
                      <Icon
                        name="handshake"
                        size={windowHeight * 0.03}
                        color="#820085"
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: scheme === 'dark' ? '#000000' : '#000000'}}>Pengajuan</Text>
                  </View>
                  {console.log('sssssddd', data)}
                  <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    {data.staff.type == 'reguler' ? (
                      <TouchableOpacity
                        style={[
                          styles.btnRadius,
                          { backgroundColor: '#22820030' },
                        ]}
                        onPress={() => {
                          navigation.navigate('Schedule');
                        }}>
                        <Icon
                          name="calendar"
                          size={windowHeight * 0.03}
                          color="#228200"
                        />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.btnRadius,
                          { backgroundColor: '#22820030' },
                        ]}
                        onPress={() => navigation.navigate('ScheduleShift')}>
                        <Icon
                          name="calendar"
                          size={windowHeight * 0.03}
                          color="#228200"
                        />
                      </TouchableOpacity>
                    )}

                    <Text style={{ textAlign: 'center', color: scheme === 'dark' ? '#000000' : '#000000' }}>Jadwal</Text>
                  </View>
                  <View style={{ marginLeft: 'auto' }}>
                    <TouchableOpacity
                      style={[styles.btnRadius, { backgroundColor: '#8B000030' }]}
                      onPress={() =>
                        navigation.navigate('ListHistory', {
                          type: data.staff.type,
                        })
                      }>
                      <Icon
                        name="book"
                        size={windowHeight * 0.03}
                        color="#8B0000"
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: scheme === 'dark' ? '#000000' : '#000000' }}>Histori</Text>
                  </View>
                </View>
                {/* row 2 */}
                <View
                  style={{
                    flexDirection: 'row',
                    width: windowWidht * 0.8,
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    marginTop: windowHeight * 0.03,
                  }}>
                  <View style={{ marginRight: 'auto' }}>
                    <TouchableOpacity
                      style={[styles.btnRadius, { backgroundColor: '#82008530' }]}
                      onPress={() => navigation.navigate('Holiday')}>
                      <Icon
                        name="hiking"
                        size={windowHeight * 0.03}
                        color="#820085"
                      />
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', color: scheme === 'dark' ? '#000000' : '#000000' }}>Libur</Text>
                  </View>
                  <View
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: windowWidht * 0.15,
                      height: windowWidht * 0.15,
                    }}>
                    {/* <TouchableOpacity style={[styles.btnRadius, { backgroundColor: "#82008530" }]} onPress={()=>navigation.navigate('Holiday')} >
            <Icon name="handshake" size={windowHeight * 0.03} color="#820085" />
          </TouchableOpacity> */}
                    {/* <Text style={{ textAlign : 'center' }} >Hari Libur</Text> */}
                  </View>
                  <View
                    style={{
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      width: windowWidht * 0.15,
                      height: windowWidht * 0.15,
                    }}>
                    {/* <TouchableOpacity style={[styles.btnRadius, { backgroundColor: "#AB9A0030" }]} onPress={()=>navigation.navigate('ShiftStaff')} >
            <Icon name="people-carry" size={windowHeight * 0.03} color="#AB9A00" />
          </TouchableOpacity>
          <Text style={{ textAlign : 'center' }} >Shift</Text> */}
                  </View>
                  <View
                    style={{
                      marginLeft: 'auto',
                      width: windowWidht * 0.15,
                      height: windowWidht * 0.15,
                    }}>
                    {/* <TouchableOpacity style={[styles.btnRadius, { backgroundColor: "#8B000030" }]} onPress={()=>navigation.navigate('ListHistory')}>
            <Icon name="book" size={windowHeight * 0.03} color="#8B0000" />
          </TouchableOpacity>
          <Text style={{ textAlign : 'center' }} >Histori</Text> */}
                  </View>
                </View>
              </View>
            </View>

            {/* grapich */}

            <View style={[styles.header, { justifyContent: 'space-between', color: scheme === 'dark' ? '#000000' : '#000000' }]}>
              <Text
                style={{
                  paddingLeft: windowWidht * 0.052,
                  backgroundColor: '#FFFFFF',
                  marginVertical: windowHeight * 0.02,
                  color: scheme === 'dark' ? '#000000' : '#000000'
                }}>
                {data2.year}
              </Text>
              <View style={[{ flexDirection: 'row' }]}>
                <View style={styles.month3}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Report', {
                        start: data2.start3,
                        end: data2.end3,
                        type: data.staff.type,
                      })
                    }
                    style={[
                      styles.chart,
                      {
                        width: windowWidht * 0.22,
                        height: data2.nMonth3
                          ? windowHeight * 0.28 * (data2.nMonth3 / 100)
                          : windowHeight * 0.28,
                        backgroundColor: data2.colorChart3
                          ? data2.colorChart3
                          : '#7a8793',
                        color: scheme === 'dark' ? '#000000' : '#000000'
                      },
                    ]}>
                    <Text style={[styles.textMonth,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>
                      {data2.nMonth3 ? data2.nMonth3 + '' : ''}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>{data2.monthName3}</Text>
                </View>

                <View style={styles.month2}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Report', {
                        start: data2.start2,
                        end: data2.end2,
                        type: data.staff.type,
                      })
                    }
                    style={[
                      styles.chart,
                      {
                        width: windowWidht * 0.22,
                        height: data2.nMonth2
                          ? windowHeight * 0.28 * (data2.nMonth2 / 100)
                          : windowHeight * 0.28,
                        backgroundColor: data2.colorChart2
                          ? data2.colorChart2
                          : '#7a8793',
                        color: scheme === 'dark' ? '#000000' : '#000000'
                      },
                    ]}>
                    <Text style={[styles.textMonth,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>
                      {data2.nMonth2 ? data2.nMonth2 + '' : ''}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>{data2.monthName2}</Text>
                </View>

                <View style={styles.month1}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('Report', {
                        start: data2.start1,
                        end: data2.end1,
                        type: data.staff.type,
                      })
                    }
                    style={[
                      styles.chart,
                      {
                        width: windowWidht * 0.22,
                        height: data2.nMonth1
                          ? windowHeight * 0.28 * (data2.nMonth1 / 100)
                          : windowHeight * 0.28,
                        backgroundColor: data2.colorChart1
                          ? data2.colorChart1
                          : '#7a8793',
                        color: scheme === 'dark' ? '#000000' : '#000000'
                      },
                    ]}>
                    <Text style={styles.textMonth}>
                      {data2.nMonth1 ? data2.nMonth1 + '%' : ''}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>{data2.monthName1}</Text>
                </View>
              </View>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: windowHeight * 0.02 }}>
              <View
                style={{
                  width: windowWidht * 0.05,
                  height: windowWidht * 0.05,
                  marginLeft: windowWidht * 0.02,
                  backgroundColor: data2.colorBox1
                    ? data2.colorBox1
                    : '#7a8793',
                }}></View>
              <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>Kurang</Text>

              <View
                style={{
                  width: windowWidht * 0.05,
                  height: windowWidht * 0.05,
                  marginLeft: windowWidht * 0.02,
                  backgroundColor: data2.colorBox2
                    ? data2.colorBox2
                    : '#7a8793',
                }}></View>
              <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>Cukup</Text>

              <View
                style={{
                  width: windowWidht * 0.05,
                  height: windowWidht * 0.05,
                  marginLeft: windowWidht * 0.02,
                  backgroundColor: data2.colorBox3
                    ? data2.colorBox3
                    : '#7a8793',
                }}></View>
              <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>baik</Text>

              <View
                style={{
                  width: windowWidht * 0.05,
                  height: windowWidht * 0.05,
                  marginLeft: windowWidht * 0.02,
                  backgroundColor: data2.colorBox4
                    ? data2.colorBox4
                    : '#7a8793',
                }}></View>
              <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>sangat baik</Text>
            </View>
          </ScrollView>
          {/* <View style={{ flex : 1, backgroundColor : 'red', fontWeight : 'bold', paddingTop : 'auto', paddingnLeft : 'auto', paddingRight : windowWidht*0.02 }}>
      <Text >V-23.01.30</Text>
      </View> */}
          <Text
            style={{
              marginTop: 'auto',
              marginLeft: 'auto',
              marginRight: windowWidht * 0.02,
              backgroundColor: scheme === 'dark' ? '#FFFFFF' : '#000000',
              color: scheme === 'dark' ? '#000000' : '#000000',
            }}>
            V-15-12-2025 V1
          </Text>
        </SafeAreaView>
        <Footer focus="Home" navigation={navigation} />
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

export default Home;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  btnRadius: {
    backgroundColor: '#D9D9D9',
    width: windowWidht * 0.15,
    height: windowWidht * 0.15,
    borderRadius: (windowWidht * 0.15) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRadius: {
    backgroundColor: '#FFFFFF',
    width: windowWidht * 0.11,
    height: windowWidht * 0.11,
    borderRadius: (windowWidht * 0.11) / 2,
  },
  floatingView: {
    // borderWidth: 2,
    // borderColor: '#00000020',
    width: windowWidht * 0.675,
    height: windowHeight * 0.1,
    // backgroundColor: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: -windowHeight * 0.04,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    height: windowHeight * 0.35,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    paddingBottom: windowHeight * 0.02,
  },
  month1: {
    alignItems: 'center',
    marginRight: 'auto',
    marginTop: 'auto',
    marginLeft: windowWidht * 0.05,
  },
  month2: {
    alignItems: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
  },
  month3: {
    alignItems: 'center',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginRight: windowWidht * 0.05,
  },
  chart: {
    backgroundColor: '#FFE600',
    width: windowWidht * 0.22,
    height: windowHeight * 0.28 * 0.5,
  },
  textMonth: {
    color: '#FFFFFF',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginTop: 'auto',
    marginRight: 'auto',
  },
});
