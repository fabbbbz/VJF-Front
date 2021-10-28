import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { color } from 'react-native-reanimated';
import TopBar from '../Components/TopBar';
import Plats from '../Components/Plats'

function History(props) {

    return (
        <View style={{ flex: 1 }} >
            <TopBar navigation={props.navigation} />
            <View style={styles.container}>
                <Text h2 style={{ color: '#F2A902' }}>Derniers Plats</Text>
                <Plats />
                <Plats />
                <Plats />
                <Plats />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        alignItems: 'center'
    }
})

export default History
