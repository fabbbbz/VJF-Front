import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native'
import { Text, Input, Button, Card } from 'react-native-elements'
import { connect } from 'react-redux'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import TopBar from '../Components/visual/TopBar'

function Donts(props) {
    const token = props.token
    const [userDonts, setUserDonts] = useState([])
    const [manualIngredient, setManualIngredient] = useState('')
    const [dontExists, setDontExists] = useState(false)
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    //affichage des donts
    useEffect(() => {
        async function loadDonts() {
            var rawResponse = await fetch(`https://vitejaifaim.herokuapp.com/users/myDonts/${token}`)
            var response = await rawResponse.json()
            setUserDonts(response.donts)
            setDontExists(true)
            if (response.donts.length > 0 && response.donts[0] !== null) {
                setDontExists(true)
            }
        }
        loadDonts()
    }, [])

    if (dontExists) {
        var showUserDonts = userDonts.map((dont, k) => {
            return (
                <Card
                    key={k}
                    containerStyle={{
                        borderRadius: 10,
                        elevation: 4,
                        shadowOffset: { width: 2, height: 2 },
                        shadowColor: 'rgba(0,0,0, 0.2)',
                        shadowOpacity: 0.5,
                        shadowRadius: 2,
                    }}
                    wrapperStyle={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        flexWrap: 'nowrap',
                        alignItems: 'center',
                    }}
                >
                    <Card.Title style={{ marginBottom: 0, alignItems: 'center' }}>
                        {dont}
                    </Card.Title>
                    <Button
                        title=""
                        type="clear"
                        onPress={() => {
                            handleDontDelete(dont)
                        }}
                        icon={<Ionicons size={25} name="trash-outline" color="#FFC901" />}
                    />
                </Card>
            )
        })
    } else {
        var showUserDonts =
            < View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginBottom: 25 }}>
                <Text>Vous n'avez pas de dont renseign??s</Text>
            </View>
    }

    //Add donts 
    const handleDonts = async () => {
        setUserDonts(prevDonts => [...prevDonts, manualIngredient])
        setManualIngredient('')
        try {
            if (manualIngredient != '') {
                const listDont = await fetch(
                    `https://vitejaifaim.herokuapp.com/users/adddonts/${token}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `dont=${manualIngredient}`,
                    }
                )
            }
            setDontExists(true)
        } catch (err) {
        }
    }

    //Del donts
    async function handleDontDelete(dont) {
        var filterDonts = userDonts.filter((e) => (e !== dont))
        setUserDonts(filterDonts)
        var rawResponse = await fetch(
            `https://vitejaifaim.herokuapp.com/users/deletedonts/${token}/${dont}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },

            }
        )
        var response = await rawResponse.json()
        if (response.donts.length == 0) {
            setDontExists(false)
        }
    }

    return (
        <View >
            <TopBar navigation={props.navigation} />
            <ScrollView >
                <Text h4 style={{ color: '#F2A902', textAlign: 'center', marginTop: "4%" }}>Donts</Text>
                <ScrollView >
                    {showUserDonts}
                </ScrollView>
                <View style={styles.container}>
                    <Text h4 style={styles.sectionTitle}>
                        Je n'aime pas du tout :
                    </Text>
                    <View style={styles.ingredients}>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                            keyboardVerticalOffset={keyboardVerticalOffset}
                        >
                            <Input
                                onChangeText={value => setManualIngredient(value)}
                                value={manualIngredient}
                                rightIcon={
                                    <AntDesign
                                        name="pluscircleo"
                                        size={24}
                                        color="black"
                                        onPress={handleDonts}
                                    />
                                }
                                placeholder="Ajoutez un ingr??dient"

                            />
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    userAllergies: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        margin: 15,
        borderColor: '#F2A902',
    },
    sectionTitle: {
        marginBottom: 10,
        marginTop: 30,
        textAlign: 'center',
    },
})

function mapDispatchToProps(dispatch) {
    return {
        addDont: function (dont) {
            dispatch({ type: 'ADD_DONT', newDont: dont })
        },
        removeDont: function (dont) {
            dispatch({ type: 'REMOVE_DONT', dont: dont })
        },
    }
}

function mapStateToProps(state) {
    return {
        token: state.token,
        donts: state.donts,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Donts)