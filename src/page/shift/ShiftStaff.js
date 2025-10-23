import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import API from '../../service';
import {useSelector} from 'react-redux';

const ShiftStaff = ({navigation, route}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = () => {
    setLoading(true);
    console.log(USER.id);
    API.myShift(USER.id, TOKEN).then(result => {
      if (result) {
        console.log(result.data);
        setData(result.data);
        setLoading(false);
      } else {
        alert(result.message);
      }
    });
  };

  useEffect(() => {
    // if(isFocused){
    getData();
    console.log('test');
    setLoading(false);
    //    }
  }, []);

  return (
    <View>
      <View></View>
      <Text
        style={{
          fontWeight: 'bold',
          color: '#000000',
          fontSize: 18,
          textAlign: 'center',
        }}>
        Shift Saya
      </Text>
      <ScrollView>
        {data &&
          data.map((value, key) => {
            return (
              <View style={styles.data} key={key}>
                <Text
                  style={{fontWeight: 'bold', color: '#000000', fontSize: 16}}>
                  {value.date}
                </Text>
                <Text style={{color: '#000000', fontSize: 14}}>
                  {value.title}
                </Text>
                <Text style={{color: '#000000', fontSize: 14}}>
                  {value.time_in} - {value.time_out}
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 'auto',
                    backgroundColor: 'blue',
                    width: windowWidht * 0.2,
                    height: windowHeight * 0.03,
                  }}
                  onPress={() => {
                    navigation.navigate('ChangeShift', {id: value.id});
                  }}>
                  <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
                    Tukar
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default ShiftStaff;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  data: {
    width: windowWidht * 0.84,
    padding: windowHeight * 0.01,
    backgroundColor: '#FFFFFF',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: windowHeight * 0.01,
    borderWidth: 2,
    borderColor: '#00000020',
  },
});
