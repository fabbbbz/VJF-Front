import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import HeartFav from './HeartFav'

function Plats(props) {
	const token = props.token
	const [ordersHistory, setOrdersHistory] = useState([])

	useEffect(() => {
		async function loadOrders() {
			var rawResponse = await fetch(
				`https://vitejaifaim.herokuapp.com/users/history/${token}`
			)
			var response = await rawResponse.json()
			setOrdersHistory(response.meals)
		}

		loadOrders()
	}, [])

	return (
		ordersHistory.map((order, k) => (
			<Card
				key={k}
				containerStyle={{
					borderRadius: 10,
					elevation: 4,
					shadowOffset: { width: 2, height: 2 },
					shadowColor: 'rgba(0,0,0, 0.2)',
					shadowOpacity: 0.5,
					shadowRadius: 2,
				}}
				wrapperStyle={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
					flexWrap: 'nowrap',
					alignItems: 'center',
				}}
			>
				<Card.Title style={{ marginBottom: 0, alignItems: 'center' }}>
					{order.mealName}
				</Card.Title>
				<HeartFav mealId={order.mealId} />
			</Card>
		))
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	userAllergies: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		margin: 15,
		borderColor: '#F2A902',
	},
	sectionTitle: {
		marginBottom: 10,
		marginTop: 10,
		textAlign: 'center',
	},
})

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(Plats)
