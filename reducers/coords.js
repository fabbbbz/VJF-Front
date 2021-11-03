export default function (coords = {}, action) {
	if (action.type == 'STORE_COORD') {
		return { lat: action.payload.lat, lng: action.payload.lng }
	} else {
		return coords
	}
}
