import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Textarea from 'react-native-textarea';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import API from '../../service';
import {useEffect} from 'react';
import ScreenLoading from '../loading/ScreenLoading';
import {useSelector} from 'react-redux';
import {RadioButton} from 'react-native-paper';

const AdditionalTime = ({navigation}) => {
  const Cdate = new Date();
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [date1, setDate1] = useState(new Date(1598051730000));
  const [date, setDate] = useState('0000-00-00');
  const [date2, setDate2] = useState('0000-00-00');
  const [time, setTime] = useState('00:00');
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [type, setType] = useState('start');
  const [memo, setMemo] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date');
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    staff_id: STAFF_ID,
    description: '',
    start: '',
    end: '',
    type: 'in',
    time: '',
    status: 'pending',
    category: 'AdditionalTime',
  });

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // setLoading(true);
    // if(Cdate > date){
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
    // else{

    //   alert('tanggal pengajuan harus lebih besar dari tanggal saat ini')
    // }
    hideDatePicker();
  };

  // Api start
  const handleAction = () => {
    setLoading(true);
    let dataUpload = [];
    dataUpload = [
      {
        name: 'form',
        data: JSON.stringify(form),
      },
    ];

    console.log(JSON.stringify(form));
    if (form.description != null) {
      API.requestsStore(
        {
          form: JSON.stringify(form),
        },
        TOKEN,
      ).then(result => {
        if (result) {
          console.log(result);
          navigation.pop(2);
          alert(result.message);
          setLoading(false);
        } else {
          alert(result.message);
          setLoading(false);
        }
      });
    } else {
      Alert.alert('Gagal', 'mohon lengkapi data');
    }
  };
  // Api end

  const onChangeStart = (event, selectedDate) => {
    const currentDate = selectedDate || date1;
    setShow(Platform.OS === 'ios');
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    let time = `${hours}:${minutes}`;
    setTime(time);
    setForm({
      ...form,
      time: currentDate.getHours() + ':' + currentDate.getMinutes() + ':00',
    });
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

  useEffect(() => {
    // if(isFocused){
    console.log('test');
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
            Input Penambahan Jam kerja
          </Text>

          <View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="in"
                status={form.type === 'in' ? 'checked' : 'unchecked'}
                onPress={() => setForm({...form, type: 'in'})}
              />
              <Text style={{marginTop: 10}}>Dalam Kantor</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="outside"
                status={form.type === 'outside' ? 'checked' : 'unchecked'}
                onPress={() => setForm({...form, type: 'outside'})}
              />
              <Text style={{marginTop: 10}}>Luar Kantor</Text>
            </View>
          </View>

          <Text style={styles.title}>Memo<Text style={{color: '#ff0000'}}>*</Text></Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            placeholder="Mohon isi memo dengan jelas (uraian kegiatan & lokasi kegiatan)"
            editable={true}
            maxLength={255}
            value={form.description}
            onChangeText={value =>
              setForm({...form, description: value})
            }></Textarea>

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

          <Text
            style={{
              marginLeft: windowWidht * 0.05,
              marginTop: windowHeight * 0.01,
            }}>
            Note : Tidak dihitung lembur
          </Text>
        </ScrollView>

        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleAction();
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 24, fontWeight: 'bold'}}>
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

export default AdditionalTime;

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
});
