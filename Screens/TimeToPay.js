import React, { useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Text, Overlay } from 'react-native-elements'
import { connect } from 'react-redux'
import {
	useStripe,
} from '@stripe/stripe-react-native'
import { StripeProvider } from '@stripe/stripe-react-native';
import NextButtonFullSize from '../Components/visual/NextButtonFullSize'
import OrderRecap from '../Components/functional/OrderRecap'
import Address from '../Components/functional/Address'
import TopBar from '../Components/visual/TopBar'

const P_Key = " pk_test_51JY5XQEKfhZc95pkU6vYakETH10f2c8OdiCJQzfdLEmkK4UYiNCeZ0ChXPhvS9TOoYusjwQnwiF5zFm3dODMOeKG00If0rpWLk"


const TimeToPay = props => {
	const [overlay, setOverlay] = useState(false)
	const token = props.token
	const stripe = useStripe();
	// Send data to stripe & get command key

	const fetchPaymentIntentClientSecret = async () => {
		try {
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
					token: token
				}),
			})

			const { clientSecret } = await datatoStripe.json()

			let initPayment
			let paiementStripe

			if (clientSecret) {
				initPayment = await stripe.initPaymentSheet({
					paymentIntentClientSecret: clientSecret,
				});
			}

			console.log(initPayment)

			paiementStripe = await stripe.presentPaymentSheet({
				clientSecret: clientSecret,
			});

			console.log(paiementStripe)

			setOverlay(true)
			setTimeout(() => setOverlay(false), 1900);
			setTimeout(() => props.navigation.navigate('Livraison', {
				screen: 'Livraison',
			}), 2500);


		} catch (err) {
			console.error(err);
			Alert.alert("Paiement Refusé.");
		}
	};

	return (
		<StripeProvider publishableKey={P_Key}>
			<KeyboardAwareScrollView style={styles.container}>
				<TopBar navigation={props.navigation} />
				<Text h3 style={{ color: '#F2A902', textAlign: 'center', marginTop: '8%', marginBottom: '8%' }}>

					Récapitulatif
				</Text>
				<OrderRecap />
				<Address />
				<View style={{ marginTop: 30 }}>
					<NextButtonFullSize
						title="Finaliser la commande"
						onPress={fetchPaymentIntentClientSecret}
					/>
				</View>
				<View>
					<Overlay
						isVisible={overlay}
						onBackdropPress={() => setOverlay(false)}
						overlayStyle={{
							width: '70%',
							marginTop: 600,
							paddingVertical: 20,
							textAlign: 'center',
							backgroundColor: 'rgba(0,0,0,0.9)'
						}}
					>
						<Text style={styles.messsage}>Merci votre Paiement est Validé.</Text>
					</Overlay>
				</View>
			</KeyboardAwareScrollView>
		</StripeProvider >
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
	messsage: {
		textAlign: 'center',
		color: '#F2A902',
		fontSize: 20,
	},
})

function mapStateToProps(state) {
	return {
		order: state.order,
		token: state.token
	}
}

export default connect(mapStateToProps, null)(TimeToPay)
