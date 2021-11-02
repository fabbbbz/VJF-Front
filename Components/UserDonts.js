import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, ScrollView, PanResponder } from 'react-native'
import { useIsFocused } from '@react-navigation/native'
import { Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'


function userDonts(props) {

    const token = props.token
    const isFocused = useIsFocused()

    const [userDonts, setUserDonts] = useState([])

    useEffect(() => {

        async function loadDonts() {

            var rawResponse = await fetch(`https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/myDonts/${token}`)
            var response = await rawResponse.json()

            setUserDonts(response.donts)

            console.log('response', response.donts)
        }

        loadDonts()
    }, [isFocused]);


    return (
        <ScrollView >
            <ScrollView style={styles.container}>
                {userDonts.map((dont, k) => (
                    < View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 25, marginBottom: 25 }} key={k}>
                        <Text style={{ alignSelf: 'center' }}>{dont}</Text>
                        <Ionicons style={{ alignSelf: 'flex-end' }} name="trash-outline" size={24} color="#FFC901" />
                    </View >
                ))
                }
            </ScrollView >
        </ScrollView >
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
    }
})


function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(userDonts)

// for (var i = 0; i < response.donts.length; i++) {
//     props.addDont(response.donts[i])
// }