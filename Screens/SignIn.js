import React from 'react'
import { StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { Text, Input } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function SignIn(props) {
	const [signUpEmail, setSignUpEmail] = useState('')
	const [signUpPassword, setSignUpPassword] = useState('')
	const [ErrorsSignin, setErrorsSignin] = useState('')
	const [token, setToken] = useState('')

	var handleSubmitSignin = async () => {
		// send user's infos to back
		const data = await fetch(
			`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/sign-in`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`,
			}
		)
		//get answer from back
		const body = await data.json()
		if (body.result == true) {
			//set token
			setToken(body.token)
			// store token in local-storage
			AsyncStorage.setItem('token', body.token)
			// store token in redux
			props.addToken(body.token)
			props.addFirstName(body.user.firstName)
			props.navigation.navigate('Mood', { screen: 'Mood' })
		} else {
			setErrorsSignin(body.error)
		}
	}

	var finishProcess = () => {
		props.navigation.navigate('SignUp', { screen: 'SignUp' })
	}

	return (
		<ScrollView>
			<TopBar navigation={props.navigation} />
			<View>
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
				<View style={{ alignSelf: 'center' }}>
					<NextButton title="LOGIN" onPress={() => handleSubmitSignin()} />
					<Text
						style={{
							textAlign: 'center',
							color: '#000000',
							marginTop: 20,
							marginBottom: 15,
							fontSize: 20,
						}}
					>
						Ou
					</Text>
				</View>
				<View style={styles.container}>
					<TouchableOpacity onPress={finishProcess}>
						<Text style={styles.text}>Continuer pour vous enregister</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Text style={styles.errormesssage}>{ErrorsSignin}</Text>
				</View>
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
	text: {
		fontSize: 20,
		color: '#0000FF',
	},
})

function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		},
		addFirstName: function (firstName) {
			dispatch({ type: 'addFirstName', firstName: firstName })
		},
	}
}

export default connect(null, mapDispatchToProps)(SignIn)
