export default function (budget = 0, action) {
	if (action.type == "budgetChoice") {
		console.log(action.budget)
		return action.budget
	} else {
		return budget
	}
}
