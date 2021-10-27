import React from 'react'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Text } from 'react-native-elements'
import TopBar from '../Components/TopBar'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
import LottieView from "lottie-react-native";

function Livraison(props) {
	const [start, setStart] = useState(true)
	const [seconds, setSeconds] = useState(5);
	const [commandRender, setCommandRender] = useState('')

	useEffect(() => {
		if (start) {
			setCommandRender('order')
			console.log('Preparation...')
		}
	}, [])

	var order =
		<View>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Envoie de la commande au restaurant !</Text>
			<LottieView
				source={require("../assets/order.json")}
				style={styles.waiting}
				autoPlay
			/>
		</View>

	var preparation =
		<View>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Commande validée </Text>
			<LottieView
				source={require("../assets/done.json")}
				autoPlay
				style={styles.done}
			/>

			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Votre commande est en prépartation ! </Text>
			<View style={{ marginTop: 15 }} >
				<LottieView
					source={require("../assets/prepa.json")}
					style={styles.preparation}
					autoPlay
				/>
			</View>
		</View >

	var livraison =
		<View>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Commande validée </Text>
			<LottieView
				source={require("../assets/done.json")}
				autoPlay
				style={styles.done}
			/>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Commande preparée!!</Text>
			<LottieView
				source={require("../assets/done.json")}
				autoPlay
				style={styles.done}
			/>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Remis au livreur</Text>

			<LottieView
				source={require("../assets/deliveryman.json")}
				style={styles.deliveryman}
				autoPlay
			/>
		</View>

	var done =
		<View>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Commande preparée!!</Text>
			<LottieView
				source={require("../assets/done.json")}
				style={styles.done}
				autoPlay
			/>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Commande livrée!!</Text>
			<LottieView
				source={require("../assets/done.json")}
				style={styles.done}
				autoPlay
			/>
			<Text
				style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
			>
				Toc toc c'est la !!</Text>
			<LottieView
				source={require("../assets/foodishere.json")}
				style={styles.deliverymanwait}
				autoPlay
			/>
		</View>

	var showscreen
	if (commandRender == 'order') {
		showscreen = order
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000);
			console.log('Timer: ' + seconds)
		} else {
			setCommandRender('preparation')
			console.log('Change to preparation')
			setSeconds(10)
		}

	}
	if (commandRender == 'preparation') {
		showscreen = preparation
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000);
			console.log('Timer: ' + seconds)
		} else {
			setCommandRender('livraison')
			console.log('Change to livraison')
			setSeconds(10)
		}

	}
	if (commandRender == 'livraison') {
		showscreen = livraison
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000);
			console.log('Timer: ' + seconds)
		} else {
			setCommandRender('done')
			console.log('Change to done')
			setSeconds(10)
		}
	}
	if (commandRender == 'done') {
		showscreen = done
		if (seconds > 0) {
			setTimeout(() => setSeconds(seconds - 1), 1000);
			console.log('Timer: ' + seconds)
		} else {
			setCommandRender('preparation')
			console.log('Change to done')
			setSeconds(10)
		}
	}

	return (
		<ScrollView >
			<View>
				<TopBar navigation={props.navigation} />
				<View style={{ marginLeft: 15, marginTop: 15 }}>
					<Text
						h3
						style={{ textAlign: 'left', color: '#000000', marginTop: 15 }}
					>
						Etapes:
					</Text>
				</View>
				<View style={{ marginLeft: 30, marginTop: 15 }}>
					{showscreen}
				</View>
			</View>
		</ScrollView>
	)
}
const styles = StyleSheet.create({
	order: {
		width: 350,
		height: 350,
	},
	deliveryman: {
		width: 250,
		height: 250,
	},
	preparation: {
		width: 300,
		height: 300,
	},
	deliverymanwait: {
		width: 250,
		height: 250,
	},
	done: {
		width: 100,
		height: 100,
	},
	waiting: {
		width: 300,
		height: 300,
	}
});
export default Livraison
