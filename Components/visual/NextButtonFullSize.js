import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'


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
					justifyContent: 'center',
				}}
				onPress={onPress}
			>
				<Text style={title == "VITE J'AI FAIM" ? styles.big : styles.text}>
					{title}
				</Text>

			</TouchableOpacity>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#F2A902',
		borderRadius: 5,
		width: 400,
		paddingHorizontal: 10,
		paddingVertical: 10,
		textAlign: 'center',
		alignSelf: 'flex-end',
		marginRight: 5,
	},
	text: {
		color: '#fff',
		fontSize: 16,
		fontWeight: '700',
		flex: 1,
		textAlign: 'center',
	},
	big: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold',
		flex: 1,
		textAlign: 'center',
	},
})

export default NextButtonFullSize
