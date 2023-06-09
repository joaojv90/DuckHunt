import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert, ImageBackground } from 'react-native'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../components/Config';

export default function Login({navigation}) {

    const [mail, setMail] = useState('')
    const [pass, setPass] = useState('')

    function login (){

        const app = initializeApp(firebaseConfig)

        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            navigation.navigate('Juego')
            clean()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === "auth/wrong-password"){
                Alert.alert("Error", "Contraseña Incorrecta")
                clean()
            }if(errorCode === "auth/invalid-email"){
                Alert.alert("Error", "Correo Incorrecto")
                clean()
            }
            console.log(errorCode)
        });
    }

    function clean(){
        setMail("")
        setPass("")
    }

    return (
        <ImageBackground
                source={require('../assets/Stage02.png')}
                style={styles.imageBackground}
            >
            <View style={styles.container}>
                <StatusBar style="auto" />
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Ingrese su correo'
                        keyboardType='email-address'
                        onChangeText={(text) => setMail(text)}
                        value={mail} //colocando este valor se sincronizan los cambios
                    />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Ingrese su contraseña'
                        onChangeText={(contrasena) => setPass(contrasena)}
                        secureTextEntry={true}
                        value={pass} //dentro de las llaves llamamos a la variable con la que se debe
                        //sincronizar
                    />
                </View>
                <Text>{'\n'}</Text>
                <View style={styles.rowBtn}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => login()}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text>{' '}</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('Registro')}>
                        <Text style={styles.buttonText}>REGISTRARSE</Text>
                    </TouchableOpacity>
                </View>
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
    },
    inputContainer: {
        backgroundColor: 'lightgray',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 10,
    },
    rowBtn:{
        flexDirection:'row',
    }
});