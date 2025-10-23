import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import API from '../../service';
import Loading from '../../Components/Loading';

const Reports = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const type = route.params.type;
  const USER = useSelector(state => state.UserReducer);
  const [datas, setDatas] = useState();
  const [date, setDate] = useState(
    route.params.start ? route.params.start : '0000-00-00',
  );
  const [loading, setLoading] = useState(true);
  const [date2, setDate2] = useState(
    route.params.end ? route.params.end : '0000-00-00',
  );

  const getData = () => {
    setLoading(true);
    API.report(
      USER.staff_id,
      type,
      date == '0000-00-00' ? '' : date,
      date2 == '0000-00-00' ? '' : date2,
      TOKEN,
    ).then(result => {
      if (result) {
        setDatas(result);
        setLoading(false);
      } else {
        // alert(result.message);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View>
      {!loading ? (
        <View style={styles.hero}>
          <Text style={styles.title}>
            Report Absen {date} - {date2}
          </Text>
          <View style={styles.header}>
            <Text style={[styles.th, {width: windowWidth * 0.08}]}> No</Text>
            <Text style={[styles.th, {width: windowWidth * 0.6}]}>
              {' '}
              Kategori
            </Text>
            <Text style={[styles.th, {width: windowWidth * 0.2}]}> Jumlah</Text>
          </View>

          {datas?.map((data, index) => {
            return (
              <View style={styles.header}>
                <Text style={[styles.tr, {width: windowWidth * 0.08}]}>
                  {' '}
                  {index + 1}
                </Text>
                <Text style={[styles.tr, {width: windowWidth * 0.6}]}>
                  {' '}
                  {data.title}
                </Text>
                <Text style={[styles.tr, {width: windowWidth * 0.2}]}>
                  {' ' + data.data}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <Loading />
      )}
    </View>
  );
};

export default Reports;

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  hero: {
    margin: windowWidth * 0.04,
    padding: windowWidth * 0.02,
    backgroundColor: '#FFFFFF',
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
  },
  th: {
    // width: windowWidth * 0.2933333333333333,
    borderWidth: 1,
    fontWeight: 'bold',
  },
  tr: {
    // width: windowWidth * 0.2933333333333333,
    borderWidth: 1,
    color: '#000000',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
});
