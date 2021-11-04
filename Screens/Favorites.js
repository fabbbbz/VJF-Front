import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Button, Text, Card } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'

function Favorites(props) {
	const [favData, setFavData] = useState([])
	const token = props.token
	const isFocused = useIsFocused()

	useEffect(() => {
		async function loadFavorites() {
			try {
				var rawResponse = await fetch(
					`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/favorites/${token}`
				)
				var response = await rawResponse.json()
				setFavData(response.favorites)
			} catch (err) {
				console.log(err.message)
			}
		}

		loadFavorites()
	}, [isFocused])

	var favList = favData.map((fav, i) => {
		return (
			<Card
				key={i}
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
				<Card.Title style={{ marginBottom: 0 }}>
					{' '}
					{fav.name} {fav.price} €{' '}
				</Card.Title>
				<Button
					type="clear"
					onPress={() => {
						handleFavDeletion(fav._id)
					}}
					icon={<Ionicons size={25} name="trash-outline" color="#FFC901" />}
				/>
			</Card>
		)
	})

	async function handleFavDeletion(meal_id) {
		var favFilter = favData.filter(e => e._id !== meal_id)
		setFavData(favFilter)
		var rawResponse = await fetch(
			`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/favorites/${token}/${meal_id}`,
			{
				method: 'DELETE',
			}
		)
		var response = await rawResponse.json()
	}

	return (
		<ScrollView>
			<TopBar navigation={props.navigation} />
			<Text
				h3
				style={{
					alignSelf: 'center',
					marginTop: 15,
					textDecorationLine: 'underline',
					color: '#FFC901',
				}}
			>
				Favoris
			</Text>
			{favList}
		</ScrollView>
	)
}

function mapStateToProps(state) {
	return {
		token: state.token,
	}
}
export default connect(mapStateToProps, null)(Favorites)
