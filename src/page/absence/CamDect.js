// 'use strict';
import React, { useRef } from 'react';
import { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-blob-util';
import { Camera, useCameraDevices } from 'react-native-vision-camera';

const CamDect = ({ navigation, route }) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [form, setForm] = useState({
    noWM1: '',
    brandWM1: '',
    standWM1: '',
    noWM2: '',
    brandWM2: '',
    standWM2: '',
    lat: '',
    lng: '',
  });
  const [btnAble, setBtinAble] = useState(false);
  const devices = useCameraDevices();
  const device = devices?.front ?? Object.values(devices)[1];
  const camera = useRef(null);

  async function requestPermission() {
    try {
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();
      console.log('Camera permission:', cameraPermission);
      console.log('Microphone permission:', microphonePermission);

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          Platform.Version >= 33
            ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
            : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      }

      const granted =
        (cameraPermission === 'authorized' || cameraPermission === 'granted') &&
        (microphonePermission === 'authorized' || microphonePermission === 'granted');

      setHasPermission(granted);
      return granted;
    } catch (error) {
      console.error('Permission error:', error);
      return false;
    }
  }

  useEffect(() => {
    (async () => {
      const status = await requestPermission();
      console.log('Camera permission status:', status);
      if (!status) {
        alert('Camera permission denied.\nPlease allow access in settings.');
      }
    })();

    const timer = setInterval(() => {
      setBtinAble(false);
    }, 2000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    console.log('Available camera devices:', devices);
    if (devices && Object.keys(devices).length === 0) {
      console.log('⚠️ No camera devices found!');
    } else if (devices.back) {
      console.log('✅ Back camera detected:', devices.back.name);
    } else if (devices.front) {
      console.log('✅ Front camera detected:', devices.front.name);
    }
  }, [devices]);

  const takePicture = async () => {
    if (camera.current == null) return;

    try {
      const d = new Date();
      const nm = form.id + d.getHours() + d.getMinutes() + d.getSeconds();
      console.log('form:', form);

      // Take photo using Vision Camera
      const photo = await camera.current.takePhoto({
        flash: device?.hasFlash ? 'on' : 'off',
        qualityPrioritization: 'balanced',
      });

      console.log('Photo captured:', photo.path);
      const uri = photo.path.startsWith('file://') ? photo.path : `file://${photo.path}`;

      // Resize the image (same as before)
      const resized = await ImageResizer.createResizedImage(
        uri,
        900,
        900,
        'JPEG',
        100,
        0,
        undefined,
        false,
        {},
      );

      // Convert resized image to base64
      const base64data = await RNFetchBlob.fs.readFile(resized.path, 'base64');

      const gambar = {
        uri: resized.uri,
        base64: base64data,
        filename: `${route.params.absence_id}${nm}`,
      };

      //console.log('Final image:', gambar);

      // Navigate to next screen with all original route params
      navigation.navigate(route.params.link, {
        highAccuracy: route.params.highAccuracy,
        lat: route.params.lat,
        lng: route.params.lng,
        radius: route.params.radius,
        id: route.params.id,
        queue: route.params.queue,
        absence_id: route.params.absence_id,
        type: route.params.type,
        image: gambar,
        absence_request_id: route.params.absence_request_id,
        expired_date: route.params.expired_date,
        absence_category_id: route.params.absence_category_id,
        absence_category_id_end: route.params.absence_category_id_end,
        fingerfrint: route.params.fingerfrint,
        selfie: route.params.selfie,
      });

      //setLoading1(false);
    } catch (err) {
      console.error('Error capturing image:', err);
      alert('Failed', 'Failed to capture image.');
      //setLoading1(false);
    }
  };

  if (!hasPermission) {
    return (
      <View style={styles.loader}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (device == null) {
    return (
      <View style={styles.loader}>
        <Text>Loading camera...</Text>
      </View>
    );
  }

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <Camera
          ref={camera}
          style={styles.preview}
          device={device}
          isActive={true}
          photo={true}
        />

        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={takePicture}
            style={btnAble ? styles.captureDisabled : styles.capture}
            disabled={btnAble}>
            <Text style={{ fontSize: 14 }}>Ambil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Camera
          ref={camera}
          style={styles.preview}
          device={device}
          isActive={true}
          photo={true}
        />

        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity
            onPress={takePicture}
            style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Ambil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

export default CamDect;

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: colors.profileTabSelectedColor
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  captureF: {
    flex: 0,
    backgroundColor: '#d72503',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
