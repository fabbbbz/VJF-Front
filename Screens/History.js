import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Plats from '../Components/Plats';


function History(props) {


    return (

        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <View style={styles.container}>
                <Text h2 style={{ color: '#F2A902' }}>Derniers Plats</Text>
                {/* <Plats />
                <Plats />
                <Plats />
                <Plats /> */}
            </View>
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
