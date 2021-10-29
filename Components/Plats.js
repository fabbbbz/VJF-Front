import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View, Card } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MY_IP } from "@env"


export default function Plats() {

	const [ordersHistory, setOrdersHistory] = useState([])
	const token = 's0ZwxY8HQFpUaQtinFq_aEo45nKGXIde'

	function addToFavorite() {
		console.log('addToFavorite')
	}
	function removeFromFavorite() {
		console.log('removeFromFavorite')
	}

	useEffect(() => {

		async function loadOrders() {
			// token en dur pour le test, A remplacer par :token
			var rawResponse = await fetch(`http://172.17.1.145:3000/users/history/${token}`)
			var response = await rawResponse.json()

			setOrdersHistory(response.meals)
			console.log('logg', response)
		}


		loadOrders()
	}, []);

	console.log('azerty', ordersHistory)
	// const event = new Date(meals.date);
	// const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

	// console.log('date', event.toLocaleDateString('fr-FR', options));


	return (

		<View >
			{ordersHistory.map((order, i) => (
				< View >
					<Text>{new Date(order.date).toLocaleDateString()}</Text>
					<Text>{order.mealName}</Text>
					<View>
						<MaterialCommunityIcons name="heart-plus" size={24} color="black" onPress={() => addToFavorite()} />
						<MaterialCommunityIcons name="heart-remove" size={24} color="black" onPress={() => removeFromFavorite()} />
					</View >
				</View >
			))
			}
		</View >
	)
}

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#FFFFFF',
//         paddingVertical: 10,
//         paddingHorizontal: 12,
//         borderRadius: 10,
//         margin: 15,
//         borderColor: '#F2A902',

//     },
// })

// style={styles.container}
// style={{ flexDirection: 'row', justifyContent: 'space-between' }}
// style={{ flexDirection: 'row', alignContent: 'flex-start' }}
