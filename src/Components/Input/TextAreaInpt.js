import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TxtInputProcess from '../../Function/TxtInputProcess';

const TextAreaInpt = props => {
  return (
    <View style={styles.formGroup(props)}>
      <TextInput
        style={styles.input(props)}
        placeholder={props.placeholder}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : '#c7c7c7'
        }
        multiline={true}
        // numberOfLines={4}
        value={props.value}
        readOnly={props.readOnly ? props.readOnly : false}
        editable={props.editable ? props.editable : true}
        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        onChangeText={item =>
          TxtInputProcess(props.setForm, props.form, props.type, item)
        }
        keyboardType={props.keyboardType}
      />
    </View>
  );
};

export default TextAreaInpt;

const windowWitdh = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  input: props => ({
    width: windowWitdh * (props.width ? props.width : 0.9),
    height: windowHeight * (props.heigt ? props.heigt : 0.15),
    backgroundColor: props.backgroundColor
      ? props.backgroundColor
      : Colors.white,
    borderColor: props.borderColor ? props.borderColor : Colors.dark,
    borderWidth: props.borderWidth ? props.borderWidth : 1,
    marginLeft: props.marginLeft ? props.marginLeft : 'auto',
    marginRight: props.marginRight ? props.marginRight : 'auto',
    marginVertical:
      windowHeight * props.marginVertical ? props.marginVertical : 0.01,
  }),
  formGroup: props => ({
    marginTop: windowHeight * (props.gMarginTop ? props.gMarginTop : 0.005),
    marginBottom:
      windowHeight * (props.gMarginBottom ? props.gMarginBottom : 0.005),
  }),
});
