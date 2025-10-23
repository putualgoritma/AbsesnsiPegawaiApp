import {
  faCamera,
  faPlusCircle,
  faTrash,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../../Colors';
import {CameraImage, Camera_icon, logo512} from '../../assets';
import ImgArrFunction from '../../Function/ImgArrFunction';
// import {colors, Distance} from '../../utils';

const MultypleImage = props => {
  const [qty, setQty] = useState(1);
  const [show, setShow] = useState(true);

  var myloop = [];
  for (let index = 0; index < qty; index++) {
    myloop.push(
      <View key={index}>
        <TouchableOpacity
          onPress={() =>
            ImgArrFunction.getImageArr(
              props.dataImage,
              props.setDataImage,
              props.dataImage[index] ? index : null,
            )
          }
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            height: windowHeight * 0.45,
            alignItems: 'center',
          }}>
          <Image
            style={
              props.dataImage[index] == null
                ? {width: '40%', height: 80}
                : {width: windowWitdh * 0.8, height: windowHeight * 0.45}
            }
            source={
              props.dataImage[index] == null
                ? CameraImage
                : {uri: 'file://' + props.dataImage[index].uri}
            }
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}></View>
      </View>,
    );
  }

  return (
    <View>
      {myloop}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 'auto',
          marginVertical: 10,
          marginRight: windowWitdh * 0.05,
        }}>
        {props.dataImage[qty - 1] != null && (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: Colors.primary,
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
            onPress={() => {
              setQty(qty + 1);
              setShow(true);
            }}>
            <FontAwesomeIcon icon={faPlusCircle} size={20} color={'#FFFFFF'} />
            <Text
              style={{
                color: '#ffffff',
                fontWeight: 'bold',
                fontSize: 15,
                marginLeft: 3,
              }}>
              Tambah
            </Text>
          </TouchableOpacity>
        )}
        <View style={{marginHorizontal: 3}} />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.danger,
            flexDirection: 'row',
            paddingHorizontal: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            qty > 1
              ? Alert.alert('Peringatan', `Anda Yakin Menghapus Foto ? `, [
                  {
                    text: 'Tidak',
                    // onPress : () => console.log('tidak')
                  },
                  {
                    text: 'Ya',
                    // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                    onPress: () => {
                      setQty(qty - 1);
                      ImgArrFunction.deleteImage(
                        props.dataImage,
                        props.setDataImage,
                        qty,
                      );
                    },
                  },
                ])
              : alert('data tidak boleh dihapus');
          }}>
          <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
          <Text
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 15,
              marginLeft: 3,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 3}} />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.info,
            flexDirection: 'row',
            paddingHorizontal: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            setQty(1);
            ImgArrFunction.resetImage(props.dataImage, props.setDataImage);
          }}>
          <FontAwesomeIcon icon={faUndo} size={17} color={'#FFFFFF'} />
          <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MultypleImage;

const windowWitdh = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    width: windowWitdh * 0.9,
    height: windowHeight * 0.3,
    backgroundColor: '#D9DDDC',
    borderColor: Colors.dark,
    borderWidth: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: windowHeight * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  button: {
    marginLeft: 'auto',
    width: windowWitdh * 0.25,
    height: windowHeight * 0.04,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWitdh * 0.01,
  },
  txtButton: {
    color: Colors.white,
  },
  groupBottonRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: windowWitdh * 0.05,
    width: windowWitdh * 0.6,
    marginBottom: windowHeight * 0.02,
  },
});
