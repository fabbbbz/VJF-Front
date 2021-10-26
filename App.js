import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import diet from './reducers/diet' /*importe la fonction exportée par notre reduceur*/
import token from './reducers/token' /*import token from reducer*/
import donts from './reducers/donts'
import { Provider } from 'react-redux'

import { createStore, combineReducers } from 'redux'

const store = createStore(combineReducers({ diet, token, donts }))

import FirstScreen from './Screens/FirstScreen'
import Home from './Screens/Home'
import SignUp from './Screens/SignUp'
import Mood from './Screens/Mood'
import Favorites from './Screens/Favorites'

const Stack = createStackNavigator()

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="First" component={FirstScreen} />
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="SignUp" component={SignUp} />
					<Stack.Screen name="Mood" component={Mood} />
					<Stack.Screen name="Favorites" component={Favorites} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
