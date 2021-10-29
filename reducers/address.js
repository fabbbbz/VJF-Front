export default function (address = '', action) {
	if (action.type == 'STORE_ADDRESS') {
		console.log('adding address to store')
		return action.address
	} else {
		return address
	}
}
