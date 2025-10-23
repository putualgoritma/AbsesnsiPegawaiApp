import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  RefreshControl,
  FlatList,
  Alert,
} from 'react-native';
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import myFunctions from '../../functions';

const Message = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [date, setDate] = useState('0000-00-00');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date2, setDate2] = useState('0000-00-00');
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const isFocused = useIsFocused();
  const [form, setForm] = useState(true);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    resetData();
    setRefreshing(false);
    getLocation();
  }, []);

  const read = (id, message) => {
    // alert(id)

    let newArray = [...data];
    let oldArray = [];
    console.log('hhjjj', newArray.length);
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id == id) {
        newArray[i].status = 'read';
        console.log('kkkk', i);
      }
    }
    console.log(newArray);
    setData(newArray);

    console.log('tessaaaaaas');
    API.readMessage({id: id}, TOKEN)
      .then(result => {
        console.log('tessaaaaaas');
        // resetData()
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleLoadMore = () => {
    console.log('jumlah asli data', data.length);
    if (page <= lastPage) {
      // setPage(page + 1);
      // console.log('tesss',page, lastPage)
      getData();
    } else {
      console.log('latstart', page, lastPage);
    }
  };
  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          marginVertical: 0,
        }}
      />
    );
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
    if (isFocused) {
      setLoading(true);
      getLocation();
      getData();
    }
    // console.log('ssss')
  }, [isFocused]);

  const getLocation = () => {
    myFunctions
      .permissionLocation()
      .then(res => {
        if (res) {
          myFunctions
            .checkGps(false)
            .then(function (gps) {
              if (!gps.status) {
                // alert('gps gagal');
                setLoading(false);
                console.log('checkGps useeffect', 'false');
              } else {
                // alert('gps berhasil');
                console.log(
                  'You are ',
                  getDistance(gps.data, {
                    latitude: parseFloat(result.lat),
                    longitude: parseFloat(result.lng),
                  }),
                  'meters away from 51.525, 7.4575',
                );
                const j = getDistance(gps.data, {
                  latitude: parseFloat(result.lat),
                  longitude: parseFloat(result.lng),
                });

                // setTest(j);
                if (j > result.radius) {
                  setForm(true);
                  // alert('true' + j + ' ' + gps.data.latitude);
                  console.log('true');
                  // setLoading(false);
                } else {
                  setForm(false);
                  // alert('true' + j + ' ' + gps.data.latitude);
                  console.log('false');
                  // setLoading(false);
                }
              }
            })
            .catch(error => {
              console.log('err checkGps useeffect', error.message);
              // setLoading(false);
            });
        }
      })
      .catch(e => {
        console.log(e);
        setLoading(false);
      });
  };

  const getData = () => {
    console.log(page);
    console.log('jumlah data', data.length);
    setLoading(true);
    API.message(STAFF_ID, page, TOKEN).then(result => {
      if (result) {
        if (page > 1) {
          // if (page < lastPage) {
          // setTicket(ticket.concat(result.data.data))
          setData(data.concat(result.data.data));
          // }
          setPage(page + 1);
          // resetData = false
          console.log('data1', page);
        } else {
          setData(result.data.data);
          setPage(page + 1);
          console.log('data2', page);
        }
        console.log(result.data);
        setLastPage(result.data.last_page);
        setLoading(false);
      } else {
        alert(result.message);
      }
    });
  };
  const filterData = () => {
    setLoading(true);
    setPage(1);
    getData();
  };

  const resetData = () => {
    setLoading(true);
    // setData([])
    // setPage(1)
    console.log(page);
    // if(page === 1){
    //   setData([])
    //   console.log('1111')
    //   getData()
    // }
    // else{
    setData([]);
    console.log('2222');
    setPage(1);

    setLoading(true);
    API.message(STAFF_ID, 1, TOKEN).then(result => {
      if (result) {
        //   if (page > 1) {
        //     // if (page < lastPage) {
        //     // setTicket(ticket.concat(result.data.data))
        //     setData(data.concat(result.data.data))
        //     // }
        //     setPage(page + 1);
        //     // resetData = false
        //     console.log('data1', page);
        // } else {
        setData(result.data.data);
        setPage(page + 1);
        console.log('data2', page);
        // }
        console.log(result.data);
        setLastPage(result.data.last_page);
        setLoading(false);
      } else {
        alert(result.message);
      }
    });
    // }
    // API.message(STAFF_ID,"1").then((result) => {
    //   if(result){

    //     setData(result.data.data)
    //       console.log('delete2', page);

    //     console.log(result.data.data)
    //     setLastPage(result.data.last_page)
    //     setLoading(false)
    //   }
    //     else{
    //       alert(result.message);
    //   }
    //   });
  };

  const renderItemLoading = () => {
    // console.log('foto ini',imagefoto)
    return <ScreenLoading />;
  };

  const renderItem = ({item}) => {
    if (item.type == 'check' && item.status != 'read') {
      return (
        <TouchableOpacity
          style={styles.data}
          onPress={() => {
            navigation.replace('Check_Staff', {
              id: item.id,
              lng: route.params.lng,
              lat: route.params.lat,
              radius: route.params.radius,
              highAccuracy: form,
            });
          }}>
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
                marginVertical: windowHeight * 0.01,
              },
            ]}>
            {item.type}
          </Text>

          {/* <Text style={styles.title}>Shift </Text> */}
          <Text style={{color: '#000000'}}>{item.created_at}</Text>

          <Text style={{color: '#000000'}}>{item.memo}</Text>

          {/* <View style={styles.btnGroup}>
      <TouchableOpacity style={{ backgroundColor : '#09aeae', marginHorizontal : windowWidht*0.1 }} onPress ={()=>{approve(item.id)}  }>
      <Text style={{ color : '#FFFFFF', paddingHorizontal :8 }}>Tambah Bukti</Text>
      </TouchableOpacity>
      </View> */}
        </TouchableOpacity>
      );
    } else if (item.status == 'read') {
      return (
        <View style={styles.data}>
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
                marginVertical: windowHeight * 0.01,
              },
            ]}>
            {item.type}
          </Text>

          {/* <Text style={styles.title}>Shift </Text> */}
          <Text style={{color: '#000000'}}>{item.created_at}</Text>

          <Text style={{color: '#000000'}}>{item.memo}</Text>

          {/* <View style={styles.btnGroup}>
    <TouchableOpacity style={{ backgroundColor : '#09aeae', marginHorizontal : windowWidht*0.1 }} onPress ={()=>{approve(item.id)}  }>
    <Text style={{ color : '#FFFFFF', paddingHorizontal :8 }}>Tambah Bukti</Text>
    </TouchableOpacity>
    </View> */}
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.data}
          onPress={() => {
            read(item.id, item.message);
          }}>
          <Text
            style={[
              {
                fontSize: 16,
                fontWeight: 'bold',
                color: '#000000',
                marginVertical: windowHeight * 0.01,
              },
            ]}>
            {item.type}
          </Text>

          {/* <Text style={styles.title}>Shift </Text> */}
          <Text style={{color: '#000000'}}>
            {item.created_at}
            <Text style={{color: '#ff0000'}}>*</Text>
          </Text>
        </TouchableOpacity>
      );
    }

    // console.log('foto ini',imagefoto)
  };
  // if(!loading){
  return (
    <View style={{flex: 1}}>
      {/* <View><Text>  {page}</Text></View> */}
      <SafeAreaView style={{flex: 1}}>
        {/* <View style={{ flexDirection : 'row' }}>
            <View style ={styles.left}>
              <Text style={styles.title}>Dari</Text>
            <TouchableOpacity style={styles.date} onPress={showDatePicker} ><Text style={styles.btnText}>{date}</Text></TouchableOpacity>
                            <DateTimePickerModal
                              isVisible={isDatePickerVisible}
                              mode="date"
                              onConfirm={handleConfirm}
                              onCancel={hideDatePicker}
                            />
              <TouchableOpacity style={[styles.btn, {backgroundColor : '#e6bc15'}]} onPress ={()=>{resetData()}}>
              <Text style={styles.btnText}>Reset</Text>
              </TouchableOpacity>
            </View>
            <View style ={styles.right}>
            <Text style={styles.title}>Sampai</Text>
      <TouchableOpacity style={styles.date} onPress={showDatePicker2} ><Text style={styles.btnText}>{date2}</Text></TouchableOpacity>
                            <DateTimePickerModal
                              isVisible={isDatePickerVisible}
                              mode="date"
                              onConfirm={handleConfirm2}
                              onCancel={hideDatePicker2}
                            />
                                  <TouchableOpacity style={[styles.btn,{backgroundColor : '#24A0ED'}]} onPress={()=>{filterData()}}>
                                    <Text style={styles.btnText}>Filter</Text>
      
      </TouchableOpacity>
              </View>
            </View> */}

        <FlatList
          // ListHeaderComponent={<Text>Hallo</Text>}
          keyExtractor={(item, index) => index.toString()}
          data={data}
          ItemSeparatorComponent={ItemSeparatorView}
          contentContainerStyle={{alignItems: 'center'}}
          renderItem={renderItem}
          ListFooterComponent={loading ? renderItemLoading : null}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={1}
          onRefresh={onRefresh}
          refreshing={refresh}
          extraData={data}
        />
        <View>
          {/* <Text>
                  yyyyy
                  </Text> */}
        </View>

        {/* return <View style ={styles.data} key={key}> */}

        {/* {item.type == "leave" ?
      <TouchableOpacity style={{ backgroundColor : '#e6bc15' }}>
      <Text style={{ color : '#FFFFFF', paddingHorizontal :8 }}>Selesai Cuti</Text>
      </TouchableOpacity>
      
      :
<TouchableOpacity></TouchableOpacity>
      } */}

        {/* </View> */}
      </SafeAreaView>
    </View>
  );
};
// else{
//   return(
//     <View>
//        <ScreenLoading/>
//     </View>
//   )
// }

// }

export default Message;

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
    backgroundColor: '#FFFFFF',
    padding: windowWidht * 0.02,
    // marginLeft : 'auto',
    // marginRight : 'auto',
    marginTop: windowHeight * 0.006,

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
  btnGroup: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.02,
    alignItems: 'center',
  },
});
