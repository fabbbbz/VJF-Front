import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Input, Card, ListItem, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Moods from '../Components/Moods';

import { MY_IP } from "@env"


function Favorites(props) {
    const [favData, setFavData] = useState([])

    var favList = []
    useEffect(() => {
        async function loadFavorites() {
            // token en dur pour le test, A remplacer par :token
            var rawResponse = await fetch(`http://${MY_IP}:3000/users/favorites/CnCEm57iQYtTb33A8kN4Evci8Sq_BOplZ`)
            var response = await rawResponse.json()



            // setFavData([...{ meal: response.favorites.name, price: response.favorites.price }])




            for (var i = 0; i < response.favorites.length; i++) {

                favList.push(<Card>
                    <Card.Title>{response.favorites[i].name} {response.favorites[i].price} €</Card.Title>
                </Card>)
                console.log(response.favorites[i].name)

            }
        }

        loadFavorites()

    }, []);

    // var favList = favData.map((favData, i) => {



    //     return (<favList key={i} mealName={favData.meal} price={favData.price} />)
    // })
    return (
        <ScrollView >
            <TopBar navigation={props.navigation} />
            {favList}

        </ScrollView >
    );
}

export default Favorites
