import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const TopBar = props => {
	return (
		<View style={styles.topbar}>
			<Text>Back</Text>
			<Text>logo</Text>
			<Text>Profil</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	topbar: {
		backgroundColor: '#27292D',
		paddingVertical: 10,
		paddingHorizontal: 12,
		display: 'flex',
		justifyContent: 'space-between',
		color: '#FFFFFF',
	},
})

export default TopBar
