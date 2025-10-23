import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import {Dimensions} from 'react-native';
import API from '../../service';
import {useEffect} from 'react';
import {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {launchCamera} from 'react-native-image-picker';
import ScreenLoading from '../loading/ScreenLoading';
import {useSelector} from 'react-redux';

const Shift = ({navigation}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [date, setDate] = useState('0000-00-00');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date2, setDate2] = useState('0000-00-00');
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

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
    setDate(dated);
    hideDatePicker();
  };

  const showDatePicker2 = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };
  const handleConfirm2 = date => {
    // setLoading(true);
    const dated =
      date.getFullYear() +
      '-' +
      ('0' + (date.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + date.getDate()).slice(-2);
    console.log('ssssssaa', dated);
    setDate2(dated);
    hideDatePicker2();
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    API.shiftChange(2, TOKEN).then(result => {
      if (result) {
        console.log(result.data);
        setData(result.data);
        setLoading(false);
      } else {
        alert(result.message);
      }
    });
  };
  const filterData = () => {
    getData();
  };

  const resetData = () => {
    setLoading(true);
    setDate('0000-00-00');
    setDate2('0000-00-00');
    API.absenceHistory('', '', TOKEN).then(result => {
      if (result) {
        console.log(result.data);
        setData(result.data);
        setLoading(false);
      } else {
        alert(result.message);
      }
    });
  };

  if (!loading) {
    return (
      <View style={{flex: 1}}>
        <View style={{padding: windowHeight * 0.02}}>
          {/* <TouchableOpacity style={styles.date} onPress={showDatePicker} ><Text style={styles.btnText}>{date}</Text></TouchableOpacity>
                            <DateTimePickerModal
                              isVisible={isDatePickerVisible}
                              mode="date"
                              onConfirm={handleConfirm}
                              onCancel={hideDatePicker}
                            /> */}
          <TouchableOpacity
            style={[styles.btn, {backgroundColor: '#e6bc15'}]}
            onPress={() => {
              navigation.navigate('ChangeShift', {name: 'Pilih Staff', id: ''});
            }}>
            <Text style={styles.btnText}>Tukar Shift</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          {data &&
            data.map((value, key) => {
              return (
                <View style={styles.data} key={key}>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000000',
                        marginVertical: windowHeight * 0.01,
                      },
                    ]}>
                    Menunggu Konfirmasi
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>Ditukar Dengan</Text>
                    <Text style={styles.value}>: {value.user_name}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>Shift</Text>
                    <Text style={styles.value}>: {value.title}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.title}>Tanggal</Text>
                    <Text style={styles.value}>: {value.date}</Text>
                  </View>
                </View>
              );
            })}
        </ScrollView>
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

export default Shift;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  left: {
    width: windowWidht * 0.5,
    alignItems: 'center',
  },
  right: {
    width: windowWidht * 0.5,
    alignItems: 'center',
  },
  date: {
    width: windowWidht * 0.4,
    height: windowHeight * 0.04,
    backgroundColor: '#09aeae',
    marginVertical: windowHeight * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: windowWidht * 0.9,
    height: windowHeight * 0.05,
    marginBottom: windowHeight * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  data: {
    width: windowWidht * 0.84,
    paddingBottom: windowHeight * 0.01,
    backgroundColor: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: windowHeight * 0.01,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#00000020',
  },
  title: {
    width: windowWidht * 0.3,
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  value: {
    width: windowWidht * 0.5,
    color: '#000000',
  },
  btnText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
