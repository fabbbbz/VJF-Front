import React from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import TopBar from '../Components/TopBar'
import Diet from '../Components/Diet'
import Donts from '../Components/Donts'
import Allergies from '../Components/Allergies'
import NextButton from '../Components/NextButton'

import { connect } from 'react-redux';

const Home = props => {
<<<<<<< HEAD
	return (
		<View style={styles.container}>
			<TopBar />
			<ScrollView>
				<Diet />
				<Donts />
				<Allergies />
				<NextButton title="NEXT" color="#F2A902" width="200" />
			</ScrollView>
		</View>
	)
=======
    return (
        <View style={styles.container}>
            <TopBar />
            <View>
                <Diet />
                <Donts />
                <Allergies />
                <NextButton title="NEXT" />
            </View>
        </View>
    )
>>>>>>> 864bfc96f18b992a7de6969ef8b1754427391825
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
})


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
)(Home);