import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
  Alert,
  useColorScheme
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

const Overtime = ({navigation}) => {
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
  const scheme = useColorScheme();
  const [form, setForm] = useState({
    staff_id: STAFF_ID,
    description: '',
    start: '',
    end: '',
    type: 'in',
    time: '',
    status: 'pending',
    category: 'extra',
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
    if (form.start != '' && form.time != ''  && form.description != '') {
      setLoading(true);
      let dataUpload = [];
      dataUpload = [
        {
          name: 'form',
          data: JSON.stringify(form),
        },
      ];

      console.log(JSON.stringify(form));
      if (form.description != null && form.time) {
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
    } else {
      Alert.alert('Gagal', 'Lengkapi data terlebih dahulu');
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
              color: scheme === 'dark' ? '#000000' : '#000000'
            }}>
            Input Data Lembur
          </Text>

          <View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="in"
                status={form.type === 'in' ? 'checked' : 'unchecked'}
                onPress={() => setForm({...form, type: 'in'})}
              />
              <Text style={{marginTop: 10, color: scheme === 'dark' ? '#000000' : '#000000'}}>Dalam Kantor</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <RadioButton
                value="outside"
                status={form.type === 'outside' ? 'checked' : 'unchecked'}
                onPress={() => setForm({...form, type: 'outside'})}
              />
              <Text style={{marginTop: 10, color: scheme === 'dark' ? '#000000' : '#000000'}}>Luar Kantor</Text>
            </View>
          </View>

          <Text style={[styles.title,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>
            Tanggal<Text style={{color: '#ff0000'}}>*</Text>
          </Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={[styles.title,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>{date}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text>
            Jam Mulai<Text style={{color: scheme === 'dark' ? '#000000' : '#000000'}}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => {
              showTimepicker();
              setType('start');
            }}
            title="Mulai Pukul">
            <View style={{flexDirection: 'row'}}>
              {/* <FontAwesomeIcon icon={faClock} style={{color:'#FFFFFF'}} size={ 20 } /> */}
              {/* <Distance distanceH={5}/> */}
              <Text style={[styles.title,{color: scheme === 'dark' ? '#000000' : '#000000'}]}>{time}</Text>
            </View>
          </TouchableOpacity>

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

export default Overtime;

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
