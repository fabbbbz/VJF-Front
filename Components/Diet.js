import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CheckBox } from 'react-native-elements'

const Diet = props => {
	const [check, setCheck] = useState(unchecked)
	return (
		<View style={styles.container}>
			<Text>Renseignez-nous</Text>
			<View style={{ marginLeft: 10 }}>
				<CheckBox
					title="Je mange de tout"
					checkedColor="yellow"
					checked={check}
				/>
				<CheckBox
					title="Je suis végétarien"
					checkedColor="yellow"
					checked={check}
				/>
				<CheckBox
					title="Je suis végétalien"
					checkedColor="yellow"
					checked={check}
				/>
				<CheckBox
					title="Je mange hallal"
					checkedColor="yellow"
					checked={check}
				/>
				<CheckBox
					title="Je mange casher"
					checkedColor="yellow"
					checked={check}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderRadius: 10,
	},
})

export default Diet
