import { Alert, Platform } from 'react-native';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ReactNativeBiometrics from 'react-native-biometrics';
import Geolocation from '@react-native-community/geolocation';
import {
  isMockingLocation,
  MockLocationDetectorErrorCode,
} from 'react-native-turbo-mock-location-detector';

const rnBiometrics = new ReactNativeBiometrics();

/* -------------------------------------------------------------------------- */
/* CAMERA PERMISSION                                                          */
/* -------------------------------------------------------------------------- */
const permissionCamera = async () => {
  try {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.CAMERA,
      ios: PERMISSIONS.IOS.CAMERA,
    });

    const res = await check(permission);

    if (res === RESULTS.GRANTED) return true;
    if (res === RESULTS.BLOCKED || res === RESULTS.UNAVAILABLE) return false;

    if (res === RESULTS.DENIED) {
      const req = await request(permission);
      return req === RESULTS.GRANTED;
    }

    return false;
  } catch {
    return false;
  }
};

/* -------------------------------------------------------------------------- */
/* LOCATION PERMISSION (SAFE FOR ANDROID 10—14)                               */
/* -------------------------------------------------------------------------- */
const permissionLocation = async () => {
  try {
    const permFine = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    const permCoarse = PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;

    // CHECK FINE FIRST
    const fine = await check(permFine);
    if (fine === RESULTS.GRANTED) return true;

    // REQUEST IF DENIED
    if (fine === RESULTS.DENIED) {
      const req = await request(permFine);
      if (req !== RESULTS.GRANTED) return false;
      return true;
    }

    if (fine === RESULTS.BLOCKED) return false;

    // ANDROID COARSE FALLBACK
    if (Platform.OS === "android") {
      const coarse = await check(permCoarse);
      if (coarse === RESULTS.GRANTED) return true;
    }

    return false;

  } catch {
    return false;
  }
};

/* -------------------------------------------------------------------------- */
/* VERY STABLE GPS CHECK (NO FREEZE, HIGH ACCURACY OPTIONAL)                  */
/* -------------------------------------------------------------------------- */
const checkGps = async (highAccuracy = true) => {
  console.log("accuracy mode:", highAccuracy);

  const options = {
    enableHighAccuracy: highAccuracy,
    timeout: 15000,
    maximumAge: 0
  };

  const getPosition = () =>
    new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(resolve, reject, options);
    });

  // manual timeout protection (10s)
  const manualTimeout = new Promise(resolve => {
    setTimeout(() => resolve({ timeout: true }), 10000);
  });

  try {
    const result = await Promise.race([getPosition(), manualTimeout]);

    if (result.timeout) {
      console.log("GPS Timeout");
      return {
        status: false,
        data: null,
        reason: "timeout"
      };
    }

    return {
      status: true,
      data: result.coords,
      reason: null
    };

  } catch (err) {
    console.log("GPS ERROR =>", err);
    return {
      status: false,
      data: null,
      reason: err.message || "GPS error"
    };
  }
};

/* -------------------------------------------------------------------------- */
/* FINGERPRINT CHECK (_FIXED_)                                                */
/* -------------------------------------------------------------------------- */
export const checkFingerprint = async () => {
  try {
    const { available, biometryType } = await rnBiometrics.isSensorAvailable();

    if (!available) return false;

    // Accept all valid types from both Android and iOS
    const allowedTypes = [
      rnBiometrics.TouchID,
      rnBiometrics.FaceID,
      rnBiometrics.Biometrics,
      "Fingerprint",   // <-- Android
      "Biometrics",    // <-- Android
    ];

    return allowedTypes.includes(biometryType);

  } catch (error) {
    console.log("checkFingerprint error:", error);
    return false;
  }
};


/* -------------------------------------------------------------------------- */
/* FAKE GPS CHECK (FAST + NEVER FREEZE)                                       */
/* -------------------------------------------------------------------------- */
const fakeGps = async () => {
  console.log("Fake GPS check");
  try {
    const result = await Promise.race([
      isMockingLocation(),
      new Promise(resolve =>
        setTimeout(() =>
          resolve({ isLocationMocked: false }), 5000)
      )
    ]);

    return !!result.isLocationMocked;

  } catch (error) {
    console.log("fakeGps error:", error);
    Alert.alert(
      "Fake GPS Error",
      `Code: ${error.code}\nMessage: ${error.message}`
    );
    return false;
  }
};

/* -------------------------------------------------------------------------- */

const myFunctions = {
  permissionCamera,
  permissionLocation,
  checkGps,
  fakeGps,
  checkFingerprint,
};

export default myFunctions;
