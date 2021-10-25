import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, Image } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';



export default function FirstScreen(props) {


    return (
        <View style={styles.container}>

            <Image source={require('../assets/VJF-logo.png')}
            />

            <Button

                title="Home"
                type="solid"
                buttonStyle={{ backgroundColor: "#009788" }}
                onPress={() => { props.navigation.navigate('Home', { screen: 'Home' }) }}
            />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

