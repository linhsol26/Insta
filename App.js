import React, { Component } from 'react'
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as firebase from 'firebase';
import { firebaseConfig } from './firebase.config';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import LoginScreen from './components/auth/Login';
import MainScreen, { Main } from './components/Main'

const store = createStore(rootReducer, applyMiddleware(thunk))

const Stack = createStackNavigator();

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

export class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      logged: false
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loaded: true,
          logged: false
        })
      } else {
        this.setState({
          loaded: true,
          logged: true
        })
      }
    })
  }
  render() {
    const {loaded, logged} = this.state
    if (!loaded) {
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Text>Loading...</Text>
      </View>
    }
    if (!logged) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouterName="Landing">
            <Stack.Screen name='Landing' component={LandingScreen} options={{headerShown: false}}/>
            <Stack.Screen name='Register' component={RegisterScreen}/>
            {/* <Stack.Screen name='Login' component={LoginScreen}/> */}
          </Stack.Navigator>
        </NavigationContainer>
      )
    }

    return (
      <Provider store={store}>
        <MainScreen/>
      </Provider>
      
    )
  }
}

export default App
