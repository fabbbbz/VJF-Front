import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Input, Overlay } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Moods from '../Components/Moods';
import NextButton from '../Components/NextButton';
import { connect } from 'react-redux';
import Geoloc from '../Components/Geoloc';
import { Ionicons } from '@expo/vector-icons';



function Mood(props) {

    const [overlay, setOverlay] = useState(false)
    const [addressIsChanged, setAddressIsChanged] = useState(false)
    const [numRue, setNumRue] = useState('')
    const [ville, setVille] = useState('')
    const [codePostal, setcodePostal] = useState('')



    const changeAdress = () => {
        console.log('overlay ok')
        setOverlay(true)

    }

    const updateAdress = () => {
        setOverlay(false)
        setAddressIsChanged(true)
        console.log('overlay gone')
    }

    var address;
    if (addressIsChanged) {
        address =
            <Text>
                {numRue}, {ville}, {codePostal}
            </Text>

    }
    else {
        address = <Text style={{ color: '#000000' }}> <Geoloc /> </Text>
    }
    console.log('new adress')



    return (
        <View >
            <TopBar />

            <View style={{ alignItems: 'center' }}>
                <Text h3 style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}>On y est presque !</Text>
            </View>
            <View >
                <Text style={{ color: '#000000', marginTop: 15, fontWeight: 'bold' }}> Quel est votre mood ?</Text>
            </View>
            {/* <Moods /> */}
            <View >
                <Text style={{ color: '#000000', marginTop: 15, fontWeight: 'bold' }}> Nombre de personnes affamées </Text>
            </View>

            <View style={{ marginTop: 15, width: "100%", alignItems: "center" }}>


                <View style={{ marginTop: 15, flexDirection: "column", width: "90%", alignItems: "center", backgroundColor: '#FFFFFF', borderRadius: 5, }}>
                    <Text h4 style={{ color: '#000000', fontWeight: 'bold', width: "90%" }}> Budget</Text>
                    <View style={{ marginTop: 15, marginBottom: 15, flexDirection: "row", width: "90%", alignItems: "center", padding: 0, marginLeft: 2 }}>
                        <Button title="5-10€" buttonStyle={{
                            backgroundColor: '#FFC901',
                            borderRadius: 5,
                            width: 80, marginRight: 10,
                        }} />
                        <Button title="10-15€" buttonStyle={{
                            backgroundColor: '#F2A902',
                            borderRadius: 5,
                            width: 80, marginRight: 10,
                        }} />
                        <Button title="15-20€" buttonStyle={{
                            backgroundColor: '#C95615',
                            borderRadius: 5,
                            width: 80, marginRight: 10,
                        }} />
                        <Button title="YOLO!" buttonStyle={{
                            backgroundColor: '#DB1919',
                            borderRadius: 5,
                            width: 80, marginRight: 10,
                        }} />
                    </View>
                </View>
                <View style={{ backgroundColor: '#FFFFFF', marginTop: 15, flexDirection: "row", width: "90%", height: 40, alignItems: "center", justifyContent: 'center' }}>
                    <Ionicons name="location-outline" size={24} color="#F2A902" />
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>Livré à:</Text>
                    {address}
                    <Ionicons
                        name="ellipsis-vertical"
                        size={24} color="#F2A902"
                        onPress={() => changeAdress()}
                        overlay={overlay} setOverlay={setOverlay}
                    />
                </View>
                <Overlay
                    isVisible={overlay}
                    onBackdropPress={() => setOverlay(false)}
                    overlayStyle={{
                        width: '90%',
                        marginTop: 60,
                        marginBottom: 50,
                        paddingVertical: 20,
                    }}
                >
                    <ScrollView>
                        <Input title="numRue" placeholder="N, rue" onChangeText={(numRue) => setNumRue(numRue)} />
                        <Input title="ville" placeholder="Ville" onChangeText={(ville) => setVille(ville)} />
                        <Input title="codePostal" placeholder="Code Postal" onChangeText={(codePostal) => setcodePostal(codePostal)} />

                    </ScrollView>
                    <NextButton title="VALIDER" onPress={() => updateAdress()} />
                </Overlay>
                <View style={{ marginTop: 15, width: "100%", alignItems: "center" }}>

                    <Button title="VITE J'AI FAIM" buttonStyle={{
                        backgroundColor: '#F2A902',
                        borderRadius: 5,
                        marginRight: 10, width: 425
                    }} />

                    {/* <NextButton buttonStyle={{ textAlign: 'right', width: 400 }} title="VITE J'AI FAIM" /> */}
                </View>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    // button: {
    //     backgroundColor: '#F2A902',
    //     borderRadius: 5,
    //     width: 100,
    //     paddingHorizontal: 10,
    //     paddingVertical: 10,
    //     textAlign: 'center',
    //     alignSelf: 'center',
    //     marginRight: 10,
    //     marginBottom: 10,
    // }
});

function mapDispatchToProps(dispatch) {
    return {
        onClick: function (diet) {
            dispatch({ type: '', diet })
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(Mood);