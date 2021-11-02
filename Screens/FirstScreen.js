import React from 'react'
import {
	StyleSheet,
	View,
	Image,
	ImageBackground,
} from 'react-native'
import { Text } from 'react-native-elements'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Permissions from 'expo-permissions'

// Ignore all logs for DEMO
//LogBox.ignoreAllLogs(); //Ignore all log notifications

function FirstScreen(props) {
	useEffect(() => {
		// Permission for iOS
		Permissions.getAsync(Permissions.NOTIFICATIONS)
			.then(statusObj => {
				// Check if permission to send notification is ok
				//console.log(statusObj.status)
				// Check if we already have permission
				if (statusObj.status !== 'granted') {
					// If permission is not there, ask for the same
					return Permissions.askAsync(Permissions.NOTIFICATIONS)
				}
				return statusObj
			})
			.then(statusObj => {
				// If permission is still not given throw error
				if (statusObj.status !== 'granted') {
					throw new Error('Permission not granted')
				}
			})
			.catch(err => {
				return null
			})
		AsyncStorage.getItem('token', (error, value) => {
			if (value) {
				props.addToken(value)
				// props.navigation.navigate('Mood', { screen: "Mood" })
			}
		})
	}, [])

	var redirectUser = () => {
		if (props.token) {
			props.navigation.navigate('Mood', { screen: 'Mood' })
		} else {
			props.navigation.navigate('SignIn', { screen: 'SignIn' })
		}
	}

	return (
		<ImageBackground
			source={require('./../assets/BGVJF-min.png')}
			resizeMode="cover"
			style={styles.image}
		>
			<View style={styles.content}>
				<Image
					style={styles.bigLogo}
					source={require('./../assets/VJF-logo-big.png')}
				/>
				<View>
					<Text h4 style={styles.text}>
						Vous nous renseignez
					</Text>
					<Text h4 style={styles.text2}>
						On choisit pour vous
					</Text>

					<NextButton
						title="Commencer"
						onPress={() => {
							redirectUser()
						}}
					/>
				</View>
			</View>
		</ImageBackground>
	)
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		textAlign: 'center',
		color: '#F2A902',
	},
	text2: {
		textAlign: 'center',
		color: '#F2A902',
		marginBottom: 30,
	},
	bigLogo: {
		height: 390,
		width: 320,
		marginBottom: 30,
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
