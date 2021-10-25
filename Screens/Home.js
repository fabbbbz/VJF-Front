import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import TopBar from '../Components/TopBar'

const Home = props => {
	return (
		<View>
			<TopBar />
			<View style={styles.container}>
				<Diet />
				<Donts />
				<Allergies />
				<NextButton title="NEXT" />
			</View>
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
