import { View, Text, StyleSheet, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/Config';
import { getAuth, signOut } from "firebase/auth";
import React from 'react'
import { useFonts } from 'expo-font';

export default function GameOver({navigation}) {

    function out(){
        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app);
        signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
        });
    }

    //Importar fonts
    const [fontsLoaded] = useFonts({
        'pixel': require('../assets/fonts/pixel.ttf'),
    });

    if(!fontsLoaded){
        return null;
    }

    return (
        <ImageBackground
        source={require('../assets/Stage02.png')}
        style={styles.imageBackground}
        >
            <StatusBar style="auto" />
            <View style={styles.container}>
                <Image source={require("../assets/title.png")}
                    style={styles.img}
                />
                <View>
                    <Text style={styles.txt}>GAME</Text>
                    <Text style={styles.txt}>OVER</Text>
                </View>
                <Text>{'\n'}</Text>
                <View>
                    <Text style={styles.txtScore}>Su puntaje es:</Text>
                    <Text style={styles.txtScore}></Text>
                </View>
                <TouchableOpacity style={styles.button}
                    onPress={()=>out()}
                >
                    <Text style={styles.buttonText}>EXIT</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt:{
        fontSize: 50,
        fontWeight:'bold',
        fontFamily:'pixel',
    },
    txtScore:{
        fontSize: 20,
        fontWeight:'bold',
        fontFamily:'pixel',
    },
    img:{
        width:'100%',
        height:'8%'
    },
    button: {
        backgroundColor: '#BA4A00',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily:'pixel',
    },
})