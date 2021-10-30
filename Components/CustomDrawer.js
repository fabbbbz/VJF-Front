import React from 'react'
import { View, Text } from 'react-native'
import {
	DrawerContentScrollView,
	DrawerItemList,
	DrawerItem,
} from '@react-navigation/drawer'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { connect } from 'react-redux'

const CustomDrawer = props => {
	const logout = () => {
		AsyncStorage.removeItem('token')
		props.deleteToken()
		props.navigation.navigate('SignIn', { screen: 'SignIn' })
	}

	return (
		<View style={{ flex: 1 }}>
			<DrawerContentScrollView>
				<DrawerItemList {...props} />
			</DrawerContentScrollView>
			<DrawerItem
				label={() => (
					<Text style={{ fontSize: 18, fontWeight: '500' }}>Logout</Text>
				)}
				icon={() => <MaterialIcons name="logout" color="#000000" size="20" />}
				onPress={logout}
			/>
		</View>
	)
}

function mapDispatchToProps(dispatch) {
	return {
		deleteToken: function (token) {
			dispatch({ type: 'deleteToken', token: token })
		},
	}
}

export default connect(null, mapDispatchToProps)(CustomDrawer)
