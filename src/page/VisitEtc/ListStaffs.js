import {StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import ListType1 from '../../Components/List/ListType1';
import API from '../../service';
import Loading from '../../Components/Loading';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Colors';
import ListType2 from '../../Components/List/ListType2';

const ListStaffs = ({navigation, route}) => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [staffs, setStaffs] = useState(route.params ? route.params.staffs : []);

  const getDataStaffs = () => {
    setLoading(true);
    API.getDataStaff(currentPage, '')
      .then(result => {
        if (result) {
          console.log('ini data', result);
          setUser(result.data.data);
          setLastPage(result.data.last_page);
          setCurrentPage(result.data.current_page);
          setLoading(false);
        }
      })
      .catch(e => {
        console.log(e.request);
        setLoading(false);
      });
  };

  const getStaff = data => {
    let newDataStaff = [
      ...staffs,
      {
        name: 'staff_id[]',
        data: data.id,
        staffName: data.name,
      },
    ];
    console.log(newDataStaff);
    navigation.navigate('VisitEtc', {
      form: route.params.form,
      staffs: newDataStaff,
      dataImage: route.params.dataImage,
      categories: route.params.categories,
    });
  };

  useEffect(() => {
    getDataStaffs();
  }, []);

  return (
    <LinearGradient
      style={{
        flex: 1,
      }}
      colors={['#86BEDA', Colors.primary + 30]}>
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Loading />
        </View>
      ) : (
        <ListType2
          user={user}
          setUser={setUser}
          onPress={getStaff}
          navigation={navigation}
          currentPage={currentPage}
          lastPage={lastPage}
          setCurrentPage={setCurrentPage}
          setLastPage={setLastPage}
        />
      )}
    </LinearGradient>
  );
};

export default ListStaffs;
const styles = StyleSheet.create({});
