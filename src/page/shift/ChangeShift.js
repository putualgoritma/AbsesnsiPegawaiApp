import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  Dimensions,
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
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ChangeShift = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const [date1, setDate1] = useState(new Date(1598051730000));
  const [date, setDate] = useState('0000-00-00');
  const [staffList, setStaffList] = useState([]);
  const [time, setTime] = useState('00:00');
  const [show, setShow] = useState(false);
  const [shift, setShift] = useState('');
  const [type, setType] = useState('start');
  const [memo, setMemo] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [mode, setMode] = useState('date');
  const [loading, setLoading] = useState(true);
  const [loadingList, setLoadingList] = useState(false);
  const [form, setForm] = useState({
    staff_id: USER.staff_id,
    description: '',
    date: '',
    id: '',
    shift_id: '',
    shift_change_id: route.params.id,
  });

  const [form1, setForm1] = useState({
    staff_id: USER.staff_id,
    description: '1',
    date: '1',
    id: '1',
    shift_id: '1',
    shift_change_id: '1',
  });
  const [todos, setTodos] = useState([]);
  //test
  const [datatest, setDatatest] = useState([
    {id: 1, name: 'React Native Developer', checked: true}, // set default checked for render option item
    {id: 2, name: 'Android Developer'},
    {id: 3, name: 'iOS Developer'},
  ]);
  const getStaffListnew = () => {
    setDatatest([
      {id: 1, name: 'React Native Developer', checked: true}, // set default checked for render option item
      {id: 2, name: 'Android Developer'},
      {id: 3, name: 'iOS Developer'},
    ]);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const handleConfirm = date => {
    // setLoading(true);
    const dated =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);
    console.log('ssssssaa', dated);
    getStaffList(dated, form.shift_id.toString());
    setForm({...form, date: dated});
    setDate(dated);
    hideDatePicker();
  };

  const getStaffList = (date, shift) => {
    console.log('getStaffList', date, shift);
    setLoadingList(true);
    API.shift_staff(USER.staff_id, date, shift, TOKEN).then(result => {
      if (result) {
        console.log(result.data);
        setStaffList(result.data);
        if (todos.length < 1) {
          setTodos(result.data2);
        }

        setLoadingList(false);
      } else {
        alert(result.message);
      }
    });
  };

  // Api start
  const handleAction = () => {
    console.log('data', form);
    setLoading(true);
    let dataUpload = [];
    dataUpload = [
      {
        name: 'form',
        data: JSON.stringify(form),
      },
    ];

    console.log(dataUpload);

    console.log('data', JSON.stringify(form));
    if (form.description != null) {
      API.shiftChangeStore(
        {
          form: JSON.stringify(form),
        },
        TOKEN,
      ).then(result => {
        if (result.message != 'failed') {
          console.log(result);
          navigation.navigate('Home');
          alert(result.message);
          setLoading(false);
        } else {
          alert('Tanggal Pengjuan Minimal Sehari Sebelum');
          setLoading(false);
        }
      });
    } else {
      alert('mohon lengkapi data');
      setLoading(false);
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
      start: currentDate.getHours() + ':' + currentDate.getMinutes() + ':00',
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
    getStaffList();
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
            Tukar Shift
          </Text>

          <Text style={styles.title}>Tanggal</Text>
          <TouchableOpacity style={styles.input} onPress={showDatePicker}>
            <Text style={styles.text}>{date}</Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <Text style={styles.title}>Pilih Shift</Text>

          <View style={styles.inputselect}>
            <SelectDropdown
              data={todos}
              onSelect={(selectedItem, index) => {
                console.log('todos: ', todos);
                console.log('selectedItem', selectedItem);
                getStaffList(form.date, selectedItem.id);
                setForm({...form, shift_id: selectedItem.id.toString()});
              }}
              defaultButtonText={'Cari Status'}
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

          <Text style={styles.title}>Pilih Staff</Text>
          {loadingList && (
            <View style={styles.input}>
              <Text>Tunggu....</Text>
            </View>
          )}
          <View style={styles.inputselect}>
            {!loadingList && (
              <SelectDropdown
                data={staffList}
                onSelect={(selectedItem, index) => {
                  console.log('staffList: ', staffList);
                  console.log('selectedItem', selectedItem);
                  setForm({...form, id: selectedItem.id.toString()});
                }}
                defaultButtonText={'Cari Status'}
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
            )}
          </View>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date1}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={type == 'end' ? onChangeEnd : onChangeStart}
            />
          )}

          <Text style={styles.title}>Memo</Text>
          <Textarea
            containerStyle={styles.textareaContainer}
            style={styles.textarea}
            placeholder="memo"
            editable={true}
            maxLength={255}
            value={form.description}
            onChangeText={value =>
              setForm({...form, description: value})
            }></Textarea>
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

export default ChangeShift;

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
    // height: 120,
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
  inputselect: {
    alignItems: 'center',
    marginBottom: 10,
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
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2SelectedRowStyle: {backgroundColor: 'rgba(255,255,255,0.2)'},
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
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
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
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
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
