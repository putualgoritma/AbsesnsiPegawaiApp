import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  useColorScheme
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Textarea from 'react-native-textarea';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {launchCamera} from 'react-native-image-picker';
import API from '../../service';
import RNFetchBlob from 'react-native-blob-util';
import {useEffect} from 'react';
import ScreenLoading from '../loading/ScreenLoading';
import {useSelector} from 'react-redux';
import myFunctions from '../../functions';
import Config from 'react-native-config';

const DutyOut = ({navigation}) => {
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
  const scheme = useColorScheme();
  const [form, setForm] = useState({
    staff_id: STAFF_ID,
    description: '',
    start: '',
    end: '',
    type: 'other',
    time: '',
    status: 'pending',
    category: 'duty',
  });

  const [imageP, set_imageP] = useState({
    base64: '',
    fileName: '',
    fileSize: 0,
    height: 0,
    type: '',
    uri: '',
    width: 0,
    from: 'api',
  });

  const [imagePng, set_imagePng] = useState({
    base64: '',
    fileName: '',
    fileSize: 0,
    height: 0,
    type: '',
    uri: '',
    width: 0,
    from: 'api',
  });

  useEffect(() => {
    // if(isFocused){
    console.log('test');
    myFunctions.permissionCamera();
    setLoading(false);
    //    }
  }, []);

  // Api start
  const handleAction = () => {
    if (form.start != '' && form.end != ''  && form.description != '') {
      setLoading(true);
      const data = {
        lat: form.lat,
        lng: form.lng,
      };
      const dat = JSON.stringify(form);
      console.log(JSON.stringify(form));
      RNFetchBlob.fetch(
        'POST',
        Config.REACT_APP_BASE_URL + '/close/absence/requests/store',
        {
          Authorization: `Bearer ${TOKEN}`,
          otherHeader: 'foo',
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'imagePng',
            filename: imagePng.fileName,
            data: imagePng.base64,
          },
          {
            name: 'imageP',
            filename: imageP.fileName,
            data: imageP.base64,
          },
          {name: 'form', data: dat},
        ],
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
          console.log(e);
          setLoading(false);
        });
    } else {
      Alert.alert('Gagal', 'mohon lengkapi data');
    }
  };
  // Api end
  // tanggal

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // setLoading(true);
    // if(Cdate > date){
    //   alert('tanggal pengajuan harus lebih besar dari tanggal saat ini')
    // }
    // else{

    const dated =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);
    console.log('ssssssaa', dated);
    setForm({...form, start: dated});
    setDate(dated);
    // }
    hideDatePicker();
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = date => {
    // setLoading(true);
    // if(Cdate > date){
    //   alert('tanggal pengajuan harus lebih besar dari tanggal saat ini')
    // }
    // else{
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
    hideDatePicker2();
  };

  // tanggal end
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
              color: scheme === 'dark' ? '#000000' : '#000000'
            }}>
            Input Data Dinas(Luar Kota)
          </Text>
          <Text style={[styles.title, {color: scheme === 'dark' ? '#000000' : '#000000'}]}>
            Tanggal Mulai<Text style={{color: '#ff0000'}}>*</Text>
          </Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={[styles.text,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>{date}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={[styles.title, {color: scheme === 'dark' ? '#000000' : '#000000'}]}>
            Tanggal Berakhir<Text style={{color: '#ff0000'}}>*</Text>
          </Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker2}>
            <Text style={[styles.text,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>{date2}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible2}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
          />
          <Text style={[styles.title,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>Memo<Text style={{color: '#ff0000'}}>*</Text></Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={[styles.textarea,{color: scheme === 'dark' ? '#000000' : '#000000'}]}
            placeholder="Mohon isi memo dengan jelas (uraian kegiatan & lokasi kegiatan)"
            editable={true}
            maxLength={255}
            value={form.description}
            onChangeText={value =>
              setForm({...form, description: value})
            }></Textarea>

          <Text style={[styles.title,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>Bukti Pengajuan</Text>
          <TouchableOpacity
            onPress={() =>
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
                    set_imagePng(image);
                  }
                },
              )
            }>
            {imagePng.uri == '' || imagePng.uri == null ? (
              <View style={styles.image}>
                <Icon
                  name="camera-retro"
                  size={windowHeight * 0.08}
                  color="#000000"
                />
              </View>
            ) : (
              <Image
                style={styles.image}
                source={{uri: imagePng.uri}}
                // source={image.uri=='' || image.uri==null ? require('../../../assets/img/ImageFoto.png'): {uri: image.from=='local' ? image.uri : `https://simpletabadmin.ptab-vps-storage.com/` + `${String(image.uri).replace('public/', '')}?time="${new Date()}`}}
              />
            )}
          </TouchableOpacity>

          <Text style={[styles.title,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>Bukti Persetujuan</Text>
          <TouchableOpacity
            onPress={() =>
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
                    set_imageP(image);
                  }
                },
              )
            }>
            {imageP.uri == '' || imageP.uri == null ? (
              <View style={styles.image}>
                <Icon
                  name="camera-retro"
                  size={windowHeight * 0.08}
                  color="#000000"
                />
              </View>
            ) : (
              <Image
                style={styles.image}
                source={{uri: imageP.uri}}
                // source={image.uri=='' || image.uri==null ? require('../../../assets/img/ImageFoto.png'): {uri: image.from=='local' ? image.uri : `https://simpletabadmin.ptab-vps-storage.com/` + `${String(image.uri).replace('public/', '')}?time="${new Date()}`}}
              />
            )}
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleAction();
          }}>
          <Text style={{color: scheme === 'dark' ? '#000000' : '#000000', fontSize: 24, fontWeight: 'bold'}}>
            Ajukan
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

export default DutyOut;

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
