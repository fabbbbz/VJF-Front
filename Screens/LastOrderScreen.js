import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, KeyboardAvoidingView } from 'react-native'
import { Text, Input } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { MY_IP } from '@env'
import { connect } from 'react-redux'
import LastOrder from '../Components/LastOrder'

const LastOrderScreen = props => {
	return (
		<View style={styles.container}>
			<TopBar />
			<Text h3 style={styles.text}>
				Votre dernière commande
			</Text>
			<LastOrder />
			<Text h4 style={styles.text}>
				Qu'en avez vous pensé ?
			</Text>
			<View
				style={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-evenly',
					marginTop: 20,
				}}
			>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/thumbdown.png')}
				/>
				<Image
					style={styles.tinyLogo}
					source={require('../assets/thumbup.png')}
				/>
			</View>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			>
				<Input
					placeholder="Ajoutez un commentaire"
					style={{ marginTop: 40, marginHorizontal: 10 }}
				/>
			</KeyboardAvoidingView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	text: {
		textAlign: 'center',
		marginTop: 40,
	},
	tinyLogo: {
		width: 80,
		height: 80,
	},
})

export default LastOrderScreen
