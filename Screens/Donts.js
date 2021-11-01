import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import UserDonts from '../Components/UserDonts';
import { connect } from 'react-redux'


function Donts(props) {


    return (

        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <View >
                <Text h2 style={{ color: '#F2A902', textAlign: 'center' }}>Donts</Text>
                < UserDonts />
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
})

function mapStateToProps(state) {
    return {
        token: state.token,
    }
}

export default connect(mapStateToProps, null)(Donts)