import Icon from 'react-native-vector-icons/Ionicons';

import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  Image,
  Text,
  Dimensions,
  Modal,
  Button,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';
import API from '../../service';
import {HeaderView, DataView, Footer, Title, Spinner} from '../../component';
import {useSelector} from 'react-redux';
import ScreenLoading from '../loading/ScreenLoading';
import ImageViewing from 'react-native-image-viewing';

const ListFile = ({navigation, route}) => {
  const id = route.params.id;
  {
    console.log('tesss', route);
  }
  const [img, setImg] = useState([]);
  const [imgNew, setImgNew] = useState([]);
  const [imgDone, setImgDone] = useState([]);
  const [dataShow, setDataShow] = useState({
    nomorrekening: '',
    namapelanggan: '',
    alamat: '',
    idgol: '',
    nomorhp: '',
    tglentry: '',
    wmnomor: '',
    wmukuran: '',
  });
  const TOKEN = useSelector(state => state.TokenReducer);
  const [date, setDate] = useState('0000-00-00');
  const [loading, setLoading] = useState(true);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [status, setStatus] = useState('');
  const [showImage, setShowImage] = useState(false);
  const [images, setImages] = useState('');
  const [showImageNew, setShowImageNew] = useState(false);
  const [imagesNew, setImagesNew] = useState('');
  const [showImageDone, setShowImageDone] = useState(false);
  const [imagesDone, setImagesDone] = useState('');
  // const [images2, setImages2] = useState('')
  const [visible, setVisible] = true;

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const ShowDetail = () => {
    console.log(id);
    setLoading(true);
    let d1 = [];
    API.listFile(id, TOKEN)
      .then(result => {
        console.log('data', result.data);
        // console.log('datasss',JSON.parse(result.data.image))

        setImg(result.data);
        //   simpan foto
        result.data &&
          result.data != '' &&
          result.data.map((item, index) => {
            d1.push({
              url:
                `https://simpletabadmin.ptab-vps-storage.com/images/RequestFile/` +
                `${String(item.image).replace(
                  'public/',
                  '',
                )}?time="${new Date()}`,
            });
          });
        console.log('gggs', d1);
        setImages(d1);

        setLoading(false);
      })
      .catch(e => {
        console.log(e.request);
        setLoading(false);
      });
  };

  const deleteImage = idF => {
    Alert.alert('Yakin ?', `menghapus Bukti ini`, [
      {
        text: 'Yakin',
        onPress: () => {
          setLoading(true);
          console.log('tessaaaaaas');
          API.deleteImage(idF, TOKEN)
            .then(result => {
              console.log('res1', result.id);
              console.log('res2', result.data);
              console.log('res', result);
              alert(result.data.message);
              ShowDetail(id);

              setLoading(false);
            })
            .catch(e => {
              console.log('gagal');
              setLoading(false);
            });
        },
      },
      {
        text: 'Tidak',
      },
    ]);
  };

  useEffect(() => {
    // if(isFocused){
    console.log('test');
    // ShowDetail();
    // ShowDetail(6);
    ShowDetail(id);
    //    }
  }, []);

  return (
    <View style={styles.container}>
      {/* <View style ={{ marginLeft : 10 }}> */}
      <Text style={{color: '#000000', fontSize: 18}}>
        {route.params.type == 'sick' ? 'Sakit' : 'Izin'}
      </Text>
      <Text
        style={{
          color: '#000000',
          fontSize: 16,
          marginBottom: windowHeight * 0.05,
        }}>
        {route.params.start} s/d {route.params.end}
      </Text>
      {/* <View style={styles.top}>
        <Text style={[styles.label4, {textAlign:"center"}]}>{new Date().getDate() + "-"+ parseInt(new Date().getMonth()+1) +"-"+new Date().getFullYear()}</Text>
        </View> */}
      {/* <View style={styles.top}>
        <Text style={styles.label1}>PERUMDA TIRTA AMERTHA BUANA TABANAN</Text>
        </View> */}
      {/* <View style={styles.top}>
        <Text style={{  fontSize: 16, color : "#000000", fontWeight : "bold" }}>Data Pelanggan</Text>
        </View> */}
      {loading && <ScreenLoading />}
      {!loading && (
        <ScrollView style={styles.formData}>
          {img.map((item, index) => {
            return (
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: windowWidht * 0.95,
                  paddingBottom: windowHeight * 0.01,
                }}>
                <Text>{item.id}</Text>
                <DataView title="Bukti" />
                <Modal
                  visible={showImage}
                  transparent={true}
                  enablePreload={true}
                  onRequestClose={() => setShowImage(false)}
                  onDoubleClick={() => setShowImage(true)}>
                    <ImageViewing
  images={[{ uri: `https://simpletabadmin.ptab-vps-storage.com/images/RequestFile/` +
                          `${String(item.image).replace(
                            'public/',
                            '',
                          )}?time="${new Date()}` }]}
  imageIndex={0}
  visible={visible}
  onRequestClose={() => setVisible(false)}
/>
                </Modal>
                <TouchableHighlight
                  onPress={() => {
                    setShowImage(true);
                    console.log('tess', images);
                  }}>
                  <ScrollView style={{flexDirection: 'row'}} horizontal={true}>
                    {/* {loadingImage && <Text style={{textAlign : 'center', fontSize : 17}}>Image Is Loading...</Text>} */}
                    <ImageBackground style={{height: 220, width: 280}}>
                      <Image
                        key={index}
                        style={{
                          height: 220,
                          width: 280,
                          marginVertical: 10,
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                        source={{
                          uri:
                            `https://simpletabadmin.ptab-vps-storage.com/images/RequestFile/` +
                            `${String(item.image).replace('public/', '')}`,
                        }}
                        // onLoadEnd={() => setLoadingImage(false)}
                        // onLoadStart={() => setLoadingImage(true)}
                      />
                    </ImageBackground>
                  </ScrollView>
                </TouchableHighlight>

                <TouchableOpacity
                  style={{
                    marginLeft: 'auto',
                    marginRight: windowWidht * 0.05,
                    width: windowWidht * 0.3,
                    padding: 2,
                    backgroundColor: '#d72503',
                    borderRadius: 2,
                  }}
                  onPress={() => {
                    deleteImage(item.id);
                  }}>
                  <Text style={{color: '#FFFFFF', textAlign: 'center'}}>
                    Hapus
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
    // </View>
  );
};

export default ListFile;

const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  footer: {
    windowWidht: windowWidht * 0.8,
    marginTop: windowHeight * 0.01,
    padding: windowWidht * 0.02,
    margin: 'auto',
    borderWidth: 1,
    backgroundColor: '#FFFFFF',
  },
  paginate: {
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  container: {
    flex: 1,
    paddingTop: windowHeight * 0.02,
    paddingHorizontal: windowWidht * 0.02,
  },
  date: {
    width: windowWidht * 0.9,
    height: windowHeight * 0.03,
    borderWidth: 1,
    marginHorizontal: windowWidht * 0.04,
    color: '#000000',
    backgroundColor: '#FFFFFF',
  },
  formField: {
    flexDirection: 'row',
    paddingVertical: windowHeight * 0.015,
  },
  data: {
    marginTop: windowHeight * 0.02,
    width: windowWidht * 1,
    height: windowHeight * 0.44,
    backgroundColor: '#FFFFFF',
  },
  dataCollom: {
    flexDirection: 'row',
    marginTop: windowHeight * 0.05,
    width: windowWidht * 0.9,
    marginHorizontal: windowWidht * 0.025,
    backgroundColor: '#FFFFFF',
  },
  top: {
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.02,
  },

  formData: {
    // marginLeft : 'auto',
    // marginRight : 'auto',
    // height : windowHeight*0.65,
    backgroundColor: '#FFFFFF',
  },
  data1: {
    flexDirection: 'row',
    marginHorizontal: windowWidht * 0.01,
    width: windowWidht * 1,
    // paddingBottom : windowHeight*0.03,
    borderBottomWidth: 1,
  },
  formGroup: {
    width: windowWidht * 0.8,
  },
  col1: {
    width: windowWidht * 0.68,
  },
  col2: {
    marginVertical: windowHeight * 0.05,
    width: windowWidht * 0.3,
  },
  col3: {
    width: windowWidht * 0.3,
  },
  col4: {
    width: windowWidht * 0.3,
  },

  col21: {
    width: windowWidht * 0.3,
  },
  col22: {
    width: windowWidht * 0.64,
  },
  content: {
    paddingTop: windowHeight * 0.02,
    paddingHorizontal: windowWidht * 0.02,
  },
  loadingImg: {
    alignItems: 'center',
    paddingTop: windowHeight * 0.04,
  },
  loading: {
    alignItems: 'center',
  },
  historyDay: {
    backgroundColor: '#FFFFFF',
    height: windowHeight * 0.18,
    width: windowWidht * 0.9,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  floatingScreen: {
    marginTop: windowHeight * 0.02,
    width: windowWidht * 0.9,
    height: windowWidht * 0.12,
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.5)',
  },
  labelTitle: {
    fontSize: 30,
    color: '#FFFFFF',
    marginBottom: windowHeight * 0.03,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label1: {
    fontSize: 14,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  label1H: {
    width: windowWidht * 0.8,
    fontSize: 20,
    color: '#000000',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  label2: {
    fontSize: 20,
  },
  label2white: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  label2whitecenter: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 20,
  },
  label3: {
    color: '#000000',
    fontSize: 16,
  },
  label4: {
    color: '#000000',
    fontSize: 12,
  },
  label3white: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  label2blue: {
    fontSize: 20,
    color: 'rgba(0,0,255,1)',
  },
  center: {
    // marginTop: windowHeight*0.1,
    alignItems: 'center',
  },
  header: {
    alignItems: 'center',
  },

  iconGroup: {
    flexDirection: 'row',
  },

  square: {
    alignItems: 'center',
    height: windowWidht * 0.22,
    width: windowWidht * 0.22,
    marginTop: windowWidht * 0.05,
    marginHorizontal: windowWidht * 0.1,
    backgroundColor: 'rgba(0,191,255,0.1)',
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: 'rgba(0,191,255,0.01)',
  },

  iconBack: {
    alignItems: 'center',
    height: windowWidht * 0.6,
    width: windowWidht * 0.8,
    marginVertical: windowWidht * 0.1,
    marginHorizontal: windowWidht * 0.1,
    backgroundColor: '#FFFFFF',
  },
  imageSend: {
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidht * 0.022,
    width: windowWidht * 0.4,
    height: windowWidht * 0.2,
    borderWidth: 5,
    borderColor: 'red',
  },

  icon: {
    marginVertical: windowHeight * 0.01,
    width: windowWidht * 0.78,
    height: windowWidht * 0.58,
    borderWidth: 5,
    borderColor: 'red',
  },
  images: {
    width: windowHeight * 0.42,
    height: windowHeight * 0.56,
    marginHorizontal: windowHeight * 0.02,
    marginTop: windowHeight * 0.01,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'red',
  },
  imagesLoading: {
    width: windowHeight * 0.12,
    height: windowHeight * 0.12,
    marginRight: 10,
    // borderRadius : 150/2,
    marginTop: windowHeight * 0.01,
    overflow: 'hidden',
    // borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.9)',
  },

  centerModal: {
    marginTop: windowHeight * 0.19,

    alignItems: 'center',
  },
  marginH: {
    marginHorizontal: windowWidht * 0.04,
    marginTop: windowHeight * 0.02,
  },
  leftButton: {
    width: windowWidht * 0.9,
  },
  marginTop: {
    marginTop: windowHeight * 0.05,
  },
  search: {
    width: windowWidht * 0.95,
    borderRadius: 1,
    borderBottomWidth: 0.5,
    color: '#000000',
    borderColor: 'rgba(0,0,0,0.5)',
    backgroundColor: '#FFFFFF',
    marginHorizontal: windowWidht * 0.05,
    marginVertical: windowHeight * 0.01,
  },
  searchGroup: {
    alignItems: 'center',
  },
  button: {
    marginHorizontal: windowWidht * 0.05,
    marginTop: windowHeight * 0.01,
    width: windowWidht * 0.87,
    borderRadius: 3,
    // borderWidth : 1,
    // borderColor : "red",
    height: windowHeight * 0.05,
    backgroundColor: '#1DA0E0',
    alignItems: 'center',
  },
  button2: {
    marginHorizontal: windowWidht * 0.05,
    marginTop: windowHeight * 0.01,
    width: windowWidht * 0.4,
    borderRadius: 3,
    // borderWidth : 1,
    // borderColor : "red",
    height: windowHeight * 0.05,
    backgroundColor: '#1DA0E0',
    alignItems: 'center',
  },
});
