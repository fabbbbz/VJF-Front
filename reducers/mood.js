export default function (mood = "", action) {
    if (action.type == "moodChoice") {
        return action.mood
    } else {
        return mood
    }
}
