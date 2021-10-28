export default function (firstName = '', action) {
    if (action.type == 'addFirstName') {
        return action.firstName

    }
    else {
        return firstName
    }
}