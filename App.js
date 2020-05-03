/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Platform,
} from 'react-native';


import 'react-native-gesture-handler';
import Navigator from './src/routes/navigator';

// import Geolocation from '@react-native-community/geolocation';
const App = () => {
  return (
    <>
      <StatusBar
        backgroundColor={'rgba(0,0,0,0)'}
        barStyle="light-content"
        translucent
      />

      <Navigator />
    </>
  );
};


export default App;
