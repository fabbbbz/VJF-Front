import { CardField, useStripe } from '@stripe/stripe-react-native';
import React, { useState } from 'react'
import { View, StyleSheet, ScrollView } from 'react-native'
import { Button, Text, Input, Overlay } from 'react-native-elements'
import { SafeAreaView } from 'react-native-safe-area-context';
import TopBar from '../Components/TopBar'


export default function PaymentScreen(props) {
    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch(`pk_test_51JrTrKGYLeZVv03J8ZnXBOOpJYjTSpbRwRpsDc87euQ5gniEbZ1RbxmqgQkpZ7OCq2igW25TR1rykbn2BsF26obr00vlt5uXhp/create-payment-intent`, {
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
        if (!card) {
            return;
        }

        // Fetch the intent client secret from the backend
        const clientSecret = await fetchPaymentIntentClientSecret();

        // Confirm the payment with the card details
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
            type: 'Card',
            billingDetails,
        });

        if (error) {
            console.log('Payment confirmation error', error);
        } else if (paymentIntent) {
            console.log('Success from promise', paymentIntent);
        }
    };

    return (
        <SafeAreaView style={{
            width: '100%',
            backgroundColor: '#FFFFFF',
        }}>
            <TopBar showArrow={true} navigation={props.navigation} />
            <Text h4 style={{ alignSelf: "center", fontWeight: "bold", marginTop: 25 }}>Si tu veux manger vite, il faut payer vite !</Text>
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
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            <Button onPress={handlePayPress} title="Pay" buttonStyle={{ width: "85%", alignSelf: "center" }} />
            {/* disabled={loading} */}
        </SafeAreaView>
    );
}