import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { MY_IP } from "@env"

function userDonts(props) {

    const token = props.token
    const [userDonts, setUserDonts] = useState([])
    useEffect(() => {
        async function loadDonts() {
            var rawResponse = await fetch(`http://${MY_IP}/users/myDonts/${token}`)
            var response = await rawResponse.json()
            setUserDonts(response.donts)
        }
        loadDonts()
    }, []);
    // marginLeft: "45%"
    return (

        <View style={styles.container}>
            {userDonts.map((dont, i) => (
                < View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 25, marginBottom: 25 }} >
                    <Text style={{ alignSelf: 'center' }}>{dont}</Text>
                    <Ionicons style={{ alignSelf: 'flex-end' }} name="trash-outline" size={24} color="#FFC901" />

                </View >
            ))
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 10,
        margin: 15,
        borderColor: '#F2A902',

    },
})

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(userDonts)