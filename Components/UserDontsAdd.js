import React, { useState } from 'react'
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import { Text, Input, Button } from 'react-native-elements'
import { AntDesign } from '@expo/vector-icons'
import { connect } from 'react-redux'

const UserDontsAdd = props => {

    const token = props.token
    const [manualDonts, setManualDonts] = useState([])
    const [manualIngredient, setManualIngredient] = useState('')
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0

    const handleManualAdd = () => {
        console.log(manualIngredient)
        setManualIngredient('')
        setManualDonts(prevDonts => [...prevDonts, manualIngredient])
        handleDonts()
    }

    const handleDonts = async () => {
        try {
            const dataToUpdate = {
                dont: props.donts
            }

            console.log('dataToUpdate', dataToUpdate)

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

        } catch (err) {
            console.log(err)
        }
    }

    console.log('props3', props.donts)


    return (
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

    )
}

const styles = StyleSheet.create({
    container: {
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



function mapStateToProps(state) {
    return {
        donts: state.donts,
    }
}

export default connect(mapStateToProps, null)(UserDontsAdd)
