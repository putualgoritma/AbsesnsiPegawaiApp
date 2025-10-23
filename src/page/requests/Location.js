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
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Location = ({navigation}) => {
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
  const [mode, setMode] = useState('date');
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // const [checked, setChecked] = React.useState('first');
  const [form, setForm] = useState({
    staff_id: STAFF_ID,
    description: '',
    start: '',
    end: '',
    type: 'other',
    time: '00:00:00',
    status: 'pending',
    category: 'location',
    work_unit_id: '',
  });
  const [todos, setTodos] = useState([]);

  // tanggal

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // setLoading(true);
    // console.log(date, Cdate);
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
  // Api start
  const handleAction = () => {
    // let dataUpload = [];
    // dataUpload = [
    //   {
    //     name: 'form',
    //     data: JSON.stringify(form),
    //   },
    // ];

    console.log('kaa', form);

    console.log(JSON.stringify(form));
    if (form.time != ''  && form.description != '') {
      setLoading(true);
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

    let time = `${hours} : ${minutes}`;
    setForm({
      ...form,
      time: currentDate.getHours() + ':' + currentDate.getMinutes() + ':00',
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

  const getLocation = () => {
    setLoading(true);
    API.getLocation(TOKEN).then(result => {
      if (result) {
        setTodos(result.data);

        setLoading(false);
      }
    });
  };

  useEffect(() => {
    // if(isFocused){
    getLocation();
    console.log('test');
    // setLoading(false);
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
            Input Data Titik Lokasi
          </Text>

          <Text style={styles.title}>Pilih Lokasi</Text>

          <View style={styles.inputselect}>
            <SelectDropdown
              data={todos}
              onSelect={(selectedItem, index) => {
                console.log('todos: ', todos);
                console.log('selectedItem', selectedItem);
                setForm({...form, work_unit_id: selectedItem.id.toString()});
              }}
              defaultButtonText={'Cari Work Unit'}
              buttonTextAfterSelection={(selectedItem, index) => {
                //setForm({ ...form, type: selectedItem.id.toString() })
                return selectedItem.name;
              }}
              rowTextForSelection={(item, index) => {
                //setForm({ ...form, type: item.id.toString() })
                return item.name;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={isOpened => {
                return (
                  <Icon
                    name={isOpened ? 'chevron-up' : 'chevron-down'}
                    color={'#444'}
                    size={18}
                  />
                );
              }}
              dropdownIconPosition={'right'}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
              selectedRowStyle={styles.dropdown1SelectedRowStyle}
              search
              searchInputStyle={styles.dropdown1searchInputStyleStyle}
              searchPlaceHolder={'Pilih Status'}
              searchPlaceHolderColor={'darkgrey'}
              renderSearchInputLeftIcon={() => {
                return <Icon name={'search'} color={'#444'} size={18} />;
              }}
            />
          </View>

          <Text style={styles.title}>Pilih Tanggal</Text>

          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={styles.text}>{date}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

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

export default Location;

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
  inputselect: {
    alignItems: 'center',
    marginBottom: 10,
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
  dropdown1BtnStyle: {
    width: windowWidht * 0.7,
    height: windowHeight * 0.043,
    backgroundColor: '#FFF',
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1SelectedRowStyle: {backgroundColor: 'rgba(0,0,0,0.1)'},
  dropdown1searchInputStyleStyle: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
});
