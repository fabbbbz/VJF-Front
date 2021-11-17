import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { RadioButton } from 'react-native-paper'
import { connect } from 'react-redux'

const DietRadios = props => {
	const [checked, setChecked] = useState('omni')

	const handleClick = option => {
		setChecked(option)
		props.addDiet(option)
	}

	return (
		<View>
			<View
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			>
				<RadioButton
					value="omni"
					status={checked === 'omni' ? 'checked' : 'unchecked'}
					onPress={() => handleClick('omni')}
					uncheckedColor="#000000"
					color="#F2A902"
				/>
				<Text>Je mange de tout</Text>
			</View>
			<View
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			>
				<RadioButton
					value="vegetarian"
					status={checked === 'vegetarian' ? 'checked' : 'unchecked'}
					onPress={() => handleClick('vegetarian')}
					uncheckedColor="#000000"
					color="#F2A902"
				/>
				<Text>Je suis végétarien</Text>
			</View>
			<View
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			>
				<RadioButton
					value="vegan"
					status={checked === 'vegan' ? 'checked' : 'unchecked'}
					onPress={() => handleClick('vegan')}
					uncheckedColor="#000000"
					color="#F2A902"
				/>
				<Text>Je suis vegan</Text>
			</View>
			<View
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			>
				<RadioButton
					value="halal"
					status={checked === 'halal' ? 'checked' : 'unchecked'}
					onPress={() => handleClick('halal')}
					uncheckedColor="#000000"
					color="#F2A902"
				/>
				<Text>Je mange halal</Text>
			</View>

			<View
				style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
			>
				<RadioButton
					value="cacher"
					status={checked === 'cacher' ? 'checked' : 'unchecked'}
					onPress={() => handleClick('cacher')}
					uncheckedColor="#000000"
					color="#F2A902"
				/>
				<Text>Je mange cacher</Text>
			</View>
		</View>
	)
}

function mapDispatchToProps(dispatch) {
	return {
		addDiet: function (diet) {
			dispatch({ type: 'ADD_DIET', diet: diet })
		},
	}
}

export default connect(null, mapDispatchToProps)(DietRadios)
