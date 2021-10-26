import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import diet from './reducers/diet' /*importe la fonction exportée par notre reduceur*/
import token from './reducers/token' /*import token from reducer*/
import donts from './reducers/donts'
import allergies from './reducers/allergies'
import { Provider } from 'react-redux'

import { createStore, combineReducers } from 'redux'

const store = createStore(combineReducers({ diet, token, donts, allergies }))

import FirstScreen from './Screens/FirstScreen'
import Home from './Screens/Home'
import SignUp from './Screens/SignUp'
import Mood from './Screens/Mood'
<<<<<<< HEAD
import Favorites from './Screens/Favorites'
=======
import SignIn from './Screens/SignIn'
import LastOrderScreen from './Screens/LastOrderScreen'
// import DrawerNav from './Components/Drawer'
import { createDrawerNavigator } from '@react-navigation/drawer'
>>>>>>> 3d2a4a9a74fb1a635b792c919b7e5d95d12f440f

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const DrawerNav = props => {
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Mood" component={Mood} />
			<Drawer.Screen name="SignUp" component={SignUp} />
			<Drawer.Screen name="SignIn" component={SignIn} />
			<Drawer.Screen name="LastOrderScreen" component={LastOrderScreen} />
		</Drawer.Navigator>
	)
}

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="First" component={FirstScreen} />
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="SignUp" component={SignUp} />
					<Stack.Screen name="Mood" component={Mood} />
<<<<<<< HEAD
					<Stack.Screen name="Favorites" component={Favorites} />
=======
					<Stack.Screen name="SignIn" component={SignIn} />
					<Stack.Screen name="LastOrderScreen" component={LastOrderScreen} />
					<Stack.Screen name="Drawer" component={DrawerNav} />
>>>>>>> 3d2a4a9a74fb1a635b792c919b7e5d95d12f440f
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
