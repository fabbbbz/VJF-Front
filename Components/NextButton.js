import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Button } from 'react-native-elements'

const NextButton = ({ title, onPress }) => {
	return (
		<Button
			title={title}
			onPress={onPress}
			buttonStyle={{
				backgroundColor: '#F2A902',
				borderRadius: 3,
			}}
			containerStyle={{
				width: 200,
				marginHorizontal: 50,
				marginVertical: 10,
			}}
		/>
	)
}

const styles = StyleSheet.create({
	nextButton: {
		backgroundColor: '#F2A902',
		borderRadius: 5,
		paddingVertical: 10,
		paddingHorizontal: 12,
		color: '#fff',
	},
})

export default NextButton
