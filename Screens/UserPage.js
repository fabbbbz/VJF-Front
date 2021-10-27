import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Input, Card, ListItem, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar';
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
            <Text h3 style={{ alignSelf: "center", marginTop: 15, textDecorationLine: 'underline' }}>Informations Personelles</Text>
            <Text style={{ marginTop: 15, marginLeft: 15, }}>Nom: {user.lastName} </Text>
            <Text style={{ marginTop: 15, marginLeft: 15, }}>Prénom: {user.firstName} </Text>
            <Text style={{ marginTop: 15, marginLeft: 15, }}>Email: {user.email} </Text>
            <Text style={{ marginTop: 15, marginLeft: 15, }}>Téléphone: {user.phone} </Text>
            <Text style={{ marginTop: 15, marginLeft: 15, }}>Adresse: {user.adresse} </Text>
        </ScrollView >
    );
}

export default UserPage