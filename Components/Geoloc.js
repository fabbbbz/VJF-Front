import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

const Geoloc = props => {

    useEffect(() => {
        async function askPermissions() {
            var { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                var location = await Location.getCurrentPositionAsync({});
            }
        }
        askPermissions();
    }, []);

    return (

        <View>
            <MapView style={{ flex: 1 }}
                initialRegion={{
                    latitude: 48.866667,
                    longitude: 2.333333,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>


    )
}

export default Geoloc
