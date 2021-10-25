
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import dietReducer from './reducers/diet';  /*importe la fonction exportée par notre reduceur*/
import { Provider } from 'react-redux';

import { createStore, combineReducers } from 'redux';

const store = createStore(combineReducers({ dietReducer }));

import FirstScreen from './Screens/FirstScreen';
import Home from './Screens/Home';
import SignUp from './Screens/SignUp';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} >
          <Stack.Screen name="First" component={FirstScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}