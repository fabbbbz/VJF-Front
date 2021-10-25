import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'
import { connect } from 'react-redux'

const SmallButton = ({ title, addDont, donts }) => {
	const handleDont = ingredient => {
		addDont(ingredient)
	}

	return (
		<Button
			title={title}
			buttonStyle={{
				backgroundColor: '#F2A902',
				borderRadius: 25,
				size: 10,
				margin: 5,
				paddingHorizontal: 10,
			}}
			onPress={() => handleDont(ingredient)}
		/>
	)
}

function mapDispatchToProps(dispatch) {
	return {
		addDont: function (dont) {
			dispatch({ type: 'ADD_DONT', newDont: dont })
		},
	}
}

function mapStateToProps(state) {
	return { donts: state.donts }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmallButton)

//export default SmallButton
