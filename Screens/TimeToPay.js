import React, { useState, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { connect } from 'react-redux'
import NextButtonFullSize from '../Components/NextButtonFullSize'
import OrderRecap from '../Components/OrderRecap'
import Address from '../Components/Address'

const TimeToPay = props => {
    const [order, setOrder] = useState({})

    console.log('orderId: ', props.order)

    const handlePaiement = async () => {
        try {
            console.log('take my money')
            // fetch une route pour update status de la commande
            const data = await fetch(
                `https://vitejaifaim-master-i57witqbae0.herokuapp.com/orders/update-order/${props.order}`,
                {
                    method: 'PUT',
                }
            )
            const result = await data.json()
            console.log(result)
            if (result) {
                props.navigation.navigate('PaymentScreen', {
                    screen: 'PaymentScreen',
                })
            }
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <View style={styles.container}>
            <TopBar navigation={props.navigation} />
            <Text h3 style={styles.text}>
                Récapitulatif
            </Text>
            <OrderRecap />
            <Address />

            <NextButtonFullSize title="PAYER" onPress={handlePaiement} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
    },
    text: {
        textAlign: 'center',
        marginTop: 40,
    },
    tinyLogo: {
        width: 80,
        height: 80,
    },
})

function mapStateToProps(state) {
    return {
        order: state.order,
    }
}

export default connect(mapStateToProps, null)(TimeToPay)
