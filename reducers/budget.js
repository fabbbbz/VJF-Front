export default function (budget = [], action) {
	if (action.type == 'budgetChoice') {
		console.log(action.budget)
		return action.budget
	} else {
		return budget
	}
}
