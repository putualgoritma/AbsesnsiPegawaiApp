import {
  ImageHeader,
  Images,
  logo512,
  history,
  mapping,
  lock,
} from '../../assets';

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import myFunctions from '../../functions';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TextInput,
  ImageBackground,
  Dimensions,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  BackHandler,
  Alert,
  StatusBar,
} from 'react-native';
import {OneSignal} from 'react-native-onesignal';
import { useDispatch } from 'react-redux';
import { Header, In, Inpt, Spinner, Txt } from '../../component';
import {
  SET_DATA_PERMISSION,
  SET_DATA_TOKEN,
  SET_DATA_USER,
} from '../../redux/action';
import API from '../../service';
import { Distance } from '../../utils';
import { useIsFocused } from '@react-navigation/native';
import ScreenLoading from '../loading/ScreenLoading';
import Icon from 'react-native-vector-icons/FontAwesome5';
import DeviceInfo from 'react-native-device-info';
import Config from 'react-native-config';
// const date = new Date();

// const hours = date.getHours();
// const minutes = date.getMinutes();
// const seconds = date.getSeconds();
// const time = hours+':'+minutes+':'+seconds;
const Login = ({ navigation }) => {
  const [visible, setVisible] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    email: null,
    password: null,
    _id_onesignal: null,
    device: 1,
  });
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    console.log('use effect login', Config.login);
    // DeviceInfo.getDevice().then((device) => {
    //   // "walleye"
    //   setForm({...form, device : device})
    // });
    myFunctions.permissionLocation(),
      signupOnesignal()
        .then(result => {
          // alert(result);
          console.log('update onesignal', result);
          setForm({ ...form, _id_onesignal: result });
          // setLoading(false)
        })
        .catch(e => {
          console.log(e);
          alert(e);
          // setLoading(false);
        });
    DeviceInfo.getDeviceName().then(deviceName => {
      console.log('nama hp 99', deviceName);
      setForm({ ...form, device: deviceName });
      // setLoading(false);
    });

    //  let model = DeviceInfo.getModel();
    //  console.log('nama hp', model)

    //  DeviceInfo.getFingerprint().then((fingerprint) => {
    //    console.log('nama hp', fingerprint)
    //  });
    setTimeout(() => {
      // setSpinner(false);
      signupOnesignal()
        .then(result => {
          // alert(result);
          console.log('update onesignal', result);
          setForm({ ...form, _id_onesignal: result });
          // setLoading(false)
          console.log(result);
        })
        .catch(e => {
          console.log(e);
          alert(e);
          // setLoading(false);
        });
      DeviceInfo.getDeviceName().then(deviceName => {
        console.log('nama hp 99', deviceName);
        setForm({ ...form, device: deviceName });
        // setLoading(false);
      });
      console.log('jalannnn');
      setLoading(false);
    }, 10000);

    return () => {
      setForm({
        password: null,
        // _id_onesignal: null,
        email: null,
        device: null,
      });
      console.log('dddd', form);
    };
  }, []);

  const signupOnesignal = async () => {
    try {
      // ✅ Initialize SDK (replaces setAppId)
      OneSignal.initialize('282dff1a-c5b2-4c3d-81dd-9e0c2b82114b');

      // ✅ Enable debug logging (replaces setLogLevel)
      OneSignal.Debug.setLogLevel(6);

      // ✅ Ask for push notification permission
      const permission = await OneSignal.Notifications.requestPermission(true);
      console.log('🔔 Notification permission:', permission);

      // ✅ Get device info (replaces getDeviceState)
      const device = await OneSignal.User.getOnesignalId();
      console.log('🆔 OneSignal device ID:', device);

      // If you need additional device info:
      const user = await OneSignal.User.getExternalId();
      console.log('👤 External ID:', user);

      // ✅ Return the OneSignal player ID (user ID)
      return device;
    } catch (e) {
      console.error('❌ OneSignal initialization error:', e);
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

  const handleAction = () => {
    setLoading(true);
    const user = {
      email: form.email,
      password: form.password,
      _id_onesignal: form._id_onesignal,
      device: form.device,
    };
    console.log(user);

    console.log('1' + form.email + '2' + form._id_onesignal);

    if (!user._id_onesignal) {
      signupOnesignal()
        .then(result => {
          // alert(result);
          console.log('val1');
          console.log('update onesignal', result);
          user._id_onesignal = result;
          if (user._id_onesignal) {
            console.log('val2');
            handleLogin(user);
          } else {
            const user = {
              email: form.email,
              password: form.password,
              _id_onesignal: form._id_onesignal,
              device: form.device,
            };
            handleLogin(user);
          }
        })
        .catch(e => {
          console.log('val3');
          handleLogin(user);
          console.log(e);
        });
    } else {
      console.log('val4');
      handleLogin(user);
    }
    console.log('val500');
  };

  const handleLogin = user => {
    console.log('tesssss1');
    console.log(user);
    if (
      user.email != null &&
      user.password != null &&
      user._id_onesignal != null &&
      user.device != null
    ) {
      console.log('API');
      API.login(user).then(result => {
        if (result.success) {
          result.data['password'] = result.password;
          console.log('password');
          // dispatch(SET_DATA_USER(result.data))
          // dispatch(SET_DATA_TOKEN(result.token))
          // dispatch(SET_DATA_PERMISSION(result.permission))
          // storeDataToken(result.token)
          // storeDataUser(result.data)
          // storeDataPermission(result.permission)
          // navigation.replace('Home')
          Promise.all([
            storeDataPermission(result.permission),
            storeDataUser(result.data),
            storeDataToken(result.token),
          ])
            .then(success => {
              dispatch(SET_DATA_USER(result.data));
              dispatch(SET_DATA_TOKEN(result.token));
              dispatch(SET_DATA_PERMISSION(result.permission));
              navigation.replace('Home');
            })
            .catch(e => console.log(e))
            .finally(f => setLoading(false));
        } else {
          alert(result.message);
          setLoading(false);
        }
      });
    } else {
      alert('mohon lengkapi data');
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ScreenLoading />}
      {!loading && (
        <View style={[{ alignItems: 'center' }, styles.imgBg]}>
          <Text style={styles.labelTitle}></Text>
          <Text style={styles.label3white}></Text>

          <Text style={[styles.label1, { color: '#FFFFFF' }]}>Login</Text>
          <View style={styles.floatingScreen}>
            <View>
              <Image source={logo512} style={styles.images} />
            </View>
            <Text style={styles.label3}></Text>

            <View
              style={{
                flexDirection: 'row',
                width: windowWidht * 0.8,
                marginHorizontal: windowWidht * 0.04,
              }}>
              <Icon name="user" size={windowHeight * 0.04} color="#000000" />
              <TextInput
                style={styles.formInput}
                placeholder="Masukan Email"
                onChangeText={item => setForm({ ...form, email: item })}
              />
            </View>
            <Text style={styles.label3}></Text>

            <View
              style={{
                flexDirection: 'row',
                width: windowWidht * 0.8,
                marginHorizontal: windowWidht * 0.04,
              }}>
              <Icon name="lock" size={windowHeight * 0.04} color="#000000" />
              <TextInput
                style={styles.formInput}
                placeholder="Masukan Password"
                secureTextEntry={visible}
                onChangeText={item => setForm({ ...form, password: item })}
              />
              <TouchableOpacity
                onPress={() => {
                  !visible ? setVisible(true) : setVisible(false);
                }}>
                {!visible && (
                  <Icon
                    name="eye-slash"
                    size={windowHeight * 0.04}
                    color="#000000"
                  />
                )}
                {visible && (
                  <Icon name="eye" size={windowHeight * 0.04} color="#000000" />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleAction()}>
              <Text style={[styles.label2, { color: '#FFFFFF' }]}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Login;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  formInput: {
    borderBottomWidth: 1,
    width: windowWidht * 0.6,
    marginTop: -windowHeight * 0.02,
    borderBottomColor: 'grey',
    marginLeft: windowWidht * 0.05,
    // marginHorizontal : windowWidht*0.04,
  },
  imgBg: {
    height: windowHeight * 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: '#4169E1',
  },
  loadingImg: {
    alignItems: 'center',
    paddingTop: windowHeight * 0.04,
  },
  loading: {
    alignItems: 'center',
  },
  historyDay: {
    backgroundColor: '#FFFFFF',
    height: windowHeight * 0.18,
    width: windowWidht * 0.9,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  floatingScreen: {
    marginTop: windowHeight * 0.02,
    width: windowWidht * 0.9,
    height: windowHeight * 0.35,
    borderRadius: 6,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  labelTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: windowHeight * 0.03,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label1: {
    fontSize: 35,
    marginBottom: windowHeight * 0.1,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 20,
  },
  label2white: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  label2whitecenter: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  label3: {
    color: '#000000',
    fontSize: 16,
  },
  label3white: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  label2blue: {
    fontSize: 20,
    color: 'rgba(0,0,255,1)',
  },
  center: {
    // marginTop: windowHeight*0.1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },

  iconGroup: {
    flexDirection: 'row',
  },

  square: {
    alignItems: 'center',
    height: windowWidht * 0.22,
    width: windowWidht * 0.22,
    marginTop: windowWidht * 0.05,
    marginHorizontal: windowWidht * 0.1,
    backgroundColor: 'rgba(0,191,255,0.1)',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,191,255,0.01)',
  },

  iconBack: {
    alignItems: 'center',
    height: windowWidht * 0.3,
    width: windowWidht * 0.3,
    marginTop: windowWidht * 0.05,
    marginHorizontal: windowWidht * 0.1,
    backgroundColor: '#FFFFFF',
  },
  icon: {
    marginVertical: windowHeight * 0.01,
    width: windowWidht * 0.26,
    height: windowWidht * 0.26,
    borderWidth: 5,
    borderColor: 'red',
  },
  images: {
    width: windowHeight * 0.12,
    height: windowHeight * 0.12,
    marginRight: 10,
    borderRadius: 150 / 2,
    marginTop: -windowHeight * 0.05,
    overflow: 'hidden',
    // borderWidth: 1,
    borderColor: '#4169E1',
  },
  imagesLoading: {
    width: windowHeight * 0.12,
    height: windowHeight * 0.12,
    marginRight: 10,
    // borderRadius : 150/2,
    marginTop: windowHeight * 0.01,
    overflow: 'hidden',
    // borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
  },

  centerModal: {
    marginTop: windowHeight * 0.19,

    alignItems: 'center',
  },
  marginH: {
    marginHorizontal: windowWidht * 0.04,
    marginTop: windowHeight * 0.02,
  },
  leftButton: {
    width: windowWidht * 0.9,
  },

  marginTop: {
    marginTop: windowHeight * 0.05,
  },
  //dari react native
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginHorizontal: windowWidht * 0.05,
    marginTop: windowHeight * 0.04,
    width: windowWidht * 0.8,
    borderRadius: 3,
    // borderWidth : 1,
    // borderColor : "red",
    height: windowHeight * 0.05,
    backgroundColor: '#09aeae',
    alignItems: 'center',
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#FF3131',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 'auto',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
