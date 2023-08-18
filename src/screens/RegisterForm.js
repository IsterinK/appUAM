import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';

const RegisterForm = () => {
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentType, setDocumentType] = useState('Cédula de ciudadanía');
    const [documentNumber, setDocumentNumber] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log("Información del usuario", {userName, lastName, documentType, documentNumber, email});
    };
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Formulario de registro</Text>
        <TextInput style={styles.input} placeholder='Nombre(s)' value={userName} onChangeText={setUserName}/>
        <TextInput style={styles.input} placeholder='Apellido(s)' value={lastName} onChangeText={setLastName} />
        <Picker selectedValue={documentType} onValueChange={(itemSelcted) => setDocumentType(itemSelcted)}>
            <Picker.Item label='Cédula de ciudadanía' value='Cédula de ciudadanía'></Picker.Item>
            <Picker.Item label='Cédula de extranjería' value='Cédula de extranjería'></Picker.Item>
            <Picker.Item label='Pasaporte' value='Pasaporte'></Picker.Item>
        </Picker>
        <TextInput style={styles.input} placeholder='Número de documento' value={documentNumber} onChangeText={setDocumentNumber} keyboardType='numeric' />
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={setEmail} keyboardType='email-address' />
        <Button title='Registrarse' onPress={handleSubmit}></Button>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20
    },

    header:{
        fontSize: 24,
        marginBottom: 20,
        textAlign: "center"
    },

    input:{
        marginBottom:10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 3
    }
})

export default RegisterForm
