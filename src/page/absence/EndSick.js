import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Textarea from 'react-native-textarea/src/Textarea';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera} from 'react-native-image-picker';
import API from '../../service';
import RNFetchBlob from 'react-native-blob-util';
import {useEffect} from 'react';
import ScreenLoading from '../loading/ScreenLoading';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';

const EndSick = ({navigation, route}) => {
  const Cdate = new Date();
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [date, setDate] = useState('0000-00-00');
  const [date2, setDate2] = useState('0000-00-00');
  const [memo, setMemo] = useState('');
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [loadingList, setLoadingList] = useState(false);
  const [todos, setTodos] = useState([]);
  const [form, setForm] = useState({
    id: route.params.id,
    // staff_id : STAFF_ID,
    // description : '',
    // start : '',
    end: '',
    // type : '',
    // time : '',
    // status : 'pending',
    // category : 'permission'
  });

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App need to use camera access to take an Image',
          //   buttonNeutral: "Ask Me Later",
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Api start
  const handleAction = () => {
    console.log(form);

    if (form.start != '' && form.end != '' && form.type != '') {
      setLoading(true);
      const data = {
        lat: form.lat,
        lng: form.lng,
      };
      console.log(form.lat, form.lng);
      RNFetchBlob.fetch(
        'POST',
        Config.REACT_APP_BASE_URL + '/close/absence/absence/sickAdd',
        {
          Authorization: `Bearer ${TOKEN}`,
          otherHeader: 'foo',
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        [{name: 'form', data: JSON.stringify(form)}],
      )
        .then(result => {
          let data = JSON.parse(result.data);
          console.log(result);
          navigation.pop(2);
          setLoading(false);
          alert(data.message);
          // navigation.navigate('Action')
        })
        .catch(e => {
          // console.log(e);
          setLoading(false);
        });
    } else {
      Alert.alert('Gagal', 'mohon lengkapi data');
    }
  };
  // Api end

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = date => {
    // setLoading(true);
    // if(Cdate < date){
    const dated =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);
    console.log('ssssssaa', dated);
    setForm({...form, end: dated});
    setDate2(dated);
    // }
    // else{
    //   alert('tanggal pengajuan harus lebih besar dari tanggal saat ini')
    // }
    hideDatePicker2();
  };

  // const getSick = () =>{
  //   setLoadingList(true)
  //   API.getPermissionCat().then((result) => {
  //     if(result){
  //       console.log(result.data)
  //       if(todos.length < 1){
  //         setTodos(result.data)
  //       }

  //       setLoadingList(false)
  //     }
  //       else{
  //         alert(result.message);
  //     }
  //     });
  // }

  useEffect(() => {
    // if(isFocused){
    // getSick()
    console.log('test');
    requestCameraPermission();
    setLoading(false);
    //    }
  }, []);

  if (!loading) {
    return (
      <View style={{flex: 1}}>
        <ScrollView>
          <Text
            style={{
              marginVertical: windowHeight * 0.01,
              marginRight: 'auto',
              marginLeft: 'auto',
              fontWeight: 'bold',
              fontSize: 20,
              color: '#000000',
            }}>
            Tambah Tanggal Selesai Sakit
          </Text>

          {/* <Text style={styles.title}>Pilih Keterangan<Text style={{ color : '#ff0000' }}>*</Text></Text> */}
          <Text style={styles.title}>Tanggal Berakhir Sekarang {}</Text>

          <Text style={styles.title}>
            Tanggal Berakhir<Text style={{color: '#ff0000'}}>*</Text>
          </Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker2}>
            <Text style={styles.text}>{date2}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible2}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
          />
          {/* <Text style={styles.title}>Memo</Text> */}

          {/* <Text style={styles.title}>Bukti</Text>
      <TouchableOpacity onPress={
      () => 
                launchCamera(
                               {
                                   mediaType: 'photo',
                                   includeBase64:true,
                                   maxHeight: 500,
                                   maxWidth: 500,
                                   cameraType : 'front'
                               },
                               (response) => {
                                   // console.log('ini respon', response);
                                   if(response.assets){
                                   
                                       let image = response.assets[0];
                                       set_imageP(image)
                                   
                                   }
                               }
                           )
                       }
                   >
                    
      {imageP.uri == "" || imageP.uri == null ?
       <View style={styles.image}>
       <Icon name="camera-retro" size={windowHeight*0.08} color="#000000" />
      </View>
      :
      <Image
                                                      style={styles.image}
                                                      source={{ uri : imageP.uri}}
                                                      // source={image.uri=='' || image.uri==null ? require('../../../assets/img/ImageFoto.png'): {uri: image.from=='local' ? image.uri : `https://simpletabadmin.ptab-vps-storage.com/` + `${String(image.uri).replace('public/', '')}?time="${new Date()}`}}
                                                  />
                                                  
                                                 
       }
      </TouchableOpacity>
       */}
        </ScrollView>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleAction();
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
            Tambah
          </Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View>
        <ScreenLoading />
      </View>
    );
  }
};

export default EndSick;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    width: windowWidht * 0.7,
    height: windowHeight * 0.043,
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginVertical: windowHeight * 0.01,
  },
  text: {
    fontSize: 14,
    paddingTop: 10,
    paddingLeft: 10,
  },
  textareaContainer: {
    width: windowWidht * 0.7,
    height: 120,
    borderRadius: 10,
    padding: 5,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  textarea: {
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#696969',
  },
  title: {
    marginLeft: windowWidht * 0.02,
    fontWeight: 'bold',
    color: '#000000',
  },
  btn: {
    width: windowWidht * 0.76,
    height: windowHeight * 0.07,
    backgroundColor: '#00B2FF',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginVertical: windowHeight * 0.01,
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidht * 0.7,
    height: windowHeight * 0.3233,
    backgroundColor: '#00000010',
  },
});
