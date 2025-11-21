// 'use strict';
import React, { useRef, useMemo } from 'react';
import { useEffect, useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  Dimensions,
} from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNFetchBlob from 'react-native-blob-util';
import { Camera, useCameraDevices, useCameraFormat } from 'react-native-vision-camera';

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
  const device = devices?.front || Object.values(devices).find(d => d.position === 'front');
  const camera = useRef(null);

  async function requestPermissionOff() {
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

  async function requestPermission() {
    try {
      // Request only camera and microphone permissions
      const cameraPermission = await Camera.requestCameraPermission();
      const microphonePermission = await Camera.requestMicrophonePermission();

      console.log('Camera permission:', cameraPermission);
      console.log('Microphone permission:', microphonePermission);

      // 🚫 Removed READ_EXTERNAL_STORAGE / READ_MEDIA_IMAGES
      // so user cannot open or access gallery

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
    try {
      if (!camera.current) return;
      const photo = await camera.current.takePhoto({
        flash: 'off',
        qualityPrioritization: 'balanced',
        skipMetadata: false,
      });

      const uri = photo.path.startsWith('file://') ? photo.path : `file://${photo.path}`;

      // Normal portrait path
      const base64data = await RNFetchBlob.fs.readFile(uri.replace('file://', ''), 'base64');
      navigation.navigate(route.params.link, {
        ...route.params,
        image: { uri, base64: base64data, filename: `img-${Date.now()}` },
      });
    } catch (e) {
      console.error('takePhoto error', e);
    }
  };

  const format = useCameraFormat(device, [
    { photoResolution: { width: 675, height: 900 } },
  ]);


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
          format={format}
          resizeMode="cover"
        />

        {/* Overlay your button above camera */}
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={takePicture}
            style={btnAble ? styles.captureDisabled : styles.capture}
            disabled={btnAble}>
            <Text style={{ fontSize: 14, color: '#000' }}>Ambil</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <Camera
          ref={camera}
          style={styles.preview}
          device={device}
          isActive={true}
          photo={true}
          format={format}
          resizeMode="cover"
        />

        {/* Overlay the button above camera */}
        <View
          style={{
            position: 'absolute',
            bottom: 60,
            width: '100%',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={takePicture}
            style={styles.capture}>
            <Text style={{ fontSize: 14, color: '#000' }}>Ambil</Text>
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
