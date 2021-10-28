import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'

const NextButtonFullSize = ({ title, onPress }) => {
	return (
		<LinearGradient
			colors={['#F2A902', '#FFC901']}
			start={{ x: 0.1, y: 0 }}
			end={{ x: 1, y: 0 }}
			style={styles.button}
		>
			<TouchableOpacity
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-between',
				}}
				onPress={onPress}
			>
				<Text style={styles.text}>{title}</Text>
				<AntDesign name="arrowright" size={24} color="white" />
			</TouchableOpacity>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#F2A902',
		borderRadius: 5,
		width: 400,
		// margin: 5,
		paddingHorizontal: 10,
		paddingVertical: 10,
		textAlign: 'center',
		alignSelf: 'flex-end',
		marginRight: 10,
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
	},
})

export default NextButtonFullSize
