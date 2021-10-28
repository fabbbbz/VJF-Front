import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text, Input, Overlay, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import Moods from '../Components/Moods'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'
import Geoloc from '../Components/Geoloc'
import { Ionicons } from '@expo/vector-icons'
// import { MY_IP } from '@env'
const MY_IP = '172.17.1.176'

function Mood(props) {
	const [overlay, setOverlay] = useState(false)
	const [addressIsChanged, setAddressIsChanged] = useState(false)
	const [numRue, setNumRue] = useState('')
	const [ville, setVille] = useState('')
	const [codePostal, setcodePostal] = useState('')
	const [pricerange, setPricerange] = useState([])

	console.log('mood:', props.mood)
	console.log('budget', props.budget)

	const changeAdress = () => {
		setOverlay(true)
	}

	const updateAdress = () => {
		setOverlay(false)
		setAddressIsChanged(true)
	}

	const getTheSupriseMeal = async () => {
		try {
			const token = 'BHbxITgVrZnaS5OQHxYVgaIaROQHliZr' // HARD CODED FOR TEST

			const dataToSend = {
				mood: props.mood,
				minprice: props.budget[0],
				maxprice: props.budget[1],
			}
			const requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToSend),
			}
			const data = await fetch(
				`http://${MY_IP}:3000/orders/recap/${token}`,
				requestOptions
			)
			const formatedData = await data.json()
			console.log('data: ', formatedData)

			if (formatedData) {
				const { result, message } = formatedData
				if (result === 'success' && message !== 'no meal fits') {
					props.navigation.navigate('TimeToPay', {
						screen: 'TimeToPay',
					})
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
			<View>
				<Text style={{ color: '#000000', marginTop: 15, fontWeight: 'bold' }}>
					{' '}
					Quel est votre mood ?
				</Text>
			</View>

			<View
				style={{
					marginTop: 15,
					flexDirection: 'row',
					flexWrap: 'wrap',
					width: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					alignSelf: 'center',
					// backgroundColor: '#FFFFFF',
					borderRadius: 5,
				}}
			>
				<Button
					icon={
						<Icon name="shuffle" size={15} color="white" iconPosition="top" />
					}
					onPress={() => {
						props.moodHandle('total random')
					}}
					title="Surprise Totale"
					buttonStyle={styles.moodButton}
				/>
				<Button
					onPress={() => {
						props.moodHandle('healthy')
					}}
					title="Healthy"
					buttonStyle={styles.moodButton}
				/>
				<Button
					onPress={() => {
						props.moodHandle('comme chez maman')
					}}
					title="Comme chez Maman"
					buttonStyle={styles.moodButton}
				/>
				<Button
					onPress={() => {
						props.moodHandle('cuisine du monde')
					}}
					title="Cuisine du monde"
					buttonStyle={styles.moodButton}
				/>
				<Button
					onPress={() => {
						props.moodHandle('soir de match')
					}}
					title="Soir de Match"
					buttonStyle={styles.moodButton}
				/>
				<Button
					onPress={() => {
						props.moodHandle('a partager')
					}}
					title="A partager"
					buttonStyle={styles.moodButton}
				/>
			</View>

			{/* <Moods /> */}
			<View>
				<Text style={{ color: '#000000', marginTop: 15, fontWeight: 'bold' }}>
					{' '}
					Nombre de personnes affamées{' '}
				</Text>
			</View>

			<View style={{ marginTop: 15, width: '100%', alignItems: 'center' }}>
				<View
					style={{
						marginTop: 15,
						flexDirection: 'column',
						width: '90%',
						alignItems: 'center',
						backgroundColor: '#FFFFFF',
						borderRadius: 5,
					}}
				>
					<Text
						h4
						style={{ color: '#000000', fontWeight: 'bold', width: '90%' }}
					>
						{' '}
						Budget
					</Text>
					<View
						style={{
							marginTop: 15,
							marginBottom: 15,
							flexDirection: 'row',
							width: '90%',
							alignItems: 'space-between',
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
								props.budgetHandle([15, 20.99])
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
								props.budgetHandle([21, 2000])
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
					<Text style={{ color: '#000000', fontWeight: 'bold' }}>Livré à:</Text>
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
				<View
					style={{
						marginTop: 15,
						width: '100%',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<NextButton title="VITE J'AI FAIM" onPress={getTheSupriseMeal} />
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
	moodButton: {
		backgroundColor: '#FFC901',
		width: 138,
		height: 110,
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
	}
}

function mapStateToProps(state) {
	return {
		mood: state.mood,
		budget: state.budget,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Mood)
