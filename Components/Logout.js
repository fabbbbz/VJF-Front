import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native';

function Logout(props) {



    useEffect(() => {

        AsyncStorage.getItem("token", function (error, data) {
            console.log("before delete ", data);
        })


        AsyncStorage.removeItem("token")
    }, []);

    AsyncStorage.getItem("token", function (error, data) {
        console.log("After delete ", data);
    })
    return (
        <View>
            {props.navigation.navigate('SignIn')}
        </View>
    );
}

export default Logout