import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

const TopBar = props => {
	const showDrawer = () => {
		console.log('menu will show')
	}

	return (
		<View style={styles.topbar}>
			{props.showArrow ? (
				<AntDesign name="arrowleft" size={24} color="#FFC901" />
			) : (
				<AntDesign name="arrowleft" size={24} color="#27292D" />
			)}
			<Image
				style={styles.tinyLogo}
				source={require('../assets/VJF-logo.png')}
			/>
			<AntDesign name="user" size={24} color="#FFC901" onPress={showDrawer} />
		</View>
	)
}

const styles = StyleSheet.create({
	topbar: {
		backgroundColor: '#27292D',
		paddingTop: 60,
		paddingBottom: 20,
		paddingHorizontal: 10,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		color: '#FFFFFF',
	},
	text: {
		color: '#fff',
	},
	tinyLogo: {
		width: 40,
		height: 40,
	},
})

export default TopBar
