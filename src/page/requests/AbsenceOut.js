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
import API from '../../service';
import ScreenLoading from '../loading/ScreenLoading';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';

const AbsenceOut = ({navigation}) => {
  const TOKEN = useSelector(state => state.TokenReducer);
  const USER = useSelector(state => state.UserReducer);
  const USER_ID = useSelector(state => state.UserReducer.id);
  const STAFF_ID = useSelector(state => state.UserReducer.staff_id);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    staff_id: STAFF_ID,
    description: '',
    start: '',
    end: '',
    type: 'other',
    time: '',
    status: 'pending',
    category: 'geolocation_off',
  });

  // Api start
  const handleAction = () => {
    setLoading(true);
    let dataUpload = [];
    dataUpload = [
      {
        name: 'form',
        data: JSON.stringify(form),
      },
    ];

    console.log(JSON.stringify(form));
    if (form.description != null) {
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

  useEffect(() => {
    // if(isFocused){
    console.log('test');
    setLoading(false);
    //    }
  }, []);
  // Api end
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
            Input Data Absen Diluar
          </Text>

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

export default AbsenceOut;

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
