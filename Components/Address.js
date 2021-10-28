import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { MY_IP } from '@env'

const Address = props => {
	const [address, setAddress] = useState('')

	useEffect(() => {
		const token = 'BHbxITgVrZnaS5OQHxYVgaIaROQHliZr' // HARD CODED FOR TEST
		const fetchUser = async () => {
			const data = await fetch(`http://${MY_IP}:3000/users/me/${token}`)
			const user = await data.json()
			setAddress(user.userInfo.adresse[0])
		}
		fetchUser()
	}, [])

	return (
		<View style={styles.container}>
			<Text h4 style={styles.text}>
				Adresse de livraison
			</Text>
			<Text style={styles.text}>{address}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		margin: 15,
		borderColor: '#F2A902',
	},
	text: {
		textAlign: 'center',
		marginVertical: 3,
	},
})

export default Address
