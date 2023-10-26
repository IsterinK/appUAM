import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import axios from 'axios';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native";

const RegisterForm = () => {
    const ip = "192.168.1.12";
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentType, setDocumentType] = useState('Cédula de ciudadanía');
    const [documentNumber, setDocumentNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
    
    const handleRegister = async () => {
        try {
          const userData = {
            name: userName,
            lastname: lastName,
            documentType: documentType,
            identification: documentNumber,
            email: email,
            password: password
          };
      
          const response = await axios.post(`http://${ip}:3000/api/v1/users/signup`, userData)
          navigation.navigate("Login");
          console.log('Respuesta del servidor:', response.data);
        } catch (error) {
          console.error('Error al registrar el usuario:', error);
        }
      };

  return (
    <View style={styles.container}>
        <Text style={styles.header}>Formulario de registro</Text>
        <TextInput style={styles.input} placeholder='Nombre(s)' value={userName} onChangeText={(text) => setUserName(text)}/>
        <TextInput style={styles.input} placeholder='Apellido(s)' value={lastName} onChangeText={(text) => setLastName(text)}/> 
        <Picker selectedValue={documentType} onValueChange={(itemSelcted) => setDocumentType(itemSelcted)}>
            <Picker.Item label='Cédula de ciudadanía' value='Cédula de ciudadanía'></Picker.Item>
            <Picker.Item label='Cédula de extranjería' value='Cédula de extranjería'></Picker.Item>
            <Picker.Item label='Pasaporte' value='Pasaporte'></Picker.Item>
        </Picker>
        <TextInput style={styles.input} placeholder='Número de documento' value={documentNumber} onChangeText={(text) => setDocumentNumber(text)} keyboardType='numeric' />
        <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} keyboardType='email-address' />
        <TextInput style={styles.input} placeholder='Contrasena' value={password} onChangeText={(text) => setPassword(text)} />
        <Button title='Registrarse' onPress={handleRegister}></Button>
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

export default RegisterForm;
