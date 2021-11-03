import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView, Image, TouchableOpacity } from 'react-native'
import { Button, Text, Card } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { Ionicons } from '@expo/vector-icons'
import { Overlay } from 'react-native-elements'
import MyCheckbox from '../Components/Checkbox'
import NextButton from '../Components/NextButton'

function Allergies(props) {
    const [allergies, setAllergies] = useState([])
    const [allergyExist, setAllergyExist] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const [newAllergies, setnewAllergies] = useState([])
    const token = props.token
    var allergiesRender

    useEffect(() => {
        async function loadAllergies() {
            var rawResponse = await fetch(
                `https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/allergies/${token}`
            )
            var response = await rawResponse.json()

            /*verifie l'existance d'une allergie dans le document user et verifie que l'allergie soit != null 
si ces conditions sont remplies allergyExist passe a true*/

            if (response.allergies.length > 0 && response.allergies[0] !== null) {
                setAllergyExist(true)
                setAllergies(response.allergies)
            }
        }

        loadAllergies()
    }, [])



    if (allergyExist == true) {
        allergiesRender = newAllergies.map((allergy, i) => {

            return (
                <Card
                    key={i}
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
                    <Card.Title style={{ marginBottom: 0, alignItems: "center" }}>

                        {allergy}
                    </Card.Title>
                    <Button
                        type="clear"
                        onPress={() => {
                            handleAllergyDeletion(allergy)
                        }}
                        icon={<Ionicons size={25} name="trash-outline" color="#FFC901" />}
                    />
                </Card>
            )
        })
        var array = mergeArrays(allergies, props.allergies)
        if (array) {
            setnewAllergies(array)
        }
    } else {
        allergiesRender = <Text style={{ alignSelf: "center", marginTop: 25, fontWeight: "bold" }}>vous n'avez pas d'allergies renseignées</Text>
    }

    async function handleAllergyDeletion(allergy) {

        var allergyFilter = allergies.filter(e => e !== allergy)
        setAllergies(allergyFilter)
        props.removeAllergy(allergy)
        console.log(allergy)
        var rawResponse = await fetch(
            `https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/delallergies/${token}/${allergy}`,

            {
                method: 'DELETE',
            }
        )
    }

    async function handleAllergies(boolean) {
        setOverlay(boolean)
        console.log("props", props.allergies)

        const dataToUpdate = {

            allergies: props.allergies,
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToUpdate),
        }
        const data = await fetch(
            `https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/update-me/${token}`,
            requestOptions
        )
        const result = await data.json()

        console.log(result)
        setAllergies(result.doc.allergies)
    }

    // testing 
    function mergeArrays(...arrays) {
        let jointArray = []
        arrays.forEach(array => {
            jointArray = [...jointArray, ...array]
        })
        const uniqueArray = jointArray.filter((item, index) => jointArray.indexOf(item) === index)
        return uniqueArray

    }

    return (
        <ScrollView>
            <TopBar navigation={props.navigation} />
            <Text
                h3
                style={{
                    alignSelf: 'center',
                    marginTop: 15,
                    textDecorationLine: 'underline',
                    color: '#FFC901',
                }}
            >
                Allergies
            </Text>
            {allergiesRender}

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
                    <MyCheckbox title="Gluten" isAllergy={true} />
                    <MyCheckbox title="Sesame" isAllergy={true} />
                    <MyCheckbox title="Fruits à coque" isAllergy={true} />
                    <MyCheckbox title="Crustacés" isAllergy={true} />
                    <MyCheckbox title="Oeuf" isAllergy={true} />
                    <MyCheckbox title="Poisson" isAllergy={true} />
                    <MyCheckbox title="Moutarde" isAllergy={true} />
                    <MyCheckbox title="Lait" isAllergy={true} />
                    <MyCheckbox title="Celeri" isAllergy={true} />
                    <MyCheckbox title="Arachides" isAllergy={true} />
                    <MyCheckbox title="Soja" isAllergy={true} />
                    <MyCheckbox title="Mollusques" isAllergy={true} />
                    <MyCheckbox title="Lupin" isAllergy={true} />
                    <MyCheckbox title="Sulfites" isAllergy={true} />

                    <NextButton title="VALIDER" onPress={() => handleAllergies(false)} />
                </ScrollView>
            </Overlay>

            <TouchableOpacity onPress={() => handleAllergies(true)}>
                <Image
                    style={{ width: 50, height: 50, alignSelf: "center" }}
                    source={require('../assets/plusIcon.png')} />

            </TouchableOpacity>


        </ScrollView >


    )
}
function mapDispatchToProps(dispatch) {
    return {
        addAllergy: function (allergy) {
            dispatch({ type: 'ADD_ALLERGY', allergy })
        },
        removeAllergy: function (allergy) {
            dispatch({ type: 'REMOVE_ALLERGY', allergy })
        },
    }
}
function mapStateToProps(state) {
    return {
        token: state.token,
        allergies: state.allergies,
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Allergies)
