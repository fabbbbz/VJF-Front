import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

function FirstScreen(props) {
    // If token in local storage redirect to mood 
    // useEffect(() => {
    //     AsyncStorage.getItem('token', (error, value) => {
    //         if (value) {
    //             props.navigation.navigate('Mood', { screen: 'Mood' })
    //         }
    //     });
    // }, []);

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
            <ScrollView>
                <NextButton title="HOME"
                    onPress={() => { props.navigation.navigate('Home', { screen: 'Home' }) }} />
                <NextButton title="SIGNUP"
                    onPress={() => { props.navigation.navigate('SignUp', { screen: 'SignUp' }) }} />
                <NextButton title="MOOD"
                    onPress={() => { props.navigation.navigate('Mood', { screen: 'Mood' }) }} />
                <NextButton title="SignIn"
                    onPress={() => { props.navigation.navigate('SignIn', { screen: 'SignIn' }) }} />
            </ScrollView>
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

//get token from store 
function mapStateToProps(state) {
    return { token: state.token }
}

export default connect(
    mapStateToProps,
    null
)(FirstScreen)