import React from 'react';

import { StyleSheet, View } from 'react-native';

import { Button, Image, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import NextButton from '../Components/NextButton'



export default function FirstScreen(props) {


    return (
        <View style={styles.container}>

            <Image
                source={{ uri: '../assets/VJF-logo.png' }}
                style={{ width: 200, height: 200, marginTop: 100 }}
            />

            <Text h1 style={{ textAlign: 'center' }}>
                Vite j'ai faim!
            </Text>

            <Text h4 style={{ textAlign: 'center' }}>
                Vous nous renseignez, on choisit pour vous!
            </Text>

            <Text h5 style={{ textAlign: 'center' }}>
                Définissez vos exigeances
            </Text>

            <NextButton title="HOME"
                onPress={() => { props.navigation.navigate('Home', { screen: 'Home' }) }} />

            {/* <Button
                title="Home"
                type="solid"
                buttonStyle={{ backgroundColor: "#F2A902" }}
                onPress={() => { props.navigation.navigate('Home', { screen: 'Home' }) }}
            /> */}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // justifyContent: 'center',
    },
});

