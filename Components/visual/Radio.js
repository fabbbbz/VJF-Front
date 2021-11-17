import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'

const RadioButton = props => {
	const [selected, setSelected] = useState(false)

	const handleClick = () => {
		setSelected(true)
	}

	return (
		<View
			style={{
				display: 'flex',
				flexDirection: 'row',
			}}
		>
			<TouchableOpacity
				style={[
					{
						height: 24,
						width: 24,
						borderRadius: 12,
						borderWidth: 2,
						borderColor: '#000',
						alignItems: 'center',
						justifyContent: 'center',
						marginRight: 20,
					},
					props.style,
				]}
				onPress={handleClick}
			>
				{selected ? (
					<View
						style={{
							height: 12,
							width: 12,
							borderRadius: 6,
							backgroundColor: '#000',
						}}
					/>
				) : null}
			</TouchableOpacity>
			<Text>{props.title}</Text>
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

export default connect(null, mapDispatchToProps)(RadioButton)
