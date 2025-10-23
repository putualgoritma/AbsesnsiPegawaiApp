import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Circle} from 'react-native-animated-spinkit';

const Loading = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <Circle size={48} color="#D3D3D3" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
