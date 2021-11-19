export default function (allergies = [], action) {
	switch (action.type) {
		case 'ADD_ALLERGY':
			const newAllergies = [...allergies, action.allergy]
			console.log('testreducernewallergies ' + newAllergies)
			return newAllergies
		case 'REMOVE_ALLERGY':
			const filteredAllergies = allergies.filter(el => el !== action.allergy)
			return filteredAllergies
		default:
			return allergies
	}
}