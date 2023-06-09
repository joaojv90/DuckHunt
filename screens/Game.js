import { View, Text, Button, StyleSheet, ImageBackground } from 'react-native'
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/Config';
import React from 'react'

export default function Game({navigation}) {

    function out(){

        const app = initializeApp(firebaseConfig)

        const auth = getAuth(app);
        signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
        // An error happened.
        });
    }

    return (
        <ImageBackground
            source={require('../assets/Stage02.png')}
            style={styles.imageBackground}
        >
            <View style={styles.container}>
                <Button 
                    title='Logout'
                    color={'red'}
                    onPress={() => out()}
                />
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
});