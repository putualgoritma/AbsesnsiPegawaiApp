import { StatusBar, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import { Circle } from 'react-native-animated-spinkit'
import React from 'react'

const PageLoading = () => {
  return (
    <View style={styles.pages}>
    <StatusBar
       backgroundColor={'transparent'}
       translucent
 />
  <LinearGradient 
     colors={['#0f0c29','#302b63','#24243e']}
     style={{ flex: 1 }}>
<View style={styles.container}>
<Circle size={48} color="#FFF"/>
    </View>
    </LinearGradient>
    </View>
  )
}

export default PageLoading

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