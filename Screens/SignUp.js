import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import NextButton from '../Components/NextButton';

import { connect } from 'react-redux';



export default function SignUp(props) {


    return (
        <View style={styles.container}>
            <TopBar />
            <View>
                <Input
                    containerStyle={{ marginBottom: 25, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Nom'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 25, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Prénom'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 25, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Téléphone'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 25, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Email'
                // onChangeText={(val) => set(val)}
                />
                <Input
                    containerStyle={{ marginBottom: 25, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Password'
                // onChangeText={(val) => set(val)}
                />

                <NextButton title="NEXT" />
            </View>


            {/* <Image
                source={require('../assets/VJF-logo.png')}
                style={{ width: 200, height: 200, marginTop: 100 }}
            />

            <Text h1 style={{ textAlign: 'center', color: '#000000', marginTop: 50 }}>
                Vite j'ai faim!
            </Text>

            <Text h4 style={{ textAlign: 'center', color: '#F2A902', marginTop: 50, marginBottom: 50 }}>
                Vous nous renseignez, on choisit pour vous!
            </Text>

            <NextButton title="HOME"
                onPress={() => { props.navigation.navigate('Home', { screen: 'Home' }) }} /> */}


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
});
