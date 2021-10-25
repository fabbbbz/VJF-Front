import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Text, Input } from 'react-native-elements'
import SmallButton from './SmallButton'

const Donts = props => {
	const [donts, setDonts] = useState([])
	const [showInput, setShowInput] = useState(false)

	const displayField = () => {
		setShowInput(true)
	}

	return (
		<View style={styles.container}>
			<Text h4 style={styles.sectionTitle}>
				Ce que je n'aime pas du tout :
			</Text>
			<View style={styles.ingredients}>
				<SmallButton title="oignons" />
				<SmallButton title="coriandre" />
				<SmallButton title="champignons" />
				<SmallButton title="chou fleur" />
				<SmallButton title="fruits de mer" />
				<TouchableOpacity onPress={() => displayField()}>
					<Image
						style={styles.tinyLogo}
						source={require('../assets/plusIcon.png')}
					/>
				</TouchableOpacity>
			</View>
			{showInput && (
				<Input
					onChangeText={value => setDonts(value)}
					value={donts[0]}
					placeholder="Entrez un ingrédient"
					style={{ marginTop: 10, marginHorizontal: 10 }}
				/>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 15,
		borderRadius: 10,
		margin: 15,
		borderColor: '#F2A902',
	},
	sectionTitle: {
		marginBottom: 10,
		marginTop: 10,
		textAlign: 'center',
	},
	button: {
		backgroundColor: '#F2A902',
		borderRadius: 5,
		color: '#fff',
	},
	ingredients: {
		marginLeft: 10,
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tinyLogo: {
		width: 50,
		height: 50,
	},
})

export default Donts
