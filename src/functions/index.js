import { Alert, Platform, View } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ReactNativeBiometrics from 'react-native-biometrics';
import Geolocation from '@react-native-community/geolocation';
import {
  isMockingLocation,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';
const rnBiometrics = new ReactNativeBiometrics();

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

const permissionLocation = async () => {
  //setLoading(true);
  try {
    const res = await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    );
    if (res === RESULTS.GRANTED) {
      console.log('LocationGranted check', 'Yes');
      //setLoading(false);
      return true;
    } else if (res === RESULTS.DENIED) {
      const res2 = await request(
        Platform.select({
          android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
        }),
      );
      if (res2 === RESULTS.GRANTED) {
        console.log('LocationGranted request', 'Yes');
        //setLoading(false);
        return true;
      } else {
        console.log('LocationGranted request', 'No');
        //setLoading(false);
        return false;
      }
    }
  } catch (err) {
    console.log('err LocationGranted request', err);
    //setLoading(false);
    return false;
  }
};

const checkGps = async accuracy => {

  console.log('accuracy', accuracy);
  const opt = {
    // enableHighAccuracy: accuracy,
    enableHighAccuracy: accuracy,
    timeout: 20000,
    // timeout: 30000,
    // maximumAge: 10000,
    maximumAge: 0,
    // accuracy: 'high',
  };
  const getCurrentPosition = () =>
    new Promise((resolve, error) =>
      Geolocation.getCurrentPosition(resolve, error, opt),
    );
  try {
    const position = await getCurrentPosition();
    //setLoading(false);
    console.log('GPSSS : ', position.coords);
    return { status: true, data: position.coords };
  } catch (err) {
    console.log('errrggggg', err);
    // Alert.alert('GPS', 'GPS mati, tolong hidupkan GPS!');
    //setLoading(false);
    return { status: false, data: null };
  }
};

export const checkFingerprint = async () => {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (!available) {
      Alert.alert(
        'HP tidak support fingerprint',
        'Konfirmasi ke admin untuk menonaktifkan fitur fingerprint *abaikan jika sudah konfirmasi ke admin',
      );
      return true;
    }

    return true;
    // console.log('Biometry type:', biometryType);

    // const { success } = await rnBiometrics.simplePrompt({
    //   promptMessage: 'Verifikasi sidik jari untuk melanjutkan',
    //   cancelButtonText: 'Batal',
    // });

    // if (success) {
    //   console.log('Fingerprint verified successfully');
    //   return true;
    // } else {
    //   Alert.alert('Verifikasi dibatalkan');
    //   return false;
    // }
  } catch (error) {
    Alert.alert('Fingerprint err', 'Fingerprint tidak jalan!');
    return true;
    // if (error.name === 'UserCancel') {
    //   Alert.alert('Verifikasi dibatalkan oleh pengguna');
    // } else {
    //   Alert.alert('Fingerprint Error', error.message || 'Fingerprint gagal!');
    // }
    // return false;
  }
};

const fakeGps = async () => {
  console.log('Fake GPS');
  // return true;
  await isMockingLocation()
    .then(({ isLocationMocked }) => {
      if (isLocationMocked === true) {
        // Alert.alert('gps palsu');
        // console.log('fake');
        return true;
      } else {
        // console.log('real');
        // Alert.alert('gps asli');
        return true;
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

const myFunctions = {
  permissionCamera,
  permissionLocation,
  checkGps,
  fakeGps,
  checkFingerprint,
};

export default myFunctions;
