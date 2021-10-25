import React, { useState } from 'react'
import { CheckBox } from 'react-native-elements'

const MyCheckbox = ({ title, checkStatus }) => {
	const [check, setCheck] = useState(checkStatus)
	return (
		<CheckBox
			title={title}
			checkedColor="#FFC901"
			checked={check}
			onPress={() => setCheck(!check)}
		/>
	)
}

export default MyCheckbox
