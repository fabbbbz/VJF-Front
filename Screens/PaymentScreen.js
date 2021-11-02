import { CardField, useStripe } from '@stripe/stripe-react-native';
import { Button } from "react-native-elements"

export default function PaymentScreen() {
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
        <View>
            <CardField onCardChange={(cardDetails) => console.log('cardDetails', cardDetails)} />
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: '4242 4242 4242 4242',
                }}
                cardStyle={{
                    backgroundColor: '#FFFFFF',
                    textColor: '#000000',
                }}
                style={{
                    width: '100%',
                    height: 50,
                    marginVertical: 30,
                }}
                onCardChange={(cardDetails) => {
                    console.log('cardDetails', cardDetails);
                }}
                onFocus={(focusedField) => {
                    console.log('focusField', focusedField);
                }}
            />
            <Button onPress={handlePayPress} title="Pay" disabled={loading} />
        </View>
    );
}