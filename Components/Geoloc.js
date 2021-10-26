import React, { useState, useEffect } from 'react'
import { Text } from 'react-native'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default function Geoloc() {

    const [displayCurrentAddress, setDisplayCurrentAddress] = useState('')

    useEffect(() => {
        async function askPermissions() {
            var { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status === 'granted') {
                let { coords } = await Location.getCurrentPositionAsync();
                if (coords) {
                    const { latitude, longitude } = coords;
                    let response = await Location.reverseGeocodeAsync({
                        latitude,
                        longitude
                    });
                    for (let item of response) {
                        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
                        setDisplayCurrentAddress(address);
                    }
                } console.log('coords', coords)
            }
        }
        askPermissions();
    }, []);



    return (
        <Text >{displayCurrentAddress}</Text>
    )
}