import React from 'react'
import { View, StyleSheet, TextInput } from 'react-native'
import { Button, Text, Input, Icon } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import Moods from '../Components/Moods'
import NextButton from '../Components/NextButton'
import { connect } from 'react-redux'

function Mood(props) {
    return (
        <View>
            <TopBar showArrow={true} navigation={props.navigation} />

            <View style={{ alignItems: 'center' }}>
                <Text
                    h3
                    style={{ textAlign: 'center', color: '#000000', marginTop: 15 }}
                >
                    On y est presque !
                </Text>
            </View>
            <View>
                <Text style={{ color: '#000000', marginTop: 15, fontWeight: 'bold' }}>
                    {' '}
                    Quel est votre mood ?
                </Text>
            </View>


            <View
                style={{
                    marginTop: 15,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: "center",
                    alignSelf: "center",
                    // backgroundColor: '#FFFFFF',
                    borderRadius: 5,
                }}
            >
                <Button
                    icon={<Icon name="shuffle" size={15} color="white" iconPosition="top" />}
                    onPress={() => { props.dietHandle("omni") }}
                    title="Surprise Totale"
                    buttonStyle={

                        styles.moodButton}

                />
                <Button
                    onPress={() => { props.dietHandle("Healthy") }}
                    title="Healthy"
                    buttonStyle={
                        styles.moodButton}
                />
                <Button
                    onPress={() => { props.dietHandle("Comme chez Maman") }}
                    title="Comme chez Maman"
                    buttonStyle={
                        styles.moodButton}
                />
                <Button
                    onPress={() => { props.dietHandle("Cuisine du monde") }}
                    title="Cuisine du monde"
                    buttonStyle={
                        styles.moodButton}
                />
                <Button
                    onPress={() => { props.dietHandle("Soir de Match") }}
                    title="Soir de Match"
                    buttonStyle={
                        styles.moodButton}
                />
                <Button
                    onPress={() => { props.dietHandle("A partager") }}
                    title="A partager"
                    buttonStyle={
                        styles.moodButton}
                />


            </View>



            {/* <Moods /> */}
            <View>
                <Text style={{ color: '#000000', marginTop: 15, fontWeight: 'bold' }}>
                    {' '}
                    Nombre de personnes affamées{' '}

                </Text>
            </View>

            <View style={{ marginTop: 15, width: '100%', alignItems: 'center', }}>
                <View
                    style={{
                        marginTop: 15,
                        flexDirection: 'column',
                        width: '90%',
                        alignItems: 'center',
                        backgroundColor: '#FFFFFF',
                        borderRadius: 5,
                    }}
                >
                    <Text
                        h4
                        style={{ color: '#000000', fontWeight: 'bold', width: '90%' }}
                    >
                        {' '}
                        Budget
                    </Text>
                    <View
                        style={{
                            marginTop: 15,
                            marginBottom: 15,
                            flexDirection: 'row',
                            width: '90%',
                            alignItems: 'space-between',
                            padding: 0,
                            marginLeft: 2,
                        }}
                    >
                        <Button
                            onPress={() => { props.budgetHandle(10) }}
                            title="5-10€"
                            buttonStyle={{
                                backgroundColor: '#FFC901',
                                borderRadius: 5,
                                width: 80,
                                marginRight: 10,
                            }}
                        />
                        <Button
                            onPress={() => { props.budgetHandle(15) }}
                            title="10-15€"
                            buttonStyle={{
                                backgroundColor: '#F2A902',
                                borderRadius: 5,
                                width: 80,
                                marginRight: 10,
                            }}
                        />
                        <Button
                            onPress={() => { props.budgetHandle(20) }}
                            title="15-20€"
                            buttonStyle={{
                                backgroundColor: '#C95615',
                                borderRadius: 5,
                                width: 80,
                                marginRight: 10,
                            }}
                        />
                        <Button
                            onPress={() => { props.budgetHandle(10000) }}
                            title="YOLO!"
                            buttonStyle={{
                                backgroundColor: '#DB1919',
                                borderRadius: 5,
                                width: 80,
                                marginRight: 10,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#FFFFFF',
                        marginTop: 15,
                        flexDirection: 'row',
                        width: '90%',
                        height: 40,
                        alignItems: 'center',
                        borderRadius: 5,
                    }}
                >
                    <Text style={{ color: '#000000', fontWeight: 'bold' }}>
                        {' '}
                        (Icon) Livré à:{' '}
                    </Text>
                    <Text style={{ color: '#000000' }}>
                        {' '}
                        56 boulevard Perreire, Paris (Icon){' '}
                    </Text>
                </View>
                <View style={{ marginTop: 15, width: '100%', alignItems: 'center', alignSelf: "center", }}>
                    <Button
                        title="VITE J'AI FAIM"
                        buttonStyle={{
                            backgroundColor: '#F2A902',
                            borderRadius: 5,
                            marginRight: 10,
                            alignSelf: "center",
                            width: 416,
                        }}
                    />


                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    moodButton: {
        backgroundColor: '#FFC901',
        width: 138,
        height: 110,
    }
})

function mapDispatchToProps(dispatch) {
    return {
        dietHandle: function (diet) {
            dispatch({ type: "ADD_DIET", diet })
        },
        budgetHandle: function (budget) {
            dispatch({ type: 'budgetChoice', budget })
        },

    }
}

export default connect(null, mapDispatchToProps)(Mood)
