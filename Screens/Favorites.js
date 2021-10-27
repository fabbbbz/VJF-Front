import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Input, Card, ListItem, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Moods from '../Components/Moods';

import { MY_IP } from "@env"


function Favorites(props) {
    const [favData, setFavData] = useState([])

    useEffect(() => {
        async function loadFavorites() {
            // token en dur pour le test, A remplacer par :token
            var rawResponse = await fetch(`http://${MY_IP}:3000/users/favorites/CnCEm57iQYtTb33A8kN4Evci8Sq_BOplZ`)
            var response = await rawResponse.json()



            setFavData(response.favorites)

        }

        loadFavorites()

    }, []);

    var favList = favData.map((fav, i) => {

        return (<Card key={i}><Card.Title> {fav.name}  {fav.price} €</Card.Title></Card>)
    })
    return (
        <ScrollView >
            <TopBar navigation={props.navigation} />
            {favList}

        </ScrollView >
    );
}

export default Favorites
