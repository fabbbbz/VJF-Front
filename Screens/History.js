import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { color } from 'react-native-reanimated';
import TopBar from '../Components/TopBar';
import Plats from '../Components/Plats';


function History(props) {


    return (

        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <ScrollView>
                <View>
                    <Text h2 style={{ color: '#F2A902', alignSelf: 'center', marginBottom: 15 }}>Derniers Plats</Text>
                    <Plats />
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
})



export default History
