export default function (address = '', action) {
	if (action.type == 'STORE_ADDRESS') {
<<<<<<< HEAD
=======
		console.log("adress from reducer", action.address)
>>>>>>> adresse
		return action.address
	} else {
		return address
	}
}
