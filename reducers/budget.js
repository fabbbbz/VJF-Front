export default function (budget = [], action) {
	if (action.type == 'budgetChoice') {
		return action.budget
	} else {
		return budget
	}
}
