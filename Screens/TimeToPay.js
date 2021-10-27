import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { MY_IP } from '@env'
import { connect } from 'react-redux'
import NextButton from '../Components/NextButton'
import NextButtonFullSize from '../Components/NextButtonFullSize'
import OrderRecap from '../Components/OrderRecap'
import Address from '../Components/Address'
import PaiementMode from '../Components/PaiementMode'

const TimeToPay = props => {
	const [order, setOrder] = useState({})

	const handlePaiement = () => {
		console.log('take my money')
		props.navigation.navigate('Livraison', {
			screen: 'Livraison',
		})
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<Text h3 style={styles.text}>
				Récapitulatif
			</Text>
			<OrderRecap />
			<Address />

			<NextButtonFullSize title="PAYER" onPress={handlePaiement} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	text: {
		textAlign: 'center',
		marginTop: 40,
	},
	tinyLogo: {
		width: 80,
		height: 80,
	},
})

export default TimeToPay
