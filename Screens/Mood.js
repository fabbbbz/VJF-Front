import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text, Input, Overlay, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import NextButton from '../Components/NextButton'
import NextButtonFullSize from '../Components/NextButtonFullSize'
import { connect } from 'react-redux'
import Geoloc from '../Components/Geoloc'
import { Ionicons } from '@expo/vector-icons'
import { MY_IP } from '@env'
import MoodIcon from '../Components/MoodIcon'

const moodsItems = [
	{
		name: '',
		img: require('./../assets/btn-fullrandom.png'),
		short: 'all',
		id: 1,
	},
	{
		name: 'Healthy',
		img: require('./../assets/btn-healthy.png'),
		short: 'healthy',
		id: 2,
	},
	{
		name: 'Comme chez Maman',
		img: require('./../assets/btn-maman.png'),
		short: 'comme chez maman',
		id: 3,
	},
	{
		name: 'Cuisine du Monde',
		img: require('./../assets/btn-cuisinemonde.png'),
		short: 'cuisine du monde',
		id: 4,
	},
	{
		name: 'Soir de Match',
		img: require('./../assets/btn-soirdematch.png'),
		short: 'soir de match',
		id: 5,
	},
	{
		name: 'A Partager',
		img: require('./../assets/btn-apartager.png'),
		short: 'a partager',
		id: 6,
	},
]

function Mood(props) {
	const [overlay, setOverlay] = useState(false)
	const [addressIsChanged, setAddressIsChanged] = useState(false)
	const [numRue, setNumRue] = useState('')
	const [ville, setVille] = useState('')
	const [codePostal, setcodePostal] = useState('')
	const [pricerange, setPricerange] = useState([])
	const [moodSelected, SetMoodSelected] = useState(false)
	const [errorMsg, setErrorMsg] = useState('')
	const [isSelected, setIsSelected] = useState(false) // mood selected, used to change color

	const changeAdress = () => {
		setOverlay(true)
	}

	const updateAdress = () => {
		setOverlay(false)
		setAddressIsChanged(true)
	}

	const getTheSupriseMeal = async () => {
		try {
			const token = props.token
			if (!token)
				setErrorMsg('Connectez-vous pour commandez votre repas surprise !')

			const dataToSend = {
				mood: props.mood,
				minprice: props.budget[0],
				maxprice: props.budget[1],
				coords: props.coords,
			}
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			}
			const data = await fetch(
				`https://vitejaifaim-master-i57witqbae0.herokuapp.com/orders/recap/${token}`,
				requestOptions
			)
			const formatedData = await data.json()
			// console.log('[MoodScreen] data fetched: ', formatedData)

			if (formatedData) {
				const { result, message, order } = formatedData
				if (result === 'success' && message !== 'no meal fits') {
					// GET THE ORDER ID
					props.orderReducer(order._id)
					props.navigation.navigate('TimeToPay', {
						screen: 'TimeToPay',
					})
				} else if (result === 'success' && message === 'no meal fits') {
					setErrorMsg(
						'Désolé, nous ne trouvons aucun plat correspondant à vos critères près de vous'
					)
				}
			}
		} catch (err) {
			console.log(err.message)
		}
	}
	var address
	if (addressIsChanged) {
		address = (
			<Text>
				{numRue}, {ville}, {codePostal}
			</Text>
		)
	} else {
		address = (
			<Text style={{ color: '#000000' }}>
				{' '}
				<Geoloc />{' '}
			</Text>
		)
	}
	return (
		<ScrollView>
			<TopBar showArrow={true} navigation={props.navigation} />

			<View style={{ alignItems: 'center' }}>
				<Text
					h3
					style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}
				>
					On y est presque !
				</Text>
			</View>
			<Text
				h4
				style={{
					color: '#000000',
					fontWeight: 'bold',
					textAlign: 'center',
					marginTop: 20,
				}}
			>
				Quel est votre mood ?
			</Text>

			<View style={styles.moodContainer}>
				{moodsItems.map(mood => (
					<MoodIcon
						key={mood.id}
						title={mood.name}
						short={mood.short}
						background={mood.img}
						setIsSelected={setIsSelected}
						isSelected={isSelected}
					/>
				))}
			</View>

			<View>
				<Text style={{ color: '#000000', marginTop: 15, fontWeight: 'bold' }}>
					{' '}
					Nombre de personnes affamées: 1
				</Text>
			</View>

			<View
				style={{
					marginTop: 15,
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<View
					style={{
						marginTop: 15,
						flexDirection: 'column',
						width: '90%',
						backgroundColor: '#FFFFFF',
						borderRadius: 5,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text h4 style={{ color: '#000000', fontWeight: 'bold' }}>
						{' '}
						Budget
					</Text>
					<View
						style={{
							marginTop: 15,
							marginBottom: 15,
							flexDirection: 'row',
							width: '90%',
							justifyContent: 'center',
							padding: 0,
							marginLeft: 2,
						}}
					>
						<Button
							onPress={() => {
								props.budgetHandle([5, 9.99])
							}}
							title="5-10€"
							buttonStyle={{
								backgroundColor: '#FFC901',
								borderRadius: 5,
								width: 80,
								marginRight: 10,
							}}
						/>
						<Button
							onPress={() => {
								props.budgetHandle([10, 14.99])
							}}
							title="10-15€"
							buttonStyle={{
								backgroundColor: '#F2A902',
								borderRadius: 5,
								width: 80,
								marginRight: 10,
							}}
						/>
						<Button
							onPress={() => {
								props.budgetHandle([15, 19.99])
							}}
							title="15-20€"
							buttonStyle={{
								backgroundColor: '#C95615',
								borderRadius: 5,
								width: 80,
								marginRight: 10,
							}}
						/>
						<Button
							onPress={() => {
								props.budgetHandle([20, 2000])
							}}
							title="YOLO!"
							buttonStyle={{
								backgroundColor: '#DB1919',
								borderRadius: 5,
								width: 80,
								marginRight: 10,
							}}
						/>
					</View>
				</View>
				<View
					style={{
						backgroundColor: '#FFFFFF',
						marginTop: 15,
						flexDirection: 'row',
						width: '90%',
						height: 40,
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Ionicons name="location-outline" size={24} color="#F2A902" />
					<Text
						style={{
							flex: 1,
							color: '#000000',
							fontWeight: 'bold',
							flexWrap: 'wrap',
							justifyContent: 'center',
						}}
					>
						Livré à:
					</Text>
					{address}
					<Ionicons
						name="ellipsis-vertical"
						size={24}
						color="#F2A902"
						onPress={() => changeAdress()}
						overlay={overlay}
						setOverlay={setOverlay}
					/>
				</View>
				<Overlay
					isVisible={overlay}
					onBackdropPress={() => setOverlay(false)}
					overlayStyle={{
						width: '90%',
						marginTop: 60,
						marginBottom: 50,
						paddingVertical: 20,
					}}
				>
					<ScrollView>
						<Input
							title="numRue"
							placeholder="N, rue"
							onChangeText={numRue => setNumRue(numRue)}
						/>
						<Input
							title="ville"
							placeholder="Ville"
							onChangeText={ville => setVille(ville)}
						/>
						<Input
							title="codePostal"
							placeholder="Code Postal"
							onChangeText={codePostal => setcodePostal(codePostal)}
						/>
					</ScrollView>
					<NextButton title="VALIDER" onPress={() => updateAdress()} />
				</Overlay>
				<Overlay
					isVisible={errorMsg ? true : false}
					onBackdropPress={() => setErrorMsg('')}
				>
					<Text>{errorMsg}</Text>
				</Overlay>
				<View
					style={{
						marginTop: 15,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<NextButtonFullSize
						title="VITE J'AI FAIM"
						onPress={getTheSupriseMeal}
					/>
				</View>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	moodContainer: {
		marginTop: 15,
		flexDirection: 'row',
		flexWrap: 'wrap',
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		// backgroundColor: '#FFFFFF',
		borderRadius: 5,
	},
})

function mapDispatchToProps(dispatch) {
	return {
		dietHandle: function (diet) {
			dispatch({ type: 'ADD_DIET', diet })
		},
		moodHandle: function (mood) {
			dispatch({ type: 'moodChoice', mood })
		},
		budgetHandle: function (budget) {
			dispatch({ type: 'budgetChoice', budget })
		},
		orderReducer: function (orderId) {
			dispatch({ type: 'STORE_ORDER', orderId })
		},
	}
}

function mapStateToProps(state) {
	return {
		mood: state.mood,
		budget: state.budget,
		order: state.order,
		token: state.token,
		coords: state.coords,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mood)
