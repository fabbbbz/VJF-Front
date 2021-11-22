import React from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'

const SkipButton = ({ title, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
        >
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
        borderRadius: 5,
        width: 80,
        margin: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center',
        marginRight: 10,
    },
    text: {
        color: '#FFC901',
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
        textAlign: 'center',
    },
})

export default SkipButton
