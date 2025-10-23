import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import NetInfo, {refresh} from '@react-native-community/netinfo';
import {
  SET_DATA_PERMISSION,
  SET_DATA_TOKEN,
  SET_DATA_USER,
  SET_DATA_HIGHTACCURACY,
} from '../../redux/action';
import API from '../../service';
import ScreenLoading from '../loading/ScreenLoading';
const SplashScreen = ({navigation}) => {
  const image = require('../../assets/img/SplashScreen.png');
  const dispatch = useDispatch();
  const [isOffline, setOfflineStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = () => {
    setLoading(true);
    Promise.all([
      getDataUser(),
      getDataToken(),
      getDataPermission(),
      getDataHightAccuracy(),
    ])
      .then(response => {
        console.log('sudah login 1');
        if (response[0] !== null && response !== response[1]) {
          let user = response[0];
          console.log('tesssdddff', user);
          API.login({
            email: user.email,
            password: user.password,
            _id_onesignal: user._id_onesignal,
            login_date: user.login_date,
          })
            .then(result => {
              if (result.success) {
                console.log('sudah login', result);
                result.data['password'] = result.password;
                dispatch(SET_DATA_USER(result.data));
                dispatch(SET_DATA_TOKEN(result.token));
                dispatch(SET_DATA_PERMISSION(result.permission));
                storeDataToken(result.token);
                storeDataUser(result.data);

                if (response[3]) {
                  dispatch(SET_DATA_HIGHTACCURACY(response[3]));
                }

                storeDataPermission(result.permission);
                navigation.replace('Home');
              } else {
                setTimeout(() => {
                  navigation.replace('Login');
                }, 2000);
              }
            })
            .catch(e => {
              console.log(e);
              Alert.alert(
                'Masalah koneksi',
                'cek koneksi anda dan buka ulang aplikasi',
              );
              setLoading(false);
              // Alert.alert(
              //   'Masalah koneksi',
              //   'cek koneksi anda dan buka ulang aplikasi',
              // );
            });
        } else {
          setTimeout(() => {
            navigation.replace('Login');
            setLoading(false);
          }, 2000);
        }
      })
      .catch(e => {
        setTimeout(() => {
          navigation.replace('Login');
        }, 2000);
        console.log('data local tidak dibaca');
      });
  };

  useEffect(() => {
    // NetInfo.addEventListener(state => {
    //   const offline = !(state.isConnected && state.isInternetReachable);
    //   if (offline) {
    //     //alert('Cek koneksi internet');
    //   } else {
    console.log('ini di splashscreen');
    let isAmounted = false;
    if (!isAmounted) {
      Promise.all([
        getDataUser(),
        getDataToken(),
        getDataPermission(),
        getDataHightAccuracy(),
      ])
        .then(response => {
          console.log('sudah login 1');
          if (response[0] !== null && response !== response[1]) {
            let user = response[0];
            console.log('tesssdddff', user);
            API.login({
              email: user.email,
              password: user.password,
              _id_onesignal: user._id_onesignal,
              login_date: user.login_date,
            })
              .then(result => {
                if (result.success) {
                  console.log('sudah login', result);
                  result.data['password'] = result.password;
                  dispatch(SET_DATA_USER(result.data));
                  dispatch(SET_DATA_TOKEN(result.token));
                  dispatch(SET_DATA_PERMISSION(result.permission));

                  if (response[3]) {
                    dispatch(SET_DATA_HIGHTACCURACY(response[3]));
                  }

                  storeDataToken(result.token);
                  storeDataUser(result.data);
                  storeDataPermission(result.permission);
                  navigation.replace('Home');
                } else {
                  navigation.replace('Login');
                }
              })
              .catch(e => {
                console.log(e);
                Alert.alert(
                  'Masalah koneksi',
                  'cek koneksi anda dan buka ulang aplikasi',
                );
                setLoading(false);
                // Alert.alert(
                //   'Masalah koneksi',
                //   'cek koneksi anda dan buka ulang aplikasi',
                // );
              });
          } else {
            setTimeout(() => {
              navigation.replace('Login');
              setLoading(false);
            }, 2000);
          }
        })
        .catch(e => {
          setTimeout(() => {
            navigation.replace('Login');
          }, 2000);
          console.log('data local tidak dibaca');
        });
    }
    return () => {
      isAmounted = true;
    };
    //   }
    // });
  }, []);

  const getDataUser = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@LocalUser');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      // console.log('local user',jsonValue);
    } catch (e) {
      // error reading value
    }
  };

  const getDataHightAccuracy = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@LocalHightAccuracy');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      // console.log('local user',jsonValue);
    } catch (e) {
      // error reading value
    }
  };

  const getDataToken = async () => {
    try {
      const value = await AsyncStorage.getItem('@LocalToken');
      if (value !== null) {
        return value;
      }
    } catch (e) {
      // error reading value
    }
  };

  const getDataPermission = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@LocalPermission');
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };

  const storeDataUser = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@LocalUser', jsonValue);
    } catch (e) {
      console.log('no save');
    }
  };

  const storeDataToken = async value => {
    try {
      await AsyncStorage.setItem('@LocalToken', value);
    } catch (e) {
      console.log('TOken not Save ');
    }
  };

  const storeDataPermission = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@LocalPermission', jsonValue);
    } catch (e) {
      console.log('no save', e);
    }
  };

  return loading ? (
    <ScreenLoading />
  ) : (
    <View style={styles.container}>
      <Text>cek koneksi internet dan lakukan refresh</Text>
      <TouchableOpacity style={styles.btn} onPress={() => refresh()}>
        <Text>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidht = Dimensions.get('window').width;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  btn: {
    width: windowWidht * 0.4,
    height: windowHeight * 0.08,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default SplashScreen;