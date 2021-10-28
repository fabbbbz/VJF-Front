import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Button, Text, Input, Card, ListItem, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Moods from '../Components/Moods';
import { Ionicons } from '@expo/vector-icons';
import { MY_IP } from "@env"


function Favorites(props) {
    const [favData, setFavData] = useState([])
    useEffect(() => {
        async function loadFavorites() {
            // token en dur pour le test, A remplacer par :token
            var rawResponse = await fetch(`http://${MY_IP}:3000/users/favorites/CnCEm57iQYtTb33A8kN4Evci8Sq_BOplZ`)
            var response = await rawResponse.json()
            // console.log(response.favorites);

            setFavData(response.favorites)

        }

        loadFavorites()

    }, []);

    var favList = favData.map((fav, i) => {

        return (<Card key={i} containerStyle={{
            borderRadius: 10, elevation: 4,
            shadowOffset: { width: 5, height: 5 },
            shadowColor: "#FFC901",
            shadowOpacity: 1,
            shadowRadius: 20,
        }} wrapperStyle={{
            display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "nowrap", alignItems: "center",
        }}>
            <Card.Title style={{ marginBottom: 0 }}> {fav.name}  {fav.price} € </Card.Title >
            <Button type="clear" onPress={() => { handleFavDeletion(fav._id) }} icon={<Ionicons size={25} name='trash-outline' color='#FFC901' />} />
        </Card>)
    })


    async function handleFavDeletion(meal_id) {

        var favFilter = favData.filter((e) => (e._id !== meal_id))
        setFavData(favFilter)
        var rawResponse = await fetch(`http://${MY_IP}:3000/users/favorites/CnCEm57iQYtTb33A8kN4Evci8Sq_BOplZ/${meal_id}`, {
            method: 'DELETE'
        });
        var response = await rawResponse.json()
        console.log(response)
    }


    return (
        <ScrollView >
            <TopBar navigation={props.navigation} />
            <Text h3 style={{ alignSelf: "center", marginTop: 15, textDecorationLine: 'underline', color: "#FFC901" }}>Favoris</Text>
            {favList}

        </ScrollView >
    );
}

export default Favorites
