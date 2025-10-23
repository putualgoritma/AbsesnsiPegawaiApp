import {
  faCamera,
  faPlusCircle,
  faTrash,
  faUndo,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../../Colors';
import {CameraImage, Camera_icon, logo512} from '../../assets';
import CboxArrFunction from '../../Function/CboxArrFunction';
import SelectDropdown from 'react-native-select-dropdown';
// import {colors, Distance} from '../../utils';

const MultypleCbox = props => {
  const [qty, setQty] = useState(1);
  const [show, setShow] = useState(true);
  // const [todos, setTodos] = useState([
  //   {id: 'sick', name: 'sakit', checked: false},
  //   {id: 'other', name: 'Lain-Lain', checked: false},
  // ]);

  var myloop = [];
  for (let index = 0; index < qty; index++) {
    myloop.push(
      <View key={index} style={styles.inputselect}>
        <SelectDropdown
          data={props.listStaffs}
          onSelect={(selectedItem, index) => {
            CboxArrFunction.getCboxArr(
              props.staffs,
              props.setStaffs,
              index,
              selectedItem.id.toString(),
            );
          }}
          defaultButtonText={'Pilih'}
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
        <View style={{alignItems: 'center'}}></View>
      </View>,
    );
  }

  return (
    <View>
      {myloop}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 'auto',
          marginVertical: 10,
          marginRight: windowWitdh * 0.05,
        }}>
        {/* {staffs[qty - 1] != null && ( */}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.primary,
            paddingHorizontal: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            setQty(qty + 1);
            setShow(true);
          }}>
          <FontAwesomeIcon icon={faPlusCircle} size={20} color={'#FFFFFF'} />
          <Text
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 15,
              marginLeft: 3,
            }}>
            Tambah
          </Text>
        </TouchableOpacity>
        {/* )} */}
        <View style={{marginHorizontal: 3}} />
        <TouchableOpacity
          style={{
            backgroundColor: Colors.danger,
            flexDirection: 'row',
            paddingHorizontal: 10,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => {
            qty > 1
              ? Alert.alert('Peringatan', `Anda Yakin Menghapus Foto ? `, [
                  {
                    text: 'Tidak',
                    // onPress : () => console.log('tidak')
                  },
                  {
                    text: 'Ya',
                    // onPress : () => {generateCodeOTP(); setModalVisible(true)}
                    onPress: () => {
                      setQty(qty - 1);
                      CboxArrFunction.deleteCbox(
                        props.staffs,
                        props.setStaffs,
                        qty,
                      );
                    },
                  },
                ])
              : alert('data tidak boleh dihapus');
          }}>
          <FontAwesomeIcon icon={faTrash} size={17} color={'#FFFFFF'} />
          <Text
            style={{
              color: '#ffffff',
              fontWeight: 'bold',
              fontSize: 15,
              marginLeft: 3,
            }}>
            Delete
          </Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 3}} />
      </View>
    </View>
  );
};

export default MultypleCbox;

const windowWitdh = Dimensions.get('window').width;
const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: {
    width: windowWitdh * 0.9,
    height: windowHeight * 0.3,
    backgroundColor: '#D9DDDC',
    borderColor: Colors.dark,
    borderWidth: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: windowHeight * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  button: {
    marginLeft: 'auto',
    width: windowWitdh * 0.25,
    height: windowHeight * 0.04,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: windowWitdh * 0.01,
  },
  txtButton: {
    color: Colors.white,
  },
  groupBottonRow: {
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: windowWitdh * 0.05,
    width: windowWitdh * 0.6,
    marginBottom: windowHeight * 0.02,
  },
  inputselect: {
    alignItems: 'center',
    marginVertical: windowHeight * 0.01,
  },

  dropdown1BtnStyle: {
    width: windowWidht * 0.9,
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
