// Modules Import
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import diet from './reducers/diet' /*importe la fonction exportée par notre reduceur*/
import token from './reducers/token' /*import token from reducer*/
import donts from './reducers/donts'
import allergies from './reducers/allergies'
import budget from './reducers/budget'
import mood from './reducers/mood'
import order from './reducers/order'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { createDrawerNavigator } from '@react-navigation/drawer'

// Screens Import
import FirstScreen from './Screens/FirstScreen'
import Home from './Screens/Home'
import SignUp from './Screens/SignUp'
import Mood from './Screens/Mood'
import Favorites from './Screens/Favorites'
import SignIn from './Screens/SignIn'
import LastOrderScreen from './Screens/LastOrderScreen'
import UserPage from './Screens/UserPage'
import TimeToPay from './Screens/TimeToPay'
import History from './Screens/History'
import Livraison from './Screens/Livraison'
import FinalPage from './Screens/FinalPage'
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const store = createStore(
	combineReducers({ diet, token, donts, allergies, budget, mood, order })
)

const DrawerNav = props => {
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Mood" component={Mood} />
			<Drawer.Screen name="SignUp" component={SignUp} />
			<Drawer.Screen name="SignIn" component={SignIn} />
			<Drawer.Screen name="Favorites" component={Favorites} />
			<Drawer.Screen name="LastOrderScreen" component={LastOrderScreen} />
			<Drawer.Screen name="UserPage" component={UserPage} />
			<Drawer.Screen name="TimeToPay" component={TimeToPay} />
			<Stack.Screen name="History" component={History} />
			<Drawer.Screen name="Livraison" component={Livraison} />
			<Drawer.Screen name="FinalPage" component={FinalPage} />
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
					<Stack.Screen name="SignIn" component={SignIn} />
					<Stack.Screen name="LastOrderScreen" component={LastOrderScreen} />
					<Stack.Screen name="Drawer" component={DrawerNav} />
					<Stack.Screen name="Favorites" component={FinalPage} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
