export default function (address = '', action) {
	if (action.type == 'STORE_ADDRESS') {
		console.log("adress from reducer", action.address)
		return action.address
	} else {
		return address
	}
}
