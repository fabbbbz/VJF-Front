export default function (token = '', action) {
    if (action.type == 'addToken') {
        return action.token
    } else if (action.type == 'deleteToken') {
        var token = ''
        return token
    }
    else {
        return token
    }
}