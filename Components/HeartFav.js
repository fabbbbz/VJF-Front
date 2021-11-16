import React, { useState } from 'react'
import { View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'

function HeartFav(props) {

	const [isFaved, setIsFaved] = useState(false)
	const addToFavorite = async () => {
		setIsFaved(true)
		updateUser()
	}

	const updateUser = async () => {
		try {
			const token = props.token
			const mealId = props.mealId
			const data = await fetch(
				`https://vitejaifaim.herokuapp.com/users/favorites`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
					body: `token=${token}&meal_id=${mealId}`,
				}
			)
			const result = await data.json()
		} catch (err) {
		}
	}

	if (isFaved == true) {
		var heartPlusColor = { color: 'red' }
	} else {
		var heartPlusColor = { color: 'black' }
	}

	return (
		<View >
			<MaterialCommunityIcons style={heartPlusColor} name="heart-plus" size={24} onPress={() => addToFavorite('ajout fav')} />
		</View >
	)
}

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}

export default connect(mapStateToProps, null)(HeartFav)
