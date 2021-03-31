import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import * as firebase from 'firebase';
import { firebaseConfig } from './firebase.config';

const Stack = createStackNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouterName="Landing">
        <Stack.Screen name='Landing' component={LandingScreen} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
