export default function (address = '', action) {
	if (action.type == 'STORE_ADDRESS') {
		return action.address
	} else {
		return address
	}
}
