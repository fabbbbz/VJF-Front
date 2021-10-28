import React from 'react'
import { StyleSheet, View, Image, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'

function FinalPage(props) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../assets/VJF-logo.png')}
                style={{ width: 200, height: 200, marginTop: 100 }}
            />

            <Text h1 style={{ textAlign: 'center', color: '#000000', marginTop: 50 }}>
                Vite j'ai faim!
            </Text>

            <Text h4 style={{ textAlign: 'center', color: '#F2A902', marginTop: 50 }}>
                Merci pour votre confiance !
            </Text>
            <ScrollView style={{ marginTop: 50 }}>
                <NextButton
                    title="MOOD"
                    onPress={() => {
                        props.navigation.navigate('Mood', { screen: 'Mood' })
                    }}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#F4F4F4',
    },
})
//get token from store
function mapStateToProps(state) {
    return { token: state.token }
}
export default connect(mapStateToProps, null)(FinalPage)
