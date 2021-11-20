import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button, Text, Card } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import TopBar from '../Components/visual/TopBar'
function Favorites(props) {
	const [favData, setFavData] = useState([])
	const token = props.token
	const isFocused = useIsFocused()
	const [FavExists, setFavExists] = useState(false)

	useEffect(() => {
		async function loadFavorites() {
			var rawResponse = await fetch(
				`https://vitejaifaim.herokuapp.com/users/favorites/${token}`
			)
			var response = await rawResponse.json()
			setFavData(response.favorites)
			if (response.favorites.length > 0 && response.favorites[0] !== null) {
				setFavExists(true)
			}
		}
		loadFavorites()
	}, [isFocused])

	if (FavExists) {
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
					<Card.Title style={{ marginBottom: 0, alignItems: 'center' }}>
						{fav.name} {fav.price} €
					</Card.Title>
					<Button
						title=""
						type="clear"
						onPress={() => {
							handleFavDeletion(fav._id)
						}}
						icon={<Ionicons size={25} name="trash-outline" color="#FFC901" />}
					/>
				</Card>
			)
		})
	} else {
		var favList = (
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'center',
					marginTop: 25,
					marginBottom: 25,
				}}
			>
				<Text>Vous n'avez pas de favoris renseigné</Text>
			</View>
		)
	}

	async function handleFavDeletion(meal_id) {
		var favFilter = favData.filter(e => e._id !== meal_id)
		setFavData(favFilter)
		var rawResponse = await fetch(
			`https://vitejaifaim.herokuapp.com/users/favorites/${token}/${meal_id}`,
			{
				method: 'DELETE',
			}
		)
		var response = await rawResponse.json()
		if (response.favorites.length == 0) {
			setFavExists(false)
		}
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<ScrollView>
				<Text h3 style={{ color: '#F2A902', textAlign: 'center', marginTop: '4%' }}>
					Favoris
				</Text>
				<ScrollView style={styles.userDonts}>
					{favList}
				</ScrollView>
			</ScrollView>
		</View>
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
export default connect(mapStateToProps, null)(Favorites)
