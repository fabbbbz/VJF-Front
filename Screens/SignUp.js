import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
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
    const [signUpPhone, setSignUpPhone] = useState('')
    const [ErrorsSignup, setErrorsSignup] = useState('')
    const [token, setToken] = useState('');
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    var handleSubmitSignup = async () => {
        // send user's infos to back 
        const data = await fetch(`http://172.17.1.105:3000/users/sign-up`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `lastNameFromFront=${signUpLastname}&firstNameFromFront=${signUpFirstname}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}&phoneFromFront=${signUpPhone}`
        })
        //get answer from back 
        const body = await data.json()
        if (body.result == true) {
            //set token 
            setToken(body.token)
            // store token in local-storage
            AsyncStorage.setItem('token', token);
            // store token in redux
            props.addToken(token)
            props.navigation.navigate('Mood', { screen: 'Mood' })
        } else {
            setErrorsSignup(body.error)
        }
    }

    return (
        <KeyboardAvoidingView enabled behavior={Platform.OS === 'ios' ? 'padding' : null}
            style={styles.FlexGrowOne}>
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
                        onChangeText={text => setSignUpPhone(text)}
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
                    <Text style={styles.errormesssage}>{ErrorsSignup}</Text>
                </View>

            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    errormesssage: {
        marginTop: 50,
        textAlign: 'center',
        color: '#FF9800',
        fontSize: 20,
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
