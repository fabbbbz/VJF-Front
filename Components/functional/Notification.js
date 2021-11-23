import * as Notifications from "expo-notifications"

const triggerLocalNotificationHandler = () => {
    // Show notifications when the app is in the foreground
    Notifications.setNotificationHandler({
        handleNotification: async () => {
            return {
                shouldShowAlert: true,
            }
        },
    })
    //Send notification
    Notifications.scheduleNotificationAsync({
        content: {
            title: "Vite j'ai faim !",
            body: "N'oubliez de donner votre avis sur la commande ;)",
        },
        trigger: { seconds: 5 },
    })
}

export default triggerLocalNotificationHandler