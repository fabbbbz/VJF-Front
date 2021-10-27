export default function (diet = 'omni', action) {
	if (action.type == "ADD_DIET") {
		console.log(action.diet)
		return action.diet
	} else {
		return diet
	}
}
