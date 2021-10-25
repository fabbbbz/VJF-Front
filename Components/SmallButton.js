import React from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-elements'

const SmallButton = ({ title }) => {
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
		/>
	)
}

export default SmallButton
