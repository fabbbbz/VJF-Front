import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input } from 'react-native-elements'
import TopBar from '../Components/TopBar';
import Moods from '../Components/Moods';
import NextButton from '../Components/NextButton';


import { connect } from 'react-redux';



function Mood(props) {


    return (
        <View >
            <TopBar />
            <View style={{ alignItems: 'center' }}>
                <Text h3 style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}>On y est presque !</Text>
            </View>

            {/* <Moods /> */}


            <NextButton title="VITE J'AI FAIM" />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    }
});

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
)(Mood);