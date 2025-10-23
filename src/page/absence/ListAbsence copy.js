import {
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
  Alert,
  Platform,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import API from '../../service';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useIsFocused} from '@react-navigation/native';
import ScreenLoading from '../loading/ScreenLoading';
import {RadioButton} from 'react-native-paper';
import getDistance from 'geolib/es/getPreciseDistance';
import myFunctions from '../../functions';

const ListAbsence = ({navigation, route}) => {
  const USER_ID = useSelector(state => state.UserReducer.id);
  const TOKEN = useSelector(state => state.TokenReducer);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(true);
  // console.log(STAFF_ID)
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    myFunctions
      .checkGps(false)
      .then(res => {
        // Alert.alert('GPS', 'GPS Hidup');
      })
      .catch(e => {
        // Alert.alert('GPS', 'GPS Mati');
      });
  }, []);

  // Api start
  const handleAction = id => {
    Alert.alert('Yakin ?', `mengakhiri Izin`, [
      {
        text: 'Yakin',
        onPress: () => {
          setLoading(true);
          // console.log(JSON.stringify(form));
          if (id != '') {
            API.leaveEnd(
              {
                id: id,
              },
              TOKEN,
            ).then(result => {
              if (result) {
                console.log(result);
                // navigation.pop(2)
                getMenu();
                Alert.alert(result.message);
                setLoading(false);
              } else {
                Alert.alert(result.message);
                getMenu();
                setLoading(false);
              }
            });
          } else {
            Alert.alert('Gagal', 'mohon lengkapi data');
          }
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  };

  // Api lokasi start
  const handleActionLocation = id => {
    Alert.alert('Yakin ?', `mengakhiri Izin`, [
      {
        text: 'Yakin',
        onPress: () => {
          setLoading(true);
          // console.log(JSON.stringify(form));
          if (id != '') {
            API.closeLocation(
              {
                id: id,
              },
              TOKEN,
            ).then(result => {
              if (result) {
                console.log(result);
                // navigation.pop(2)
                getMenu();
                Alert.alert(result.message);
                setLoading(false);
              } else {
                Alert.alert(result.message);
                getMenu();
                setLoading(false);
              }
            });
          } else {
            Alert.alert('Gagal', 'mohon lengkapi data');
          }
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getMenu();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // start api
  console.log('sss', STAFF_ID);

  const getMenu = () => {
    setLoading(true);
    API.absence(STAFF_ID, TOKEN).then(result => {
      // alert('2');
      if (result) {
        // alert('3');
        console.log(result);
        setData(result);
        console.log(result.lat);
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
                      setLoading(false);
                    } else {
                      setForm(false);
                      // alert('true' + j + ' ' + gps.data.latitude);
                      console.log('false');
                      setLoading(false);
                    }
                  }
                })
                .catch(error => {
                  console.log('err checkGps useeffect', error.message);
                  setLoading(false);
                });
            }
          })
          .catch(e => {
            console.log(e);
            setLoading(false);
          });
      } else {
        Alert.alert(result.message);
      }
    });
  };

  // end api

  useEffect(() => {
    // requestLocationPermission();
    if (isFocused) {
      getMenu();
    }
  }, [isFocused]);
  console.log(route.params);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={styles.scrollView}
        nestedScrollEnabled={true}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {!loading && (
          <View>
            <View>{/* <Text>{form ? 'aktif' : 'tidak aktif'}</Text> */}</View>

            {console.log('ggg', data.menu.geolocationOff)}
            {console.log('ggghhh', form)}
            <Text
              style={{
                fontSize: 24,
                fontWeight: 'bold',
                color: '#000000',
                marginBottom: windowHeight * 0.01,
                marginBottom: windowHeight * 0.02,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              List Absen
            </Text>

            {/* <View style={{ flexDirection : 'row' }}>
      <RadioButton
        value="false"
        status={ form === false? 'checked' : 'unchecked' }
        onPress={() => setForm(false)}
      />
      <Text style={{ marginTop : 10 }}>Jika GPS Lemah (lebih cepat dan kurang akurat)(rekomendasi)</Text>
      </View>
      <View style={{ flexDirection : 'row' }}>
      <RadioButton
        value = "true"
        status={ form === true ? 'checked' : 'unchecked' }
        onPress={() => setForm(true) }
      />
         <Text style={{ marginTop : 10 }}>Jika GPS Kuat (lebih lama dan akurat)</Text>
    </View> */}
            {(data.menu.menuVisit == 'ON' && data.absenceOut != null) ||
            (data.menu.menuVisit == 'ACTIVE' && data.absenceOut != null) ||
            (data.menu.menuBreak == 'ON' && data.absenceOut != null) ||
            (data.menu.menuExcuse == 'ON' && data.absenceOut != null) ||
            (data.menu.menuReguler == 'OFF' && data.absenceOut != null) ? (
              <View style={styles.message}>
                <Text style={styles.messageText}>Absen Out Pada Jam :</Text>
                <Text style={styles.messageText}>
                  {data.absenceOut.start_date} - {data.absenceOut.expired_date}
                </Text>
              </View>
            ) : (
              <View></View>
            )}
            {data.menu.menuReguler == 'ON' &&
              data.menu.menuVisit != 'ON' &&
              data.menu.menuBreak != 'ON' &&
              data.menu.menuVisit != 'ACTIVE' &&
              data.menu.menuExcuse != 'ON' && (
                <TouchableOpacity
                  style={[styles.listMenu, {backgroundColor: '#044cd0'}]}
                  onPress={() => {
                    data.menu.geolocationOff != 'ON'
                      ? navigation.navigate('Absence', {
                          highAccuracy: form,
                          fingerfrint: data.fingerfrint,
                          selfie: data.selfie,
                          lat: data.lat,
                          lng: data.lng,
                          radius: data.radius,
                          id: data.reguler.id,
                          queue: data.reguler.queue,
                          absence_id: data.reguler.absence_id,
                          type: data.reguler.type,
                          image: null,
                        })
                      : navigation.navigate('AbsenceOff', {
                          highAccuracy: form,
                          fingerfrint: data.fingerfrint,
                          selfie: data.selfie,
                          lat: data.lat,
                          lng: data.lng,
                          radius: data.radius,
                          id: data.reguler.id,
                          queue: data.reguler.queue,
                          absence_id: data.reguler.absence_id,
                          type: data.reguler.type,
                          image: null,
                        });
                  }}>
                  {data.reguler.queue == 1 && (
                    <Text style={styles.btnText}>Absen Masuk</Text>
                  )}
                  {data.reguler.queue == 2 && (
                    <Text style={styles.btnText}>Absen Pulang</Text>
                  )}
                </TouchableOpacity>
              )}
            {/* jika tidak dinas */}
            {data.menu.menuBreak == 'ON' &&
              data.break.queue == 2 &&
              data.menu.menuVisit != 'ACTIVE' &&
              data.menu.menuVisit != 'ON' && (
                <TouchableOpacity
                  style={[styles.listMenu, {backgroundColor: '#09aeae'}]}
                  onPress={() => {
                    data.menu.geolocationOff != 'ON'
                      ? navigation.navigate('Absence', {
                          highAccuracy: form,
                          fingerfrint: data.fingerfrint,
                          selfie: data.selfie,
                          lat: data.lat,
                          lng: data.lng,
                          radius: data.radius,
                          id: data.break.id,
                          queue: data.break.queue,
                          absence_id: data.break.absence_id,
                          type: data.break.type,
                        })
                      : navigation.navigate('AbsenceOff', {
                          highAccuracy: form,
                          fingerfrint: data.fingerfrint,
                          selfie: data.selfie,
                          lat: data.lat,
                          lng: data.lng,
                          radius: data.radius,
                          id: data.break.id,
                          queue: data.break.queue,
                          absence_id: data.break.absence_id,
                          type: data.break.type,
                          image: null,
                        });
                  }}>
                  <Text style={styles.btnText}>
                    {route.params.type == 'reguler'
                      ? 'Kegiatan 2'
                      : 'Kontrol 2'}
                  </Text>
                </TouchableOpacity>
              )}
            {data.menu.menuBreak == 'ON' &&
              data.break.queue == 1 &&
              data.menu.menuVisit != 'ACTIVE' &&
              data.menu.menuVisit != 'ON' && (
                <TouchableOpacity
                  style={[styles.listMenu, {backgroundColor: '#09aeae'}]}
                  onPress={() => {
                    data.menu.geolocationOff != 'ON'
                      ? navigation.navigate('Absence', {
                          highAccuracy: form,
                          fingerfrint: data.fingerfrint,
                          selfie: data.selfie,
                          lat: data.lat,
                          lng: data.lng,
                          radius: data.radius,
                          id: data.break.id,
                          queue: data.break.queue,
                          absence_id: data.break.absence_id,
                          type: data.break.type,
                        })
                      : navigation.navigate('AbsenceOff', {
                          highAccuracy: form,
                          fingerfrint: data.fingerfrint,
                          selfie: data.selfie,
                          lat: data.lat,
                          lng: data.lng,
                          radius: data.radius,
                          id: data.break.id,
                          queue: data.break.queue,
                          absence_id: data.break.absence_id,
                          type: data.break.type,
                          image: null,
                        });
                  }}>
                  <Text style={styles.btnText}>
                    {route.params.type == 'reguler'
                      ? 'Kegiatan 1'
                      : 'Kontrol 1'}
                  </Text>
                </TouchableOpacity>
              )}
            {/* jika dinas */}
            {data.menu.menuBreak == 'ON' &&
              data.break.queue == 2 &&
              data.menu.menuVisit == 'ON' && (
                <TouchableOpacity
                  style={[styles.listMenu, {backgroundColor: '#09aeae'}]}
                  onPress={() => {
                    navigation.navigate('AbsenceOff', {
                      highAccuracy: form,
                      fingerfrint: data.fingerfrint,
                      selfie: data.selfie,
                      lat: data.lat,
                      lng: data.lng,
                      radius: data.radius,
                      id: data.break.id,
                      queue: data.break.queue,
                      absence_id: data.break.absence_id,
                      type: data.break.type,
                      image: null,
                    });
                  }}>
                  <Text style={styles.btnText}>
                    {route.params.type == 'reguler'
                      ? 'Kegiatan 2'
                      : 'Kontrol 2'}
                  </Text>
                </TouchableOpacity>
              )}
            {data.menu.menuBreak == 'ON' &&
              data.break.queue == 1 &&
              data.menu.menuVisit == 'ON' && (
                <TouchableOpacity
                  style={[styles.listMenu, {backgroundColor: '#09aeae'}]}
                  onPress={() => {
                    navigation.navigate('AbsenceOff', {
                      highAccuracy: form,
                      fingerfrint: data.fingerfrint,
                      selfie: data.selfie,
                      lat: data.lat,
                      lng: data.lng,
                      radius: data.radius,
                      id: data.break.id,
                      queue: data.break.queue,
                      absence_id: data.break.absence_id,
                      type: data.break.type,
                      image: null,
                    });
                  }}>
                  <Text style={styles.btnText}>
                    {route.params.type == 'reguler'
                      ? 'Kegiatan 1'
                      : 'Kontrol 1'}
                  </Text>
                </TouchableOpacity>
              )}

            {data.menu.menuExcuse == 'ON' && data.excuse != null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#e6bc15'}]}
                onPress={() => {
                  data.menu.geolocationOff != 'ON'
                    ? navigation.navigate('AbsenceEnd', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        id: data.excuse.id,
                        queue: data.excuse.queue,
                        absence_id: data.excuse.absence_id,
                        absence_request_id: data.excuse.absence_request_id,
                        type: data.excuse.absence_category_type,
                        image: null,
                      })
                    : navigation.navigate('AbsenceOffEnd', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        id: data.excuse.id,
                        queue: data.excuse.queue,
                        absence_id: data.excuse.absence_id,
                        type: data.excuse.absence_category_type,
                        image: null,
                      });
                }}>
                <Text style={styles.btnText}>Absen Permisi Selesai</Text>
              </TouchableOpacity>
            )}
            {data.menu.menuExcuse == 'ON' && data.excuse == null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#e6bc15'}]}
                onPress={() => {
                  data.menu.geolocationOff != 'ON'
                    ? navigation.navigate('AbsenceCreate', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_id: data.absenceOut.absence_id,
                        expired_date: data.absenceOut.expired_date,
                        absence_category_id: data.excuseC[0].id,
                        absence_category_id_end: data.excuseC[1].id,
                        absence_request_id: data.request_excuse.id,
                        image: null,
                      })
                    : navigation.navigate('AbsenceCreateOff', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_id: data.absenceOut.absence_id,
                        expired_date: data.absenceOut.expired_date,
                        absence_category_id: data.excuseC[0].id,
                        absence_category_id_end: data.excuseC[1].id,
                        absence_request_id: data.request_excuse.id,
                        image: null,
                      });
                }}>
                <Text style={styles.btnText}>Absen Permisi</Text>
              </TouchableOpacity>
            )}

            {data.menu.menuVisit == 'ON' && data.visit != null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#1fae51'}]}
                onPress={() => {
                  data.menu.geolocationOff != 'ON'
                    ? navigation.navigate('AbsenceEnd', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_request_id: data.visit.absence_request_id,
                        id: data.visit.id,
                        queue: data.visit.queue,
                        absence_id: data.visit.absence_id,
                        type: data.visit.absence_category_type,
                        image: null,
                      })
                    : navigation.navigate('AbsenceOffEnd', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_request_id: data.visit.absence_request_id,
                        id: data.visit.id,
                        queue: data.visit.queue,
                        absence_id: data.visit.absence_id,
                        type: data.visit.absence_category_type,
                        image: null,
                      });
                }}>
                <Text style={styles.btnText}>Absen Dinas Selesai</Text>
              </TouchableOpacity>
            )}

            {/* bukti dinas start */}
            {data.menu.menuVisit == 'ACTIVE' && data.visit != null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#1fae51'}]}
                onPress={() => {
                  navigation.navigate('VisitEtc', {
                    absence_request_id: data.visit.absence_request_id,
                  });
                }}>
                <Text style={styles.btnText}>Bukti Dinas</Text>
              </TouchableOpacity>
            )}
            {/* bukti dinas end */}

            {data.menu.menuVisit == 'ON' && data.visit == null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#1fae51'}]}
                onPress={() => {
                  data.menu.geolocationOff != 'ON'
                    ? navigation.navigate('AbsenceCreate', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_id: data.absenceOut.absence_id,
                        expired_date: data.absenceOut.expired_date,
                        absence_category_id: data.visitC[0].id,
                        absence_category_id_end: data.visitC[1].id,
                        absence_request_id: data.request_visit.id,
                        image: null,
                      })
                    : navigation.navigate('AbsenceCreateOff', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_id: data.absenceOut.absence_id,
                        expired_date: data.absenceOut.expired_date,
                        absence_category_id: data.visitC[0].id,
                        absence_category_id_end: data.visitC[1].id,
                        absence_request_id: data.request_visit.id,
                        image: null,
                      });
                }}>
                <Text style={styles.btnText}>Absen Dinas</Text>
              </TouchableOpacity>
            )}

            {data.menu.menuExtra == 'ON' && data.extra != null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#7a8793'}]}
                onPress={() => {
                  data.menu.geolocationOff != 'ON'
                    ? navigation.navigate('AbsenceExtra', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        id: data.extra.id,
                        queue: data.extra.queue,
                        absence_id: data.extra.absence_id,
                        type: data.extra.absence_category_type,
                        image: null,
                      })
                    : navigation.navigate('AbsenceExtraOff', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        id: data.extra.id,
                        queue: data.extra.queue,
                        absence_id: data.extra.absence_id,
                        type: data.extra.absence_category_type,
                        image: null,
                      });
                }}>
                <Text style={styles.btnText}>Absen Lembur Selesai</Text>
              </TouchableOpacity>
            )}
            {console.log('tesss', data.extraC)}
            {console.log('sss', data)}
            {data.menu.menuExtra == 'ON' && data.extra == null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#7a8793'}]}
                onPress={() => {
                  data.menu.geolocationOff != 'ON'
                    ? navigation.navigate('AbsenceCreateExtra', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_category_id: data.extraC[0].id,
                        absence_category_id_end: data.extraC[1].id,
                        absence_request_id: data.request_extra.id,
                        image: null,
                      })
                    : navigation.navigate('AbsenceCreateExtraOff', {
                        highAccuracy: form,
                        fingerfrint: data.fingerfrint,
                        selfie: data.selfie,
                        lat: data.lat,
                        lng: data.lng,
                        radius: data.radius,
                        absence_category_id: data.extraC[0].id,
                        absence_category_id_end: data.extraC[1].id,
                        absence_request_id: data.request_extra.id,
                        image: null,
                      });
                }}>
                <Text style={styles.btnText}>Absen Lembur</Text>
              </TouchableOpacity>
            )}

            {data.menu.menuDuty == 'ON' && data.AbsenceRequestLogs != null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#7a8793'}]}
                onPress={() => {
                  navigation.navigate('AbsenceCreateDuty', {
                    highAccuracy: form,
                    fingerfrint: data.fingerfrint,
                    selfie: data.selfie,
                    absence_request_id: data.duty.id,
                    image: null,
                  });
                }}>
                <Text style={styles.btnText}>Absen Dinas Luar Selesai</Text>
              </TouchableOpacity>
            )}
            {console.log('tesss', data.dutyC)}
            {console.log('sss', data)}
            {data.menu.menuDuty == 'ON' && data.AbsenceRequestLogs == null && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#7a8793'}]}
                onPress={() => {
                  navigation.navigate('AbsenceCreateDuty', {
                    highAccuracy: form,
                    fingerfrint: data.fingerfrint,
                    selfie: data.selfie,
                    absence_request_id: data.duty.id,
                    image: null,
                  });
                }}>
                <Text style={styles.btnText}>Absen Dinas Luar</Text>
              </TouchableOpacity>
            )}

            {data.menu.menuLeave == 'ON' && (
              // <TouchableOpacity style={[styles.listMenu,{backgroundColor: '#7a8793'}]} onPress={()=>{handleAction(data.leave.id)}}>
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#7a8793'}]}
                disabled={true}>
                <Text style={styles.btnText}>
                  {/* Akhiri Cuti */}
                  Anda Masih Cuti
                </Text>
              </TouchableOpacity>
            )}

            {data.moveLocation && (
              <TouchableOpacity
                style={[styles.listMenu, {backgroundColor: '#7a8793'}]}
                onPress={() => {
                  handleActionLocation(data.permission.id);
                }}>
                <Text style={styles.btnText}>Tutup Pindah Lokasi</Text>
              </TouchableOpacity>
            )}

            {data.menu.menuPermission == 'ON' && (
              <View>
                <TouchableOpacity
                  style={[styles.listMenu, {backgroundColor: '#7a8793'}]}
                  onPress={() => {
                    handleAction(data.permission.id);
                  }}>
                  <Text style={styles.btnText}>Akhiri Izin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.listMenu, {backgroundColor: '#e6bc15'}]}
                  onPress={() => {
                    navigation.navigate('EndSick', {id: data.permission.id});
                  }}>
                  <Text style={styles.btnText}>Tambah Tanggal Sakit</Text>
                </TouchableOpacity>
              </View>
            )}

            {data.menu.menuWaiting == 'ON' && (
              <View style={styles.message}>
                <Text style={styles.messageText}>{data.waitingMessage}</Text>
              </View>
            )}
          </View>
        )}
        {loading && (
          <View>
            <ScreenLoading />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ListAbsence;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  listMenu: {
    marginVertical: windowHeight * 0.01,
    width: windowWidht * 0.8,
    height: windowHeight * 0.044,
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#00000030',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  messageText: {
    color: '#000000',
    textAlign: 'center',
  },
  message: {
    width: windowWidht * 0.85,
    paddingVertical: windowHeight * 0.02,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: windowHeight * 0.03,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
