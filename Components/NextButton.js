import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons'

const NextButton = ({ title, onPress }) => {
	return (
<<<<<<< HEAD
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
			>
				<Text style={styles.text}>{title}</Text>
				<AntDesign name="arrowright" size={24} color="white" />
			</TouchableOpacity>
		</LinearGradient>
=======
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
>>>>>>> 864bfc96f18b992a7de6969ef8b1754427391825
	)
}

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#F2A902',
		borderRadius: 5,
		width: 200,
		margin: 5,
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
		marginLeft: 65,
	},
})

export default NextButton
