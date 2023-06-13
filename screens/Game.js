import { ImageBackground, View, Text, TouchableOpacity, Button, Image, StyleSheet, Dimensions } from 'react-native';
import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/Config';
import React, { useState, useEffect } from 'react'

export default function Game({navigation}) {

    const [score, setScore] = useState(0);
    const [duckPosition, setDuckPosition] = useState({ x: 0, y: 0 });
    const [isDuckPressed, setIsDuckPressed] = useState(false);
    const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
    const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

    //cuanta regresiva
    const seconds = 30;

    const [time, setTime] = useState(seconds);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(prevTime => prevTime - 1);
            }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [])

    useEffect(() => {
        if (time === 0) {
            setTime(seconds);
            navigation.navigate('Game Over')
        }
    }, [time]);

    useEffect(() => {
        const updateScreenDimensions = () => {
        setScreenWidth(Dimensions.get('window').width);
        setScreenHeight(Dimensions.get('window').height);
        };

        Dimensions.addEventListener('change', updateScreenDimensions);

        return () => {
            Dimensions.removeEventListener('change', updateScreenDimensions);
        };
        }, []);
    
    function handleImagePress () {
        setScore(score + 10);
        setDuckPosition({
          x: Math.random() * (screenWidth - 200),
          y: Math.random() * (screenHeight - 200),
        });
        setIsDuckPressed(true);
        setTimeout(() => {
        setIsDuckPressed(false);
        }, 300);
    };

    function out(){
        const app = initializeApp(firebaseConfig)
        const auth = getAuth(app);
        signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
        });
    }

    return (
        <ImageBackground
        source={require('../assets/Stage02.png')}
        style={styles.imageBackground}
        >
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.score}>Score: {score}</Text>
                <Text>{'                       '}</Text>
                <Text style={styles.score}>00:{time}</Text>
                <View style={styles.buttonContainer}>
                    <Button 
                    title='Logout'
                    color={'red'}
                    onPress={() => out()}
                    />
                </View>
            </View>
            <View style={styles.gameContainer}>
                <TouchableOpacity 
                    style={[styles.duckContainer, { top: duckPosition.y, left: duckPosition.x }]}
                    onPress={handleImagePress}
                >
                {isDuckPressed ? (
                    <Image 
                    source={require('../assets/duck_clicked.png')} 
                    style={[styles.image, { width: 50, height: 50 }]}
                />) : (
                <Image 
                    source={require('../assets/duck.png')} 
                    style={[styles.image, { width: 50, height: 50 }]}
                />
                )}
                </TouchableOpacity>
            </View>
        </View>
    </ImageBackground>
);
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
        justifyContent: 'flex-start',
        paddingTop: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        width: '100%',
        zIndex: 2,
    },
    score: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainer: {
        marginLeft: 'auto',
    },
    gameContainer: {
        position: 'relative',
        width: '100%',
        height: Dimensions
    },
});