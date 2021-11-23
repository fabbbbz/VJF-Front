import React from 'react'
import {
	StyleSheet,
	View,
	Image,
	ScrollView
} from 'react-native'
import { connect } from 'react-redux'
import { useState } from 'react'
import { Text, Input, Overlay } from 'react-native-elements'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NextButton from '../Components/visual/NextButton'
import SkipButton from '../Components/visual/SkipButton'


function SignUp(props) {
	const [signUpFirstname, setignUpFirstname] = useState('')
	const [signUpLastname, setsignUpLastname] = useState('')
	const [signUpEmail, setSignUpEmail] = useState('')
	const [signUpPassword, setSignUpPassword] = useState('')
	const [signUpPhone, setSignUpPhone] = useState('')
	const [ErrorsSignup, setErrorsSignup] = useState('')
	const [overlay, setOverlay] = useState(false)

	const [token, setToken] = useState('')

	const handleSubmitSignup = async () => {
		// send user's infos to back
		const data = await fetch(
			`https://vitejaifaim.herokuapp.com/users/sign-up`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `lastNameFromFront=${signUpLastname}&firstNameFromFront=${signUpFirstname}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&phoneFromFront=${signUpPhone}`,
			}
		)
		//get answer from back
		const body = await data.json()
		if (body.result == 'success') {
			//set token
			setToken(body.token)
			// store token in local-storage
			AsyncStorage.setItem('token', body.token)
			// store token in redux
			props.addToken(body.token)
			props.navigation.navigate('Home', { screen: 'Home' })
		} else {
			setErrorsSignup(body.error)
			setOverlay(true)
		}
	}
	const skipAction = () => {
		props.navigation.navigate('Home', { screen: 'Home' })
	}

	return (
		<KeyboardAwareScrollView>
			<ScrollView>
				<View
					style={{
						flex: 1,
						alignItems: 'center',
						marginTop: 60,
						justifyContent: 'center',
						backgroundColor: '#27292D',
					}}
				>
					<Image style={styles.logo} source={require('./../assets/VJF-logo.png')} />
					<View style={styles.content}>
						<Text style={styles.title}>Dites-nous en plus sur vous</Text>
						<Input
							containerStyle={{ marginTop: 25, marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							placeholder="Nom"
							onChangeText={text => setsignUpLastname(text)}
						/>
						<Input
							containerStyle={{ marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							placeholder="Prénom"
							onChangeText={text => setignUpFirstname(text)}
						/>
						<Input
							containerStyle={{ marginBottom: 15, width: '70%' }}
							inputStyle={{ marginLeft: 10 }}
							placeholder="Téléphone"
							onChangeText={text => setSignUpPhone(text)}
						/>
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
						<View
							style={{
								alignSelf: 'center',
								display: 'flex',
								flexDirection: 'column',
								justifyContent: 'center',
								alignItems: 'center',
								marginBottom: 50,
							}}
						>
							<View
								style={{ marginLeft: 10, flexDirection: 'row', justifyContent: 'space-between' }}
							>
								<Text
									style={{
										color: '#C4C4C4',
										alignSelf: 'center',
										marginLeft: 15,
										fontSize: 20,
									}}
								>
								</Text>
								<SkipButton title="SKIP" onPress={() => skipAction()} />
								<NextButton title="NEXT" onPress={() => handleSubmitSignup()} />
							</View>

							<View>
								<Overlay
									isVisible={overlay}
									onBackdropPress={() => setOverlay(false)}
									overlayStyle={{
										width: '75%',
										marginBottom: 50,
										paddingVertical: 20,
										textAlign: 'center',
										backgroundColor: 'rgba(0,0,0,0.9)'
									}}
								>
									<Text style={styles.errormesssage}>{ErrorsSignup}</Text>
								</Overlay>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>
		</KeyboardAwareScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	errormesssage: {
		textAlign: 'center',
		color: '#F2A902',
		fontSize: 20,
	},
	text: {
		fontSize: 20,
		color: '#F2A902',
		fontWeight: '700',
		textAlign: 'center',
	},
	title: {
		color: '#F2A902',
		textTransform: 'uppercase',
		fontWeight: '300',
		fontSize: 19,
		marginBottom: 20,
	},
	content: {
		alignItems: 'center',
		backgroundColor: '#ffffff',
		width: '85%',
		paddingTop: 20,
		paddingLeft: 20,
		paddingRight: 20,
		borderRadius: 10,
		alignSelf: 'center',
		marginVertical: 30,
	},
	logo: {
		marginTop: 15,
		height: 70,
		width: 70,
	},
	skip: {
		fontSize: 20,
		color: '#70726e'
	},
})

function mapDispatchToProps(dispatch) {
	return {
		addToken: function (token) {
			dispatch({ type: 'addToken', token: token })
		},
	}
}

export default connect(null, mapDispatchToProps)(SignUp)