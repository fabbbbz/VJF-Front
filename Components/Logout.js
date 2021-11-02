import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View } from 'react-native';
import { connect } from 'react-redux'

function Logout(props) {
    useEffect(() => {
        AsyncStorage.removeItem("token")
        props.deleteToken()
    }, []);


    return (
        <View>
            {props.navigation.navigate('SignIn', { screen: "SignIn" })}
        </View>
    );
}

function mapDispatchToProps(dispatch) {
    return {
        deleteToken: function (token) {
            dispatch({ type: 'deleteToken', token: token })
        },
    }
}

export default connect(null, mapDispatchToProps)(Logout)
