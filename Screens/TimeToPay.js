import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { connect } from 'react-redux'
import NextButtonFullSize from '../Components/NextButtonFullSize'
import OrderRecap from '../Components/OrderRecap'
import Address from '../Components/Address'
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';

const TimeToPay = props => {
    const [order, setOrder] = useState({})
    const { confirmPayment, loading } = useConfirmPayment();
    const [cardDetails, setCardDetails] = useState()
    const API_URL = "http://172.17.1.114:3000"

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`${API_URL}/orders/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currency: 'usd',
            }),
        });
        const { clientSecret } = await response.json();

        return clientSecret;
    };

    const handlePayPress = async () => {
        // if (!card) {
        //     return;
        // }
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

        // Fetch the intent client secret from the backend
        const clientSecret = await fetchPaymentIntentClientSecret();

        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: 'Card',
            billingDetails: billingDetails
        });

        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Payment successful', paymentIntent);
        }



        if (cardDetails && result) {
            props.navigation.navigate('Livraison', {
                screen: 'Livraison',
            })
        } else {
            console.log("il faut payer")
        }

    };

    console.log('orderId: ', props.order)

    // const handlePaiement = async () => {
    //     try {
    //         console.log('take my money')
    //         // fetch une route pour update status de la commande
    //         const data = await fetch(
    //             `https://vitejaifaim-master-i57witqbae0.herokuapp.com/orders/update-order/${props.order}`,
    //             {
    //                 method: 'PUT',
    //             }
    //         )
    //         const result = await data.json()
    //         console.log(result)
    //         if (result) {
    //             props.navigation.navigate('Livraison', {
    //                 screen: 'Livraison',
    //             })
    //         }
    //     } catch (err) {
    //         console.log(err.message)
    //     }
    // }

    return (

        <ScrollView style={styles.container}>
            <TopBar navigation={props.navigation} />
            <Text h3 style={styles.text}>
                Récapitulatif
            </Text>
            <OrderRecap />
            <Address />
            <CardField onCardChange={(cardDetails) => console.log('cardDetails', cardDetails)} />
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                    alignSelf: "100%"
                }}
                style={{
                    width: '98%',
                    height: 150,
                    marginVertical: 30,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onCardChange={(cardDetails) => {
                    setCardDetails(cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            <NextButtonFullSize title="PAYER" onPress={handlePayPress} disabled={loading} />
        </ScrollView>

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
