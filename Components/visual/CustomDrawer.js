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
import { Image, StyleSheet } from 'react-native'

const CustomDrawer = props => {
	const logout = () => {
		AsyncStorage.removeItem('token')
		props.deleteToken()
		props.navigation.navigate('SignIn', { screen: 'SignIn' })
	}

	return (
		<View style={{
			flex: 1,
		}}
		>
			<DrawerContentScrollView>
				<View style={styles.logoview}>
					<Image
						style={styles.tinyLogo}
						source={require('../../assets/VJF-logo.png')}
					/>
				</View>
				<View>
					<DrawerItemList {...props} />
				</View>
			</DrawerContentScrollView>
			<DrawerItem
				label={() => (
					<Text style={{ fontSize: 18, fontWeight: '500', fontWeight: 'bold' }}>Logout</Text>
				)}
				icon={() => <MaterialIcons size={23} name="logout" color="#000000" />}
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

const styles = StyleSheet.create({
	tinyLogo: {
		marginTop: 30,
		width: 50,
		height: 50,
	},
	logoview: {
		alignItems: 'center'
	},
})

export default connect(null, mapDispatchToProps)(CustomDrawer)
