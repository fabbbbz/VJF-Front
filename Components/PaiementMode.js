import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text, Input } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'

const PaiementMode = props => {
	const [lastOrder, setLastOrder] = useState({ meal: '', restaurant: '' })

	useEffect(() => {
		// Fetch data to get last order
	}, [])

	return (
		<View style={styles.container}>
			<Text h4 style={styles.text}>
				Paiement
			</Text>
			<Text style={styles.text}>de : La Pizzeria des Gros</Text>
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

export default PaiementMode
