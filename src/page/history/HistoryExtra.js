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

const HistoryExtra = () => {
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
    setDatePickerVisibility2(true);
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
    API.absenceHistoryExtra(
      USER.staff_id,
      date == '0000-00-00' ? '' : date,
      date2 == '0000-00-00' ? '' : date2,
      TOKEN,
    ).then(result => {
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
    API.absenceHistoryExtra(USER.staff_id, '', '', TOKEN).then(result => {
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
        <View style={{flexDirection: 'row'}}>
          <View style={styles.left}>
            <Text style={styles.title}>Dari</Text>
            <TouchableOpacity style={styles.date} onPress={showDatePicker}>
              <Text style={styles.btnText}>{date}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: '#e6bc15'}]}
              onPress={() => {
                resetData();
              }}>
              <Text style={styles.btnText}>Reset</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.right}>
            <Text style={styles.title}>Sampai</Text>
            <TouchableOpacity style={styles.date} onPress={showDatePicker2}>
              <Text style={styles.btnText}>{date2}</Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={handleConfirm2}
              onCancel={hideDatePicker2}
            />
            <TouchableOpacity
              style={[styles.btn, {backgroundColor: '#24A0ED'}]}
              onPress={() => {
                filterData();
              }}>
              <Text style={styles.btnText}>Filter</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          {data &&
            data.map((value, key) => {
              return (
                <View key={key} style={styles.data}>
                  <Text
                    style={[
                      {
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#000000',
                        marginVertical: windowHeight * 0.01,
                      },
                    ]}>
                    {value.day_name}, {value.date}
                  </Text>

                  {value.list &&
                    value.list.map((value2, key2) => {
                      return (
                        <View style={{flexDirection: 'row'}} key={key2}>
                          <Text style={styles.title}>
                            {value2.category_title == 'in' ||
                            value2.category_title == 'shift_in'
                              ? 'Masuk'
                              : value2.category_title == 'break_in' ||
                                value2.category_title == 'shift_break_in'
                              ? 'istirahat'
                              : value2.category_title == 'break_out' ||
                                value2.category_title == 'shift_break_out'
                              ? 'istirahat Selesai'
                              : value2.category_title == 'out' ||
                                value2.category_title == 'shift_out'
                              ? 'Pulang'
                              : value2.category_title == 'visit_start'
                              ? 'Dinas(D) checkin'
                              : value2.category_title == 'visit_end'
                              ? 'Dinas(D) checkout'
                              : value2.category_title == 'duty_start'
                              ? 'Dinas(L) checkin'
                              : value2.category_title == 'duty_end'
                              ? 'Dinas(L) checkout'
                              : value2.category_title == 'extra_start'
                              ? 'Lembur Checkin'
                              : value2.category_title == 'extra_end'
                              ? 'Lembur Checkout'
                              : value2.category_title == 'permit_start'
                              ? 'Permisi Checkin'
                              : value2.category_title == 'permit_end'
                              ? 'Permisi Checkout'
                              : ''}
                          </Text>
                          {value2.category_title == 'in' ||
                          value2.category_title == 'shift_in' ||
                          value2.category_title == 'out' ||
                          value2.category_title == 'shift_out' ? (
                            <Text style={styles.value}>
                              :{' '}
                              {value2.register
                                ? value2.register.substring(19, 10)
                                : ''}{' '}
                              ({value2.late == 0 ? 'Tepat Waktu' : 'Lambat'})
                            </Text>
                          ) : (
                            <Text style={styles.value}>
                              :{' '}
                              {value2.register
                                ? value2.register.substring(19, 10)
                                : ''}
                            </Text>
                          )}
                        </View>
                      );
                    })}
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

export default HistoryExtra;

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
    width: windowWidht * 0.32,
    height: windowHeight * 0.04,
    marginBottom: windowHeight * 0.02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  data: {
    width: windowWidht * 0.84,
    paddingBottom: windowHeight * 0.01,
    // height : windowHeight*0.18,
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
