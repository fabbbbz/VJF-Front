import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Button, Text } from 'react-native-elements'

import { AntDesign } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons';


const Plats = ({ name, onPress }) => {


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
