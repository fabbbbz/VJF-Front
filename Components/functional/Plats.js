import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Card } from 'react-native-elements'
import HeartFav from './HeartFav'
import { useIsFocused } from '@react-navigation/native'

function Plats(props) {
	const token = props.token
	const [ordersHistory, setOrdersHistory] = useState([])
	const isFocused = useIsFocused()

	useEffect(() => {
		async function loadOrders() {
			var rawResponse = await fetch(
				`https://vitejaifaim.herokuapp.com/users/history/${token}`
			)
			var response = await rawResponse.json()
			setOrdersHistory(response.meals)
		}

		loadOrders()
	}, [isFocused])

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


function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(Plats)
