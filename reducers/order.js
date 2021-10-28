export default function (order = '', action) {
	if (action.type == 'STORE_ORDER') {
		return action.orderId
	} else {
		return order
	}
}
