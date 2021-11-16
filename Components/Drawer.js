import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Mood } from '../Screens/Mood'
import { Home } from '../Screens/Home'

const Drawer = createDrawerNavigator()

const DrawerNav = props => {
	return (
		<Drawer.Navigator initialRouteName="Home">
			<Drawer.Screen name="Home" component={Home} />
			<Drawer.Screen name="Mood" component={Mood} />
		</Drawer.Navigator>
	)
}

export default DrawerNav
