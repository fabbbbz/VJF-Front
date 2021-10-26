import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AntDesign } from '@expo/vector-icons'

const TopBar = props => {
	const navigation = useNavigation()
	const [navActive, setNavActive] = useState(false)
	console.log('top bar props: ', props.navigation)
	const showDrawer = () => {
		//props.navigation.navigate('Drawer')
		setNavActive(true)
		if (navActive) navigation.toggleDrawer()
	}

	useEffect(() => {
		props.navigation.navigate('Drawer')
	}, [])

	return (
		<View style={styles.topbar}>
			{props.showArrow ? (
				<AntDesign
					name="arrowleft"
					size={24}
					color="#FFC901"
					onPress={() => props.navigation.goBack()}
				/>
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
