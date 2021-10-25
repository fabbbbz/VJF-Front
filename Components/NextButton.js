import React from 'react'
import { Button, StyleSheet, TouchableOpacity, Text } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const NextButton = ({ onPress, title }) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<LinearGradient
				colors={['#FFC901', '#F2A902']}
				style={styles.nextButtonContainer}
			>
				<Text style={styles.nextButtonText}>{title}</Text>
			</LinearGradient>
		</TouchableOpacity>
	)
}

const styles = StyleSheet.create({
	nextButtonContainer: {
		elevation: 8,
		backgroundColor: '#F2A902',
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 12,
	},
	nextButtonText: {
		fontSize: 18,
		color: '#fff',
		fontWeight: 'bold',
		alignSelf: 'center',
		textTransform: 'uppercase',
	},
})

export default NextButton
