export default function (donts = [], action) {
	switch (action.type) {
		case 'ADD_DONT':
			const newDonts = [...donts, action.newDont]
			return newDonts
		case 'REMOVE_DONT':
			const filteredDonts = donts.filter(el => el !== action.dont)
			return filteredDonts
		default:
			return donts
	}
}
