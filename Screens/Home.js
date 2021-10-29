import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Overlay, Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import Diet from '../Components/Diet'
import Donts from '../Components/Donts'
import Allergies from '../Components/Allergies'
import NextButton from '../Components/NextButton'
import { MY_IP } from '@env'
import { connect } from 'react-redux'
import MyCheckbox from '../Components/Checkbox'

const Home = props => {
	const [overlay, setOverlay] = useState(false)
	const token = props.token
	console.log('tokenInStore:', token)
	console.log('diet: ', props.diet)
	console.log('donts: ', props.donts)

	const handleAllergies = allergy => {
		setOverlay(false)
	}

	const handleSubmitFoodProfile = async () => {
		try {
			const token = props.token
			if (!token) {
				props.navigation.navigate('Mood', {
					screen: 'Mood',
				})
				return
			}
			const dataToUpdate = {
				diet: props.diet,
				dont: props.donts,
				allergies: props.allergies,
			}
			const requestOptions = {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(dataToUpdate),
			}
			const data = await fetch(
				`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/update-me/${token}`,
				requestOptions
			)
			const result = await data.json()
			props.navigation.navigate('Mood', {
				screen: 'Mood',
			})
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<View style={styles.container}>
			<TopBar navigation={props.navigation} />
			<ScrollView>
				<Diet />
				<Donts />
				<Allergies overlay={overlay} setOverlay={setOverlay} />
				<NextButton
					title="NEXT"
					color="#F2A902"
					width="200"
					onPress={handleSubmitFoodProfile}
				/>
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
						<MyCheckbox title="Gluten" isAllergy={true} />
						<MyCheckbox title="Sesame" isAllergy={true} />
						<MyCheckbox title="Fruits à coque" isAllergy={true} />
						<MyCheckbox title="Crustacés" isAllergy={true} />
						<MyCheckbox title="Oeuf" isAllergy={true} />
						<MyCheckbox title="Poisson" isAllergy={true} />
						<MyCheckbox title="Moutarde" isAllergy={true} />
						<MyCheckbox title="Lait" isAllergy={true} />
						<MyCheckbox title="Celeri" isAllergy={true} />
						<MyCheckbox title="Arachides" isAllergy={true} />
						<MyCheckbox title="Soja" isAllergy={true} />
						<MyCheckbox title="Mollusques" isAllergy={true} />
						<MyCheckbox title="Lupin" isAllergy={true} />
						<MyCheckbox title="Sulfites" isAllergy={true} />
					</ScrollView>
					<NextButton title="VALIDER" onPress={() => handleAllergies()} />
				</Overlay>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
})

function mapStateToProps(state) {
	console.log('Mytoken = ' + state.token)
	return {
		diet: state.diet,
		token: state.token,
		donts: state.donts,
		allergies: state.allergies,
	}
}

export default connect(mapStateToProps, null)(Home)
