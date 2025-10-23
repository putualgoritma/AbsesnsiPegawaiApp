/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Router from './src/router';
import { LogBox } from 'react-native';
import {store} from './src/redux'
import {Provider} from 'react-redux'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    LogBox.ignoreLogs(['Setting a timer', 'Animated: `useNativeDriver`'])
    return(
      <Provider store = {store}>
        <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <Router/>
        </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    )
  
}