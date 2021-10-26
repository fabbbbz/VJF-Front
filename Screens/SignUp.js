import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import NextButton from '../Components/NextButton';
import { connect } from 'react-redux';
import { MY_IP } from "@env"
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SignUp(props) {
    const [signUpFirstname, setignUpFirstname] = useState('')
    const [signUpLastname, setsignUpLastname] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpTel, setSignUpTel] = useState('')
    //const [userExists, setUserExists] = useState(false)
    const [ErrorsSignup, setErrorsSignup] = useState('')
    const [pseudo, setPseudo] = useState('');

    var handleSubmitSignup = async () => {
        console.log(signUpLastname)
        const data = await fetch(`http://${MY_IP}:3000/users/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `lastnameFromFront=${signUpLastname}&firstnameFromFront=${signUpFirstname}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&telFromFront=${signUpTel}`
        })
        const body = await data.json()
        if (body.result == true) {
            AsyncStorage.setItem('pseudo', pseudo);
            props.addToken(body.token)
            props.navigation.navigate('Mood', { screen: 'Mood' })
            //setUserExists(true)
        } else {
            setErrorsSignup(body.error)
            console.log(ErrorsSignup)
        }
    }

    return (
        <View >
            <TopBar />
            <View style={{ alignItems: 'center' }}>
                <Text h3 style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}>Dites-nous en plus sur vous</Text>
                <Input
                    containerStyle={{ marginTop: 25, marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Nom'
                    onChangeText={text => setsignUpLastname(text)}
                />
                <Input
                    containerStyle={{ marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Prénom'
                    onChangeText={text => setignUpFirstname(text)}
                />
                <Input
                    containerStyle={{ marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Téléphone'
                    onChangeText={text => setSignUpTel(text)}
                />
                <Input
                    containerStyle={{ marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    placeholder='Email'
                    onChangeText={text => setSignUpEmail(text)}
                />
                <Input
                    containerStyle={{ marginBottom: 15, width: '70%' }}
                    inputStyle={{ marginLeft: 10 }}
                    secureTextEntry
                    placeholder='Password'
                    onChangeText={text => setSignUpPassword(text)}
                />


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ color: '#C4C4C4', alignSelf: 'center', marginLeft: 15, fontSize: 20 }}>
                    Skip
                </Text>

                <NextButton title="NEXT"
                    onPress={() => handleSubmitSignup()}
                />
            </View>
            <View>
                <Text>{ErrorsSignup}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
});

function mapDispatchToProps(dispatch) {
    return {
        addToken: function (token) {
            dispatch({ type: 'addToken', token: token })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SignUp)
