import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Card } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MY_IP } from "@env"
import HeartFav from '../Components/HeartFav'


export default function Plats() {

	const token = 's0ZwxY8HQFpUaQtinFq_aEo45nKGXIde'

	const [ordersHistory, setOrdersHistory] = useState([])
	const [mealId, setMealId] = useState([])

	useEffect(() => {

		async function loadOrders() {
			// token en dur pour le test, A remplacer par :token
			var rawResponse = await fetch(`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/history/${token}`)
			var response = await rawResponse.json()

			setOrdersHistory(response.meals)
			setMealId(response.meals[1].mealId)
			// console.log('logg', response.meals)
		}
		// console.log('mealId', mealId)
		loadOrders()
	}, []);

	return (

		<View style={styles.container}>
			{ordersHistory.map((order, i) => (
				< View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 25 }} >
					<Text>{new Date(order.date).toLocaleDateString()}</Text>
					<Text>{order.mealName}</Text>
					<HeartFav mealId={mealId} />
				</View >
			))
			}
		</View >
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 10,
		margin: 15,
		borderColor: '#F2A902',

	},
})