import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Dropdown = props => {
  return (
    <View style={styles.form}>
      <View style={styles.inputselect}>
        <SelectDropdown
          data={props.categories}
          onSelect={(selectedItem, index) => {
            props.setForm({
              ...props.form,
              category_id: selectedItem.id.toString(),
            });
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
      </View>
    </View>
  );
};

export default Dropdown;

const windowWitdh = Dimensions.get('window').width;
const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
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
