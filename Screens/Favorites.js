import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Input, Card, ListItem, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Moods from '../Components/Moods';

import { MY_IP } from "@env"


function Favorites() {
    const [favData, setFavData] = useState([])
    useEffect(() => {
        async function loadFavorites() {
            // token en dur pour le test
            var rawResponse = await fetch(`http://${MY_IP}:3000/users/favorites/nCEm57iQYtTb33A8kN4Evci8Sq_BOplZ`)
            var response = await rawResponse.json()
            console.log(response.favorites[0].name)
            setFavData(response.favorites[0].name)

        }

        loadFavorites()

    },

    );
    // var favList = favData.map((fav, i) => {



    //     return (<favList key={i} mealName={fav.meal} price={fav.price} restaurantName={fav.restaurantName} />)
    // })
    return (
        <View >
            <TopBar />

            <Card>
                <Card.Title>{favData}</Card.Title>
                <Card.Divider />

                <Text style={{ marginBottom: 10 }}>     </Text>

            </Card>

        </View >
    );
}

export default Favorites
