import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {logo512} from '../../assets';

const ImgCstm = props => {
  return (
    <View style={styles.formGroup(props)}>
      {/* <Image style={styles.imgCstm} /> */}
      <Image style={styles.imgCstm(props)} source={logo512} />
      <Image />
    </View>
  );
};

export default ImgCstm;

const windowwidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
  imgCstm: props => ({
    width: windowHeight * (props.width ? props.width : 0.12),
    height: windowHeight * (props.height ? props.height : 0.12),
    borderRadius: windowwidth * (props.borderRadius ? props.borderRadius : 0),
    borderWidth: windowwidth * (props.borderWidth ? props.borderWidth : 0),
    borderColor: props.borderColor ? props.borderColor : '#4169E1',
  }),
  formGroup: props => ({
    // height: windowHeight * 0.3,
    // width: windowwidth * 0.5,
    marginRight: windowwidth * (props.gMarginRight ? props.gMarginRight : 0),
    marginLeft: windowwidth * (props.gMarginLeft ? props.gMarginLeft : 0),
    marginBottom:
      windowHeight * (props.gMarginBottom ? props.gMarginBottom : 0),
    marginTop: windowHeight * (props.gMarginTop ? props.gMarginTop : 0.02),
    alignItems: 'center',
  }),
});
