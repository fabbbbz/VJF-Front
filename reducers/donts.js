export default function (donts = [], action) {
	switch (action.type) {
		case 'ADD_DONT':
			console.log('here i add a dont')
			const newDonts = [...donts, action.newDont]
			return newDonts
		case 'REMOVE_DONT':
			return donts
		default:
			return donts
	}
}
