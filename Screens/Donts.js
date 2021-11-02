import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import UserDonts from '../Components/UserDonts';
import { connect } from 'react-redux'
import UserDontsAdd from '../Components/UserDontsAdd'
import SmallButton from '../Components/SmallButton'


function Donts(props) {

    const token = props.token

    const handleDonts = async () => {
        try {

            const dataToUpdate = {
                dont: props.donts
            }

            console.log('props.dont', props.donts)
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToUpdate),
            }
            const data = await fetch(
                `https://vitejaifaim-master-i57witqbae0.herokuapp.com/users/update-me/${token}`,
                requestOptions
            )

        } catch (err) {
            console.log(err)
        }
    }


    return (

        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <ScrollView >
                <Text h2 style={{ color: '#F2A902', textAlign: 'center' }}>Donts</Text>
                <UserDonts />
                <UserDontsAdd />
            </ScrollView>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
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


