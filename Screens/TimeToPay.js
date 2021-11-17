import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { connect } from 'react-redux'
import NextButtonFullSize from '../Components/NextButtonFullSize'
import OrderRecap from '../Components/OrderRecap'
import Address from '../Components/Address'
import {
	CardField,
	useConfirmPayment,
} from '@stripe/stripe-react-native'

const TimeToPay = props => {
	const { confirmPayment, loading } = useConfirmPayment()
	const [cardDetails, setCardDetails] = useState()

	const fetchPaymentIntentClientSecret = async () => {
		const data = await fetch(
			`https://vitejaifaim.herokuapp.com/orders/update-order/${props.order}`,
			{
				method: 'PUT',
			}
		)
		const response = await data.json()

		const datatoStripe = await fetch(`https://vitejaifaim.herokuapp.com/orders/payment`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				price: response.order.price,
				currency: 'eur',
			}),
		})
		const { clientSecret } = await datatoStripe.json()
		return clientSecret
	};

	const handlePayPress = async () => {
		// Fetch the intent client secret from the backend
		const clientSecret = await fetchPaymentIntentClientSecret()
		// Confirm the payment with the card details
		const { paymentIntent, error } = await confirmPayment(clientSecret, {
			type: 'Card',
		})
		if (error) {
		} else if (paymentIntent) {
		}
		if (cardDetails) {
			props.navigation.navigate('Livraison', {
				screen: 'Livraison',
			})
		}
	};

	return (
		<KeyboardAwareScrollView style={styles.container}>
			<TopBar navigation={props.navigation} />
			<Text h3 style={styles.text}>
				Récapitulatif
			</Text>
			<OrderRecap />
			<Address />

			<CardField
				postalCodeEnabled={true}
				placeholder={{
					number: '4242 4242 4242 4242',
				}}
				cardStyle={{
					backgroundColor: '#FFFFFF',
					textColor: '#000000',
					alignSelf: '100%',
				}}
				style={{
					width: '92%',
					height: 150,
					marginVertical: 15,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					alignSelf: 'center',
				}}
				onCardChange={cardDetails => {
					setCardDetails(cardDetails)
				}}
			/>
			<NextButtonFullSize
				title="PAYER"
				onPress={handlePayPress}
				disabled={loading}
			/>
		</KeyboardAwareScrollView>
	)
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F4F4F4',
	},
	text: {
		textAlign: 'center',
		marginTop: 20,
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
