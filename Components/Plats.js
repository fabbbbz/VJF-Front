import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import HeartFav from '../Components/HeartFav'
import { connect } from 'react-redux'

<<<<<<< HEAD
function Plats(props) {
=======

function Plats(props) {

>>>>>>> clem
	const token = props.token

	const [ordersHistory, setOrdersHistory] = useState([])
	const [mealId, setMealId] = useState([])

	useEffect(() => {
		async function loadOrders() {
			// token en dur pour le test, A remplacer par :token
			var rawResponse = await fetch(
				`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/history/${token}`
			)
			var response = await rawResponse.json()

			setOrdersHistory(response.meals)
			setMealId(response.meals[1].mealId)
		}

		loadOrders()
	}, [])

	return (
		<View style={styles.container}>
<<<<<<< HEAD
			{ordersHistory.map((order, i) => (
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginTop: 25,
						marginBottom: 25,
					}}
				>
					<Text>{new Date(order.date).toLocaleDateString()}</Text>
					<Text>{order.mealName}</Text>
					<HeartFav mealId={order.mealId} />
				</View>
			))}
		</View>
=======
			{ordersHistory.map((order, j) => (
				< View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 25 }} key={j} >
					<Text>{new Date(order.date).toLocaleDateString()}</Text>
					<Text>{order.mealName}</Text>
					<HeartFav mealId={order.mealId} />
				</View >
			))
			}
		</View >
>>>>>>> clem
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
<<<<<<< HEAD
=======

>>>>>>> clem
function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

<<<<<<< HEAD
export default connect(mapStateToProps, null)(Plats)
=======
export default connect(mapStateToProps, null)(Plats)
>>>>>>> clem
