import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Label = props => {
  return (
    <View style={styles.formGroup(props)}>
      <Text style={styles.label(props)}>
        {props.title ? props.title : 'judul wajib diisi*'}
      </Text>
    </View>
  );
};

export default Label;

const windowWitdh = Dimensions.get('window').width;
const windowWidht = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  label: props => ({
    fontSize: props.size ? props.size : 16,
    fontWeight: props.weight ? props.weight : 'bold',
    color: props.color ? props.color : Colors.dark,
    marginLeft: windowWidht * (props.marginLeft ? props.marginLeft : 0.05),
    marginRight: windowWidht * (props.marginRight ? props.marginRight : 0),
    marginTop: windowWidht * (props.marginTop ? props.marginTop : 0),
    marginBottom: windowWidht * (props.marginBottom ? props.marginBottom : 0),
  }),
  formGroup: props => ({
    marginTop: windowHeight * (props.gMarginTop ? props.gMarginTop : 0.005),
    marginBottom:
      windowHeight * (props.gMarginBottom ? props.gMarginBottom : 0.005),
    alignItems: props.gAlignItems ? props.gAlignItems : 'baseline',
  }),
});
