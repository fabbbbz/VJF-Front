import React from 'react';

import { StyleSheet, View, Image } from 'react-native';

import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import NextButton from '../Components/NextButton'


export default function FirstScreen(props) {


    return (
        <View style={styles.container}>


            <Image
                source={require('../assets/VJF-logo.png')}
                style={{ width: 200, height: 200, marginTop: 100 }}
            />

            <Text h1 style={{ textAlign: 'center', color: '#000000', marginTop: 50 }}>
                Vite j'ai faim!
            </Text>

            <Text h4 style={{ textAlign: 'center', color: '#F2A902', marginTop: 50 }}>
                Vous nous renseignez, on choisit pour vous!
            </Text>

            <NextButton title="HOME"
                onPress={() => { props.navigation.navigate('Home', { screen: 'Home' }) }} />
            <NextButton title="SIGNUP"
                onPress={() => { props.navigation.navigate('SignUp', { screen: 'SignUp' }) }} />


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },
});

