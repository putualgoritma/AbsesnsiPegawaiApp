import { StatusBar, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Circle } from 'react-native-animated-spinkit'
import React from 'react'

const ScreenLoading = () => {
  return (
<View style={styles.container}>
<Circle size={48} color="#D3D3D3"/>
    </View>
  )
}

export default ScreenLoading

const styles = StyleSheet.create({
    pages: {
        flex: 1,
      },
      container: {
      flex: 1,
      marginTop: StatusBar.currentHeight + 45 || 0,
      alignItems : 'center'
    },
})