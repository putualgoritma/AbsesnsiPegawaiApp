import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    PermissionsAndroid,
    Platform,
    Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import Orientation from 'react-native-orientation-locker';
import RNFetchBlob from 'react-native-blob-util';

export const InlineVisionCamera = ({ route, imageUri, setImageUri }) => {
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const camera = useRef(null);
    const device = useCameraDevice(
        'back',
    );

    useEffect(() => {
        // Lock screen to portrait when camera is open
        if (isCameraOpen) Orientation.lockToPortrait();
        else Orientation.unlockAllOrientations();
    }, [isCameraOpen]);

    const requestPermission = async () => {
        const permission =
            Platform.OS === 'android'
                ? await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                )
                : await Camera.requestCameraPermission();

        return permission === 'granted';
    };

    const takePhoto = async () => {
        if (!camera.current) return;
        const photo = await camera.current.takePhoto({
            qualityPrioritization: 'quality',
            skipMetadata: true,
        });

        const uri = 'file://' + photo.path;
        setImageUri(uri);

        const base64data = await RNFetchBlob.fs.readFile(uri.replace('file://', ''), 'base64');
        // mimic your route param logic
        route.params.image = {
            uri,
            filename: photo.path.split('/').pop(),
            from: 'local',
            base64: base64data
        };

        setIsCameraOpen(false);
    };

    const openCamera = async () => {
        const granted = await requestPermission();
        if (granted) setIsCameraOpen(true);
    };

    if (isCameraOpen && device) {
        return (
            <Modal visible={isCameraOpen} animationType="slide" presentationStyle="fullScreen">
                <View style={styles.fullscreen}>
                    <Camera
                        ref={camera}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        isActive={true}
                        photo={true}
                    />
                    <TouchableOpacity style={styles.captureButton} onPress={takePhoto}>
                        <Icon name="camera" size={40} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>

        );
    }

    return (
        <TouchableOpacity onPress={openCamera}>
            {imageUri === '' ? (
                <View style={styles.image}>
                    <Icon name="camera-retro" size={80} color="#000" />
                </View>
            ) : (
                <Image style={styles.image} source={{ uri: imageUri }} />
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    fullscreen: {
        flex: 1,
        backgroundColor: 'black',
    },
    captureButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#00000088',
        padding: 16,
        borderRadius: 40,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ddd',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
    },
});
