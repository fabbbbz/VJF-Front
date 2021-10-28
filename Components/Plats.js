import React, { useEffect } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'react-native-elements'

import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Plats = ({ name, onPress }) => {

    // useEffect(() => {
    //     async function loadOrders() {
    //         // token en dur pour le test, A remplacer par :token
    //         var rawResponse = await fetch(`http://${MY_IP}:3000/users/orders/BHbxITgVrZnaS5OQHxYVgaIaROQHliZr`)
    //         var response = await rawResponse.json()

    //         console.log(response)

    //     }

    //     loadOrders()

    // }, []);


    return (
        <View syle={styles.container}>
            <View style={{ flexDirection: 'row', color: "#FFFFF" }}>
                <Text >Nom du plat</Text>
                <MaterialCommunityIcons name="heart-plus" size={24} color="black" onPress={() => addToFavorite()} />
                <MaterialCommunityIcons name="heart-remove" size={24} color="black" onPress={() => removeFromFavorite()} />
            </View >
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        margin: 15,
        borderColor: '#F2A902',
    },
})

export default Plats
