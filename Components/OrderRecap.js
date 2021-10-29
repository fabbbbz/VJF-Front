import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import { connect } from 'react-redux'
import { MY_IP } from '@env'

const OrderRecap = props => {
	const [price, setPrice] = useState(0)

	useEffect(() => {
		// Fetch data to get last order
		const token = props.token
		const fetchUser = async () => {
			const data = await fetch(`https://vitejaifaim-master-i57witqbae0.herokuapp.com/orders/recap/${token}`)
			const user = await data.json()
			// console.log(user)
			setPrice(user.orderPrice)
		}
		fetchUser()
	}, [])

	return (
		<View style={styles.container}>
			<Text h3 style={styles.text}>
				Plat mystere
			</Text>
			<Text style={styles.text}>qte: {props.quantity}</Text>
			<Text h5 style={{ textAlign: 'center', marginVertical: 10 }}>
				Prix total : {price} €
			</Text>
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

function mapStateToProps(state) {
	return {
		quantity: 1, // CHANGE FOR state.quantity
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(OrderRecap)
