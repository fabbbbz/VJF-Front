import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import { MY_IP } from '@env'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function SignIn(props) {
	const [signUpEmail, setSignUpEmail] = useState('')
	const [signUpPassword, setSignUpPassword] = useState('')
	const [ErrorsSignin, setErrorsSignin] = useState('')
	const [token, setToken] = useState('')

	var handleSubmitSignin = async () => {
		// send user's infos to back
		const data = await fetch(`http://172.17.1.105:3000/users/sign-in`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
		})
		//get answer from back
		const body = await data.json()
		if (body.result == true) {
			//set token
			setToken(body.token)
			// store token in local-storage
			AsyncStorage.setItem('token', body.token)
			// store token in redux
			props.addToken(body.token)
			props.navigation.navigate('Mood', { screen: 'Mood' })
		} else {
			setErrorsSignin(body.error)
		}
	}

	return (
		<ScrollView>
			<TopBar navigation={props.navigation} />
			<View style={{ alignItems: 'center' }}>
				<Text
					h3
					style={{
						textAlign: 'center',
						color: '#000000',
						marginTop: 15,
						marginBottom: 30,
					}}
				>
					Login Page
				</Text>
				<Input
					containerStyle={{ marginBottom: 15, width: '70%' }}
					inputStyle={{ marginLeft: 10 }}
					placeholder="Email"
					onChangeText={text => setSignUpEmail(text)}
				/>
				<Input
					containerStyle={{ marginBottom: 15, width: '70%' }}
					inputStyle={{ marginLeft: 10 }}
					secureTextEntry
					placeholder="Password"
					onChangeText={text => setSignUpPassword(text)}
				/>
			</View>
			<View style={{ alignItems: 'center', alignSelf: 'center' }}>
				<NextButton title="LOGIN" onPress={() => handleSubmitSignin()} />
				<Text
					style={{
						textAlign: 'center',
						color: '#000000',
						marginTop: 15,
						marginBottom: 15,
					}}
				>
					Ou
				</Text>
				<Button
					buttonStyle={{ backgroundColor: 'transparent' }}
					onPress={() =>
						props.navigation.navigate('SignUp', { screen: 'SignUp' })
					}
					title="Continuer pour vous enregister"
				/>
			</View>
			<View>
				<Text style={styles.errormesssage}>{ErrorsSignin}</Text>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: '#F4F4F4',
	},
	errormesssage: {
		marginTop: 50,
		textAlign: 'center',
		color: '#FF9800',
		fontSize: 20,
	},
})

function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		},
	}
}

export default connect(null, mapDispatchToProps)(SignIn)
