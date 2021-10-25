import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Overlay } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import Diet from '../Components/Diet'
import Donts from '../Components/Donts'
import Allergies from '../Components/Allergies'
import NextButton from '../Components/NextButton'

import { connect } from 'react-redux'
import MyCheckbox from '../Components/Checkbox'

const Home = props => {
	const [overlay, setOverlay] = useState(false)

	const handleAllergies = () => {
		// TODO push selected allergies to store
		setOverlay(false)
	}

	return (
		<View style={styles.container}>
			<TopBar />
			<ScrollView>
				<Diet />
				<Donts />
				<Allergies overlay={overlay} setOverlay={setOverlay} />
				<NextButton title="NEXT" color="#F2A902" width="200" />
				<Overlay
					isVisible={overlay}
					onBackdropPress={() => setOverlay(false)}
					overlayStyle={{
						width: '90%',
						marginTop: 60,
						marginBottom: 50,
						paddingVertical: 20,
					}}
				>
					<ScrollView>
						<MyCheckbox title="Gluten" />
						<MyCheckbox title="Sesame" />
						<MyCheckbox title="Fruits à coque" />
						<MyCheckbox title="Crustacés" />
						<MyCheckbox title="Oeuf" />
						<MyCheckbox title="Poisson" />
						<MyCheckbox title="Moutarde" />
						<MyCheckbox title="Lait" />
						<MyCheckbox title="Celeri" />
						<MyCheckbox title="Arachides" />
						<MyCheckbox title="Soja" />
						<MyCheckbox title="Mollusques" />
						<MyCheckbox title="Lupin" />
						<MyCheckbox title="Sulfites" />
					</ScrollView>
					<NextButton title="VALIDER" onPress={() => handleAllergies()} />
				</Overlay>
			</ScrollView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
})

function mapDispatchToProps(dispatch) {
	return {
		onClick: function (diet) {
			dispatch({ type: '', diet })
		},
	}
}

export default connect(null, mapDispatchToProps)(Home)
