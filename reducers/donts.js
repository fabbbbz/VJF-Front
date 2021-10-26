export default function (donts = [], action) {
	switch (action.type) {
		case 'ADD_DONT':
			console.log('here i add a dont')
			const newDonts = [...donts, action.newDont]
			return newDonts
		case 'REMOVE_DONT':
			const filteredDonts = donts.filter(el => el !== action.dont)
			return filteredDonts
		default:
			return donts
	}
}
