export default function (mood = "", action) {
    if (action.type == "moodChoice") {
        console.log(action.mood)
        return action.mood
    } else {
        return mood
    }
}
