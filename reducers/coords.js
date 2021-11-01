export default function (coords = {}, action) {
	if (action.type == 'STORE_COORD') {
		// console.log('adding coord to store')
		return { lat: action.payload.lat, lng: action.payload.lng }
	} else {
		return coords
	}
}
