import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert } from 'react-native'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue, remove } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { db, firebaseConfig } from '../components/Config';
import React, { useEffect, useState } from 'react'

export default function Register({navigation}) {

    const [mail, setMail] = useState('')
    const [pass, setPass] = useState('')
    const [nick, setNick] = useState('')
    const [age, setAge] = useState('')

    const [datos, setDatos] = useState([])

    function record () {

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);

        createUserWithEmailAndPassword(auth, mail, pass)
        .then((userCredential) => {
            const user = userCredential.user;
            Alert.alert("Mensaje", "Usuario registrado con exito")
            writeUserData(mail, nick, age)
            navigation.navigate('Juego')
            clean()
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if(errorCode === 'auth/email-already-in-use'){
                Alert.alert("Error", "El mail ingresado ya está en uso")
            }if(errorCode === 'auth/missing-password'){
                Alert.alert("Error", "Contraseña no ingresada")
            }
            Alert.alert("Error")
            console.log(errorCode)
            console.log(errorMessage)
        });
    }

    function writeUserData(mail, nick, age) {
        set(ref(db, 'players/' + nick), {
            email: mail,
            nickName: nick,
            age: age
        });
    }

    function readData(){
        const startCountRef = ref(db, 'players/');
        onValue(startCountRef, (snapshot)=> {
            const data = snapshot.val();
            setDatos(data)
            const dataArray = Object.entries(data).map(([key, value])=>({
                key, ...value,
            }));
            setDatos(dataArray)
        })
    }

    function del(id){
        remove(ref(db, 'players/'+ id))
    }

    function clean(){
        setMail("")
        setPass("")
        setNick("")
    }

    return (
        <ImageBackground
            source={require('../assets/Stage02.png')}
            style={styles.imageBackground}
        >
            <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Ingrese un correo'
                            keyboardType='email-address'
                            onChangeText={(text) => setMail(text)}
                            value={mail}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Ingrese un Nickname'
                            onChangeText={(text) => setNick(text)}
                            value={nick}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Ingrese su Edad'
                            onChangeText={(text) => setAge(text)}
                            keyboardType='numeric'
                            value={age}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput
                            placeholder='Ingrese su contraseña'
                            onChangeText={(text) => setPass(text)}
                            secureTextEntry={true}
                            value={pass}
                        />
                    </View>
                <Text>{'\n'}</Text>
                <View style={styles.rowBtn}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => record()}>
                        <Text style={styles.buttonText}>REGISTRAR</Text>
                    </TouchableOpacity>
                    <Text>{' '}</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={() => readData()}>
                        <Text style={styles.buttonText}>ACTUALIZAR</Text>
                    </TouchableOpacity>
                    <Text>{' '}</Text>
                    <TouchableOpacity style={styles.button}
                        onPress={() => del(nick)}>
                        <Text style={styles.buttonText}>ELIMINAR</Text>
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
})