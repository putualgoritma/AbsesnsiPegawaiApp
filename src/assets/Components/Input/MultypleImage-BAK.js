import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';
// import getImageArr from '../../Function/getImageArr';
import {launchCamera} from 'react-native-image-picker';

const MultypleImage = props => {
  // let letData = [];
  // let vImage = [];
  // let n = 0;
  // const [data, setData] = useState([{nama: 'tesss' + n, file: 'dddddd'}]);
  // const [count, setCount] = useState(0);

  const getImageArr = i => {
    console.log(props.vImage);
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 500,
        maxWidth: 500,
        cameraType: 'front',
      },
      response => {
        // console.log('ini respon', response);
        if (response.assets) {
          let image = response.assets[0];
          // console.log('ini data gmbr ', image.fileName, image.base64, image.uri);
          let ArrImg = [...props.data];
          console.log('arrrimg', ArrImg);
          ArrImg[i] = {
            fileName: image.fileName,
            base64: image.base64,
            uri: image.uri,
          };
          props.setData(ArrImg);
        }
      },
    );
  };

  const checkImg = index => {
    console.log(props.vImage);
    if (props.data[index].uri != null && props.data[index].uri != '') {
      Alert.alert(props.data[index].uri);
      return (
        <Image
          source={{uri: props.data[index].uri}}
          style={{
            height: windowHeight * 0.5,
            width: windowWitdh * 0.8,
          }}
        />
      );
    } else {
      Alert.alert('321');
      return (
        <Icon
          name="camera-retro"
          size={windowHeight * 0.1}
          color={Colors.dark}
        />
      );
    }
  };

  const [arr, setArr] = useState([
    <View key={props.count}>
      {/* <Text>{props.count}</Text> */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          console.log('data0', props.data);
          getImageArr(props.count);
        }}>
        {checkImg(props.count)}
      </TouchableOpacity>
    </View>,
  ]);
  const removeImg = () => {
    props.n = props.count - 1;
    props.letData = props.data;
    props.vImage = arr;
    props.letData.splice(props.count, 1);
    props.vImage.splice(props.count, 1);
    // n = count - 1;
    props.setData(props.letData);
    setArr(props.vImage);
    console.log('ini data baru', props.letData, props.vImage);
    props.setCount(props.n);
  };
  const loop = () => {
    props.n = props.count + 1;
    props.vImage = arr;
    props.vImage.push(
      <View key={props.n}>
        {/* <Text>{props.n}</Text> */}
        <TouchableOpacity
          style={styles.input}
          onPress={() => {
            // console.log('data01', props.data);
            getImageArr(props.n);
          }}>
          <Icon
            name="camera-retro"
            size={windowHeight * 0.1}
            color={Colors.dark}
          />
        </TouchableOpacity>
      </View>,
    );
    props.letData = props.data;

    props.letData.push({
      fileName: '',
      base64: '',
      uri: '',
    });
    props.setData(props.letData);
    setArr(props.vImage);
    props.setCount(props.n);
  };

  console.log(props.vImage);

  return (
    <View>
      <ScrollView style={{backgroundColor: Colors.white}}>
        <View>{arr}</View>

        <View style={styles.groupBottonRow}>
          {props.count < 4 && (
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                loop();
              }}>
              <Text style={styles.txtButton}>Tambah</Text>
            </TouchableOpacity>
          )}

          {props.count > 0 && (
            <TouchableOpacity
              style={[styles.button, {backgroundColor: Colors.danger}]}
              onPress={() => {
                removeImg();
              }}>
              <Text style={styles.txtButton}>Delete</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
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
