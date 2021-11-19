import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { Button, Text, Card, Overlay, Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import TopBar from '../Components/visual/TopBar'
import DietRadios from '../Components/visual/MyRadio'
import NextButton from '../Components/visual/NextButton'
import { overlay } from 'react-native-paper'

function UserPage(props) {
	const [user, setUser] = useState('')
	const token = props.token
	const [diet, setDiet] = useState('')
	const [overlayVisible, setOverlayVisible] = useState(false)
	const [overlayPhone, setOverlayPhone] = useState(false)
	const [overlayEmail, setOverlayEmail] = useState(false)
	const [overlayLastName, setOverlayLastName] = useState(false)
	const [overlayFirstname, setOverlayFirstname] = useState(false)
	const [overlay, setOverlay] = useState(false)
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')

	useEffect(() => {
		async function loadUser() {
			try {
				var rawResponse = await fetch(
					`http://192.168.1.14:3000/users/me/${token}`
				)
				var response = await rawResponse.json()
				setUser(response.userInfo)
				setDiet(response.userInfo.regimeAlim)
				setFirstName(response.userInfo.firstName)
				setLastName(response.userInfo.lastName)
				setEmail(response.userInfo.email)
				setPhone(response.userInfo.phone)
			} catch (err) {
				console.log(err)
			}
		}
		loadUser()
	}, [])

	const updateLastname = async () => {
		console.log(lastName)
		await fetch(
			`http://192.168.1.14:3000/users/update-me/${token}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `firstName=${firstName}`,
			}
		)
		setOverlayLastName(false)
	}

	const updateFirstName = async () => {
		console.log(firstName)
		await fetch(
			`http://192.168.1.14:3000/users/update-me/${token}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `lastName=${lastName}`,
			}
		)
		setOverlayFirstname(false)
	}

	const updatePhone = async () => {
		console.log(phone)
		await fetch(
			`http://192.168.1.14:3000/users/update-me/${token}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `phone=${phone}`,
			}
		)
		setOverlayPhone(false)
	}

	const updateEmail = async () => {
		console.log(email)
		await fetch(
			`http://192.168.1.14:3000/users/me/${token}`,
			{
				method: 'PUT',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: `email=${email}`,
			}
		)
		setOverlayEmail(false)
	}

	const showRegime = () => {
		setDiet(props.diet)
		setOverlayVisible(false)
		const updateDiet = async () => {
			try {
				const dataToSend = {
					token: token,
					diet: props.diet,
				}
				const requestOptions = {
					method: 'PUT',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(dataToSend),
				}
				const data = await fetch(
					`https://vitejaifaim.herokuapp.com/users/update-diet`,
					requestOptions
				)
			} catch (err) {
				console.log(err)
			}
		}
		updateDiet()
	}

	const handleDiet = () => {
		setOverlayVisible(true)
	}

	return (
		<ScrollView>
			<TopBar navigation={props.navigation} />
			<Text h4 style={{ color: '#F2A902', textAlign: 'center', marginTop: '4%' }}>Informations Personnelles</Text>

			<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
				<Card.Title style={{ marginBottom: 0 }}> Nom:</Card.Title>
				<Text>{firstName} </Text>
				<Button
					type="clear"
					onPress={() => setOverlayFirstname(true)}
					icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
				/>
			</Card>
			<Overlay
				name='firstname'
				isVisible={overlayFirstname}
				onBackdropPress={() => setOverlayFirstname(false)}
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
				}}
			>

				<Input
					title="FirstName"
					placeholder="Change your First Name"
					onChangeText={fname => setFirstName(fname)}
				/>

				<NextButton title="VALIDER" onPress={() => updateFirstName()} />
			</Overlay>

			<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
				<Card.Title style={{ marginBottom: 0 }}> Prenom:</Card.Title>
				<Text>{lastName} </Text>
				<Button
					type="clear"
					onPress={() => setOverlayLastName(true)}
					icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
				/>
			</Card>

			<Overlay
				name='lastname'
				isVisible={overlayLastName}
				onBackdropPress={() => setOverlayLastName(false)}
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
				}}
			>
				<ScrollView>
					<Input
						title="LastName"
						placeholder="Change your Last Name"
						onChangeText={lname => setLastName(lname)}
					/>
				</ScrollView>
				<NextButton title="VALIDER" onPress={() => updateLastname()} />
			</Overlay>

			<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
				<Card.Title style={{ marginBottom: 0 }}> Email:</Card.Title>
				<Text>{email} </Text>
				<Button
					type="clear"
					onPress={() => setOverlayEmail(true)}
					icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
				/>

			</Card>
			<Overlay
				isVisible={overlayEmail}
				onBackdropPress={() => setOverlayEmail(false)}
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
				}}
			>
				<Input
					name='email'
					title="Email"
					placeholder="Change your Email"
					onChangeText={email => setEmail(email)}
				/>
				<NextButton title="VALIDER" onPress={() => updateEmail()} />
			</Overlay>

			<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
				<Card.Title style={{ marginBottom: 0 }}> Téléphone:</Card.Title>
				<Text>{phone} </Text>
				<Button
					type="clear"
					onPress={() => setOverlayPhone(true)}
					icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
				/>
			</Card>


			<Overlay
				isVisible={overlayPhone}
				onBackdropPress={() => setOverlayPhone(false)}
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
				}}
			>
				<Input
					name='phone'
					title="Phone"
					placeholder="Change your Phone"
					onChangeText={phone => setPhone(phone)}
				/>
				<NextButton title="VALIDER" onPress={() => updatePhone()} />
			</Overlay>


			<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
				<Card.Title style={{ marginBottom: 0 }}> Adresse:</Card.Title>
				<Text>{props.address} </Text>
				<Button
					type="clear"
					onPress={() => setOverlay(true)}
					icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
				/>
			</Card>


			<Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
				<Card.Title style={{ marginBottom: 0 }}>
					{' '}
					Régime alimentaire:
				</Card.Title>
				<Text>{diet} </Text>
				<Button
					type="clear"
					onPress={handleDiet}
					icon={<Ionicons size={25} name="create-outline" color="#FFC901" />}
				/>
			</Card>
			<Overlay
				isVisible={overlayVisible}
				onBackdropPress={showRegime}
				overlayStyle={{
					width: '90%',
					marginTop: 60,
					marginBottom: 50,
					paddingVertical: 20,
				}}
			>
				<Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 20 }}>
					Changer mon régime alimentaire
				</Text>
				<DietRadios />
			</Overlay>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		borderRadius: 10,
		elevation: 4,
		shadowOffset: { width: 2, height: 2 },
		shadowColor: 'rgba(0,0,0, 0.2)',
		shadowOpacity: 0.5,
		shadowRadius: 2,
	},
	wrapper: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		flexWrap: 'nowrap',
		alignItems: 'center',
	},
})

function mapStateToProps(state) {
	return {
		token: state.token,
		address: state.address,
		diet: state.diet,
	}
}

export default connect(mapStateToProps, null)(UserPage)
