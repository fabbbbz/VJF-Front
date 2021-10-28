import React, { useState, useEffect } from 'react';
import TopBar from '../Components/TopBar';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Input, Card, ListItem } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons';
import { MY_IP } from "@env"


function UserPage(props) {

    const [user, setUser] = useState("")

    useEffect(() => {
        async function loadUser() {
            // token en dur pour le test, A remplacer par :token
            var rawResponse = await fetch(`http://${MY_IP}:3000/users/me/BHbxITgVrZnaS5OQHxYVgaIaROQHliZr`)
            var response = await rawResponse.json()
            console.log(response.userInfo.lastName)
            setUser(response.userInfo)

        }
        loadUser()
    }, []);

    // console.log(user.lastName)

    return (
        <ScrollView >
            <TopBar navigation={props.navigation} />
            <Text h3 style={{ alignSelf: "center", marginTop: 15, textDecorationLine: 'underline', color: "#FFC901" }}>Informations Personelles</Text>

            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Nom:</Card.Title >
                <Text>{user.lastName} </Text>
                <Button type="clear" onPress={() => console.log("bonjour")} icon={<Ionicons size={25} name="create-outline" color='#FFC901' />} />
            </Card>

            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Prénom:</Card.Title >
                <Text>{user.firstName} </Text>
                <Button type="clear" onPress={() => console.log("bonjour")} icon={<Ionicons size={25} name="create-outline" color='#FFC901' />} />
            </Card>
            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Email:</Card.Title >
                <Text>{user.email} </Text>
                <Button type="clear" onPress={() => console.log("bonjour")} icon={<Ionicons size={25} name="create-outline" color='#FFC901' />} />
            </Card>
            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Téléphone:</Card.Title >
                <Text>{user.phone} </Text>
                <Button type="clear" onPress={() => console.log("bonjour")} icon={<Ionicons size={25} name="create-outline" color='#FFC901' />} />
            </Card>
            <Card containerStyle={styles.container} wrapperStyle={styles.wrapper}>
                <Card.Title style={{ marginBottom: 0 }}> Adresse:</Card.Title >
                <Text>{user.adresse} </Text>
                <Button type="clear" onPress={() => console.log("bonjour")} icon={<Ionicons size={25} name="create-outline" color='#FFC901' />} />
            </Card>
        </ScrollView >
    );
}
const styles = StyleSheet.create({
    container: {
        borderRadius: 10, elevation: 4,
        shadowOffset: { width: 5, height: 5 },
        shadowColor: "#FFC901",
        shadowOpacity: 1,
        shadowRadius: 20,
    },
    wrapper: {
        display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "nowrap", alignItems: "center",
    }
})
export default UserPage