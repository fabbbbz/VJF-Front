export default function (diet = 'omni', action) {
	if (action.type == "ADD_DIET") {
		return action.diet
	} else {
		return diet
	}
}
