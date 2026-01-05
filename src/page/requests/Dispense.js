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
import { useState } from 'react';
import Textarea from 'react-native-textarea';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { launchCamera } from 'react-native-image-picker';
import API from '../../service';
import RNFetchBlob from 'react-native-blob-util';
import { useEffect } from 'react';
import ScreenLoading from '../loading/ScreenLoading';
import { useSelector } from 'react-redux';
import Select2 from 'react-native-select-two';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import myFunctions from '../../functions';
import SelectDropdown from 'react-native-select-dropdown';
import Config from 'react-native-config';
import { RadioButton } from 'react-native-paper';

const Dispense = ({ navigation }) => {
  const Cdate = new Date();
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [date, setDate] = useState('0000-00-00');
  const [date2, setDate2] = useState('0000-00-00');
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const scheme = useColorScheme();
  const [form, setForm] = useState({
    start: '',
    end: '',
    time_start: '',
    time_end: '',
    description: '',
    staff_id: STAFF_ID,
    type: 'other',
    time: '',
    status: 'pending',
    category: 'dispense',
    model: 'regular',

  });
  const [type, setType] = useState('start');
  const [mode, setMode] = useState('date');
  const [date1, setDate1] = useState(new Date(1598051730000));
  const [date3, setDate3] = useState(new Date(1598051730000));
  const [time, setTime] = useState('00:00');
  const [time2, setTime2] = useState('00:00');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);

  // const countries = [
  //   {title: 'Egypt', id: 1},
  //   {title: 'Canada', id: 2},
  //   {title: 'Australia', id: 3},
  //   {title: 'Ireland', id: 4},
  //   {title: 'Brazil', id: 5},
  //   {title: 'England', id: 6},
  //   {title: 'Dubai', id: 7},
  // ];

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

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === 'ios');
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let time = `${hours} : ${minutes}`;
    setForm({
      ...form,
      time_start: currentDate.getHours() + ':' + currentDate.getMinutes() + ':00',
    });
    setTime(time);
    console.log(time);
    setDate1(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  const showTimepicker = () => {
    showMode('time');
  };

  const onChangeStart2 = (event, selectedDate) => {
    const currentDate = selectedDate || date3;
    setShow1(Platform.OS === 'ios');
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let time = `${hours} : ${minutes}`;
    setForm({
      ...form,
      time_end: currentDate.getHours() + ':' + currentDate.getMinutes() + ':00',
    });
    setTime2(time);
    console.log(time);
    setDate3(currentDate);
  };
  const showMode2 = currentMode => {
    setShow1(true);
    setMode(currentMode);
  };
  const showTimepicker2 = () => {
    showMode2('time');
  };

  const fieldLabels = {
    start: 'Tanggal Mulai',
    end: 'Tanggal Berakhir',
    time_start: 'Jam Mulai',
    time_end: 'Jam Selesai',
    description: 'Keterangan',
    staff_id: 'STAFF_ID',
    type: 'Tipe',
    time: 'Jam',
    status: 'Status',
    category: 'Kategori',
    model: 'Model',

  };

  const isFormValid = () => {
    let exceptions = ['time'];
    if (form.model != 'special') {
      exceptions = ['time', 'time_start', 'time_end'];
    }

    for (const [key, value] of Object.entries(form)) {
      if (exceptions.includes(key)) continue;

      if (value === '' || value === null) {
        const label = fieldLabels[key] || key; // fallback to key if label not defined
        Alert.alert(`Field "${label}" is required.`);
        return false;
      }
    }
    return true;
  };

  // Api start
  const handleAction = () => {
    console.log(form);

    if (!isFormValid()) {
      //Alert.alert("Please fill in all required fields.");
      return;
    }

    //*   
    setLoading(true);
    const data = {
      lat: form.lat,
      lng: form.lng,
    };
    console.log(form.lat, form.lng);
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
        { name: 'form', data: JSON.stringify(form) },
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
        // console.log(e);
        setLoading(false);
      });
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
    setForm({ ...form, start: dated });
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
    // if(Cdate < date){
    const dated =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);
    console.log('ssssssaa', dated);
    setForm({ ...form, end: dated });
    setDate2(dated);
    // }
    // else{
    //   alert('tanggal pengajuan harus lebih besar dari tanggal saat ini')
    // }
    hideDatePicker2();
  };

  useEffect(() => {
    // if(isFocused){
    console.log('test');
    myFunctions.permissionCamera();
    setLoading(false);
    //    }
  }, []);
  // tanggal end

  if (!loading) {
    return (
      <View style={{ flex: 1 }}>
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
            Input Data Dispensasi
          </Text>

          <View>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="regular"
                status={form.model === 'regular' ? 'checked' : 'unchecked'}
                onPress={() => setForm({ ...form, model: 'regular', category: 'dispense' })}
              />
              <Text style={{ marginTop: 10, color: scheme === 'dark' ? '#000000' : '#000000' }}>Umum</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <RadioButton
                value="special"
                status={form.model === 'special' ? 'checked' : 'unchecked'}
                onPress={() => {
                  setForm({ ...form, model: 'special', category: 'dispense_special' });
                  // setForm({...form, attendance: ''});
                  setTime('00:00');
                  setTime2('00:00');
                }}
              />
              <Text style={{ marginTop: 10, color: scheme === 'dark' ? '#000000' : '#000000' }}>Khusus</Text>
            </View>
          </View>

          <Text style={[styles.title, { color: scheme === 'dark' ? '#000000' : '#000000' }]}>
            Tanggal Mulai<Text style={{ color: '#ff0000' }}>*</Text>
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
          <Text style={[styles.title, { color: scheme === 'dark' ? '#000000' : '#000000' }]}>
            Tanggal Berakhir<Text style={{ color: '#ff0000' }}>*</Text>
          </Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker2}>
            <Text style={[styles.text, {color: scheme === 'dark' ? '#000000' : '#000000'}]}>{date2}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible2}
            mode="date"
            onConfirm={handleConfirm2}
            onCancel={hideDatePicker2}
          />

          {form.model === 'special' && (
            <>
              <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>
                Jam Mulai<Text style={{ color: '#ff0000' }}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  showTimepicker();
                  setType('start');
                }}
                title="Mulai Pukul">
                <View style={{ flexDirection: 'row' }}>
                  {/* <FontAwesomeIcon icon={faClock} style={{color:'#FFFFFF'}} size={ 20 } /> */}
                  {/* <Distance distanceH={5}/> */}
                  <Text style={[styles.text, {color: scheme === 'dark' ? '#000000' : '#000000'}]}>{time}</Text>
                </View>
              </TouchableOpacity>

              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date1}
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  onChange={type == 'end' ? onChangeEnd : onChangeStart}
                />
              )}

              <Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>
                Jam Berakhir<Text style={{ color: '#ff0000' }}>*</Text>
              </Text>
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  showTimepicker2();
                  setType('start');
                }}
                title="Mulai Pukul">
                <View style={{ flexDirection: 'row' }}>
                  {/* <FontAwesomeIcon icon={faClock} style={{color:'#FFFFFF'}} size={ 20 } /> */}
                  {/* <Distance distanceH={5}/> */}
                  <Text style={[styles.text, {color: scheme === 'dark' ? '#000000' : '#000000'}]}>{time2}</Text>
                </View>
              </TouchableOpacity>
              {show1 && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date3}
                  mode={mode}
                  is24Hour={true}
                  display="spinner"
                  onChange={type == 'end' ? onChangeEnd : onChangeStart2}
                />
              )}
            </>
          )}

          <Text style={[styles.title,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>Memo<Text style={{ color: '#ff0000' }}>*</Text></Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={[styles.textarea, {color: scheme === 'dark' ? '#000000' : '#000000'}]}
            placeholder="Mohon isi memo dengan jelas (uraian kegiatan & lokasi kegiatan)"
            editable={true}
            maxLength={255}
            value={form.description}
            onChangeText={value =>
              setForm({ ...form, description: value })
            }></Textarea>

          <Text style={[styles.title, {color: scheme === 'dark' ? '#000000' : '#000000'}]}>Bukti</Text>
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
                source={{ uri: imageP.uri }}
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
          <Text style={{ color: scheme === 'dark' ? '#000000' : '#000000', fontSize: 24, fontWeight: 'bold' }}>
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

export default Dispense;

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
  inputselect: {
    alignItems: 'center',
    marginBottom: 10,
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
  dropdown1BtnStyle: {
    width: windowWidht * 0.7,
    height: windowHeight * 0.043,
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
  dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
  dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },
  dropdown1SelectedRowStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderRadius: 12,
  },
  dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2SelectedRowStyle: { backgroundColor: 'rgba(255,255,255,0.2)' },
  dropdown2searchInputStyleStyle: {
    backgroundColor: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: { backgroundColor: 'slategray' },
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3searchInputStyleStyle: {
    backgroundColor: 'slategray',
    borderBottomWidth: 1,
    borderBottomColor: '#FFF',
  },
});
