import React, { useState } from 'react'
import { CheckBox } from 'react-native-elements'
import { connect } from 'react-redux'

const MyCheckbox = ({
	title,
	checkStatus,
	isAllergy,
	addAllergy,
	removeAllergy,
}) => {
	const [check, setCheck] = useState(checkStatus)
	const [oneCheck, setOneCheck] = useState(false)

	const handleCheck = () => {
		setCheck(!check)
		setOneCheck(true)
		if (isAllergy) {
			if (!check) {
				addAllergy(title)
			} else {
				removeAllergy(title)
			}
		}
	}

	return (
		<CheckBox
			title={title}
			checkedColor="#FFC901"
			checked={check}
			onPress={() => handleCheck()}
		/>
	)
}

function mapDispatchToProps(dispatch) {
	return {
		addAllergy: function (allergy) {
			dispatch({ type: 'ADD_ALLERGY', allergy })
		},
		removeAllergy: function (allergy) {
			dispatch({ type: 'REMOVE_ALLERGY', allergy })
		},
	}
}

export default connect(null, mapDispatchToProps)(MyCheckbox)
