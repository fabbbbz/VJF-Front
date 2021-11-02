import React, { useEffect, useState } from 'react'
import { View, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import { connect } from 'react-redux'
import { AntDesign, Ionicons } from '@expo/vector-icons'



function Donts(props) {

    const token = props.token
    const [userDonts, setUserDonts] = useState([])
    const [dontsList, setDontsList] = useState([])
    const [manualDonts, setManualDonts] = useState([])
    const [manualIngredient, setManualIngredient] = useState('')
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
    const [newDont, setNewDont] = useState('')


    //affichage des donts
    useEffect(() => {

        async function loadDonts() {

            var rawResponse = await fetch(`http://192.168.1.14:3000/users/myDonts/${token}`)
            var response = await rawResponse.json()

            setUserDonts(response.donts)

            console.log('response', response.donts)
        }

        loadDonts()
    }, [newDont, dontsList]);


    var showUserDonts = userDonts.map((dont, k) => {
        return (
            < View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 25 }} key={k}>
                <Text style={{ alignSelf: 'center' }}>{dont}</Text>
                <Button
                    title=""
                    type="clear"
                    onPress={() => {
                        handleDontDelete(dont)
                    }}
                    icon={<Ionicons size={25} name="trash-outline" color="#FFC901" />}
                />
            </View >
        )
    })

    console.log('manualDonts', manualDonts)


    const handleManualAdd = () => {

        console.log("manualIngredient", manualIngredient)
        setNewDont(manualIngredient)
        setManualIngredient('')
        setManualDonts(prevDonts => [...prevDonts, manualIngredient])
        handleDonts()

        console.log('handleManualAdd')
        console.log('newdont', newDont)
    }


    //Ajout de dont
    const handleDonts = async () => {
        try {
            const dont = newDont
            const listDont = await fetch(
                `http://192.168.1.14:3000/users/adddonts/${token}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `dont=${dont}`,
                }
            )

        } catch (err) {
            console.log(err)
        }
    }

    //suppression de donts ok
    async function handleDontDelete(dont) {
        const token = props.token

        console.log("deletedont")

        var filterDonts = dontsList.filter((e) => (e !== dont))
        setDontsList(filterDonts)

        var rawResponse = await fetch(
            `http://192.168.1.14:3000/users/deletedonts/${token}/${dont}`,
            {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `dont=${dont}`
            }
        )
        var response = await rawResponse.json()
        console.log('response del', response)
    }



    return (

        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <ScrollView >
                <Text h2 style={{ color: '#F2A902', textAlign: 'center', marginTop: "4%" }}>Donts</Text>
                <ScrollView style={styles.userDonts}>
                    {showUserDonts}
                </ScrollView>
                <View style={styles.container}>
                    <Text h4 style={styles.sectionTitle}>
                        Je n'aime pas du tout :
                    </Text>

                    <ScrollView style={styles.ingredients}>
                        {manualDonts &&
                            manualDonts.map((dont, m) => (
                                <Button
                                    title={dont} key={m}
                                    buttonStyle={{
                                        backgroundColor: '#000000',
                                        borderRadius: 25,
                                        size: 10,
                                        margin: 5,
                                        paddingHorizontal: 10,
                                    }}
                                />
                            ))}

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
                                        onPress={handleManualAdd}
                                    />
                                }
                                placeholder="Ajoutez un ingrédient"
                                style={{ marginTop: 10, marginHorizontal: 10 }}
                            />
                        </KeyboardAvoidingView>

                    </ScrollView>
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
    userDonts: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        margin: 15,
        borderColor: '#F2A902',
    },
    sectionTitle: {
        marginBottom: 10,
        marginTop: 10,
        textAlign: 'center',
    },

    ingredients: {
        display: 'flex',
        flexDirection: 'row',
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


