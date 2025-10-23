import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const ButtonCstm = props => {
  return (
    <View
      style={{alignItems: props.gAlignItems ? props.gAlignItems : 'center'}}>
      <TouchableOpacity style={styles.button(props)} onPress={props.onPress}>
        <Text style={styles.buttonText(props)}>{props.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonCstm;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  button: props => ({
    backgroundColor: props.backgroundColor
      ? props.backgroundColor
      : Colors.primary,
    width: windowWidth * (props.width ? props.width : 0.8),
    padding: windowWidth * (props.padding ? props.padding : 0.04),
    marginVertical:
      windowHeight * (props.marginVertical ? props.marginVertical : 0.02),
    alignItems: props.alignItems ? props.alignItems : 'center',
    justifyContent: props.justifyContent ? props.justifyContent : 'center',
    borderRadius:
      windowWidth * (props.borderRadius ? props.borderRadius : 0.02),
  }),
  buttonText: props => ({
    color: props.color ? props.color : Colors.white,
    fontSize: props.fontSize ? props.fontSize : 18,
  }),
});
