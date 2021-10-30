import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native'
import { Button, Text, Card } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { Ionicons } from '@expo/vector-icons'
import { MY_IP } from '@env'
import { Overlay } from 'react-native-elements'
import MyCheckbox from '../Components/Checkbox'
import NextButton from '../Components/NextButton'
function Allergies(props) {
    const [allergies, setAllergies] = useState([])
    const [allergyExist, setAllergyExist] = useState(false)
    const [overlay, setOverlay] = useState(false)
    const token = props.token

    const handleAllergies = allergy => {
        setOverlay(false)
    }

    useEffect(() => {
        async function loadAllergies() {

            var rawResponse = await fetch(

                `https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/${token}`
            )
            var response = await rawResponse.json()
            console.log(response)
            /*verifie l'existance d'une allergie dans le document user et verifie que l'allergie soit != null 
si ces conditions sont remplies allergyExist passe a true*/
            if (response.allergies.length >= 1 && response.allergies[0] !== null) {
                setAllergyExist(true)

            }



        }

        loadAllergies()
    }, [])

    /* si allergyExist == true les allergies sont affichées
    sinon un message s'affiche avertissant l'utilisateur qu'il n'a pas renseigné d'allergies*/
    console.log(allergyExist)
    if (allergyExist == true) {
        var allergiesRender = allergies.map((allergy, i) => {
            return (
                <Card
                    key={i}
                    containerStyle={{
                        borderRadius: 10,
                        elevation: 4,
                        shadowOffset: { width: 5, height: 5 },
                        shadowColor: '#FFC901',
                        shadowOpacity: 1,
                        shadowRadius: 20,
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
    } else {
        allergiesRender = <Text style={{ alignSelf: "center", marginTop: 25, fontWeight: "bold" }}>vous n'avez pas d'allergies renseignées</Text>
    }
    async function handleAllergyDeletion(allergy) {
        console.log(allergy)
        var allergyFilter = allergies.filter(e => e !== allergy)
        setAllergies(allergyFilter)
        var rawResponse = await fetch(
            `https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/${token}/${allergy}`,
            {
                method: 'DELETE',
            }
        )
        // var response = await rawResponse.json()

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

                <NextButton title="VALIDER" onPress={() => handleAllergies()} />
            </Overlay>

        </ScrollView>


    )
}

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}
export default connect(mapStateToProps, null)(Allergies)
