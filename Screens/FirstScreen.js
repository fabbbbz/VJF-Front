import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permissions from "expo-permissions"
import Notification from '../Components/Notification'

function FirstScreen(props) {
	useEffect(() => {
		// Permission for iOS
		Permissions.getAsync(Permissions.NOTIFICATIONS)
			.then(statusObj => {
				console.log(statusObj.status)
				// Check if we already have permission
				if (statusObj.status !== "granted") {
					// If permission is not there, ask for the same
					return Permissions.askAsync(Permissions.NOTIFICATIONS)
				}
				return statusObj
			})
			.then(statusObj => {
				// If permission is still not given throw error
				if (statusObj.status !== "granted") {
					throw new Error("Permission not granted")
				}
			})
			.catch(err => {
				return null
			})
		AsyncStorage.getItem('token', (error, value) => {
			if (value) {
				console.log("value getItem", value)
				props.addToken(value)
				// props.navigation.navigate('Mood', { screen: "Mood" })
			}
		})
	}, [])

	return (
		<View style={styles.container}>
			<Image
				source={require('../assets/VJF-logo.png')}
				style={{ width: 200, height: 200, marginTop: 100 }}
			/>

			<Text h1 style={{ textAlign: 'center', color: '#000000', marginTop: 50 }}>
				Vite j'ai faim!
			</Text>

			<Text h4 style={{ textAlign: 'center', color: '#F2A902', marginTop: 50 }}>
				Vous nous renseignez, on choisit pour vous!
			</Text>
			<ScrollView>
				<NextButton
					title="HOME"
					onPress={() => {
						props.navigation.navigate('Home', { screen: 'Home' })
					}}
				/>
				<NextButton
					title="SIGNUP"
					onPress={() => {
						props.navigation.navigate('SignUp', { screen: 'SignUp' })
					}}
				/>
				<NextButton
					title="MOOD"
					onPress={() => {
						props.navigation.navigate('Mood', { screen: 'Mood' })
					}}
				/>
				<NextButton
					title="LAST ORDER"
					onPress={() => {
						props.navigation.navigate('LastOrderScreen', {
							screen: 'LastOrderScreen',
						})
					}}
				/>
				<NextButton
					title="SIGN IN"
					onPress={() => {
						props.navigation.navigate('LastOrderScreen', {
							screen: 'LastOrderScreen',
						})
					}}
				/>
				<NextButton
					title="HISTORY"
					onPress={() => {
						props.navigation.navigate('History', {
							screen: 'History',
						})
					}}
				/>
				<NextButton
					title="TESTNOTIF"
					onPress={Notification}
				/>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#F4F4F4',
	},
})
//get token from store
function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		},
	}
}
function mapStateToProps(state) {
	return { token: state.token }
}
export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen)
