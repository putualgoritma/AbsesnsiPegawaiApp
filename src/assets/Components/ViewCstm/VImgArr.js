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

const VImgArr = props => {
  const [qty, setQty] = useState(props.dataImage.length);
  const [show, setShow] = useState(true);

  var myloop = [];

  console.log('sdkdkkms ', props.dataImage[0].image);

  for (let index = 0; index < 1; index++) {
    myloop.push(
      <View key={index}>
        <TouchableOpacity
          onPress={props.onPress}
          style={{
            marginVertical: 10,
            justifyContent: 'center',
            height: windowHeight * 0.45,
            alignItems: 'center',
          }}>
          <Image
            style={{width: windowWitdh * 0.8, height: windowHeight * 0.45}}
            source={{
              uri:
                'https://simpletabadmin.ptab-vps-storage.com/images/Visit/' +
                props.dataImage[index].image,
            }}
          />
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}></View>
      </View>,
    );
  }

  return <View>{myloop}</View>;
};

export default VImgArr;

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
