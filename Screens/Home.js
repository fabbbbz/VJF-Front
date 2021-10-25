import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import TopBar from '../Components/TopBar'
import Diet from '../Components/Diet'
import Donts from '../Components/Donts'
import Allergies from '../Components/Allergies'
import NextButton from '../Components/NextButton'

const Home = props => {
	return (
		<View style={styles.container}>
			<TopBar />
			<ScrollView>
				<Diet />
				<Donts />
				<Allergies />
				<NextButton title="NEXT" color="#F2A902" width="200" />
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

export default Home
