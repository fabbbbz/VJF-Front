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
import firstName from './reducers/firstName'
import order from './reducers/order'
import coords from './reducers/coords'
import address from './reducers/address'
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
import Logout from './Components/Logout'
import FinalPage from './Screens/FinalPage'
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const store = createStore(
	combineReducers({
		diet,
		token,
		firstName,
		donts,
		allergies,
		budget,
		mood,
		order,
		coords,
		address,
	})
)

const DrawerNav = props => {
	return (
		<Drawer.Navigator screenOptions={{ headerShown: false }}>
			<Drawer.Screen name="First" component={FirstScreen} />
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Mood" component={Mood} />
			<Drawer.Screen name="SignUp" component={SignUp} />
			<Drawer.Screen name="SignIn" component={SignIn} />
			<Drawer.Screen name="Favoris" component={Favorites} />
			<Drawer.Screen name="LastOrderScreen" component={LastOrderScreen} />
			<Drawer.Screen name="Infos Perso" component={UserPage} />
			<Drawer.Screen name="TimeToPay" component={TimeToPay} />
			<Drawer.Screen name="Historique" component={History} />
			<Drawer.Screen name="Livraison" component={Livraison} />
			<Drawer.Screen name="FinalPage" component={FinalPage} />
			<Drawer.Screen name="Logout" component={Logout} />
		</Drawer.Navigator>
	)
}

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen name="Drawer" component={DrawerNav} />
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	)
}
