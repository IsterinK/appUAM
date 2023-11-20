import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Alert, Button, Image, ImageBackground, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import Checkbox from 'expo-checkbox';
import { useNavigation } from "@react-navigation/native";
import ImagePickerExample from '../../components/ImagePickerExample';
import PrivacyPolicies from './PrivacyPolicies';

const RegisterForm = () => {
    const ip = "192.168.0.12";
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [documentType, setDocumentType] = useState('Cédula de ciudadanía');
    const [documentNumber, setDocumentNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleRegister = async () => {
        if(isChecked){
            try {
                const userData = {
                    firstname: userName,
                    lastname: lastName,
                    email: email,
                    current_password: password
                };
    
                const response = await axios.post(`http://mantenimientoandino.co:3000/api/v1/auth/register`, userData);
                navigation.navigate("Login");
                console.log('Respuesta del servidor:', response.data);
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
            }
        }else{
            Alert.alert(
                "Términos y condiciones",
                "Debe aceptar los Términos y condiciones"
            );
        }

    };


    return (
        <ImageBackground
            source={{ uri: "https://w0.peakpx.com/wallpaper/502/610/HD-wallpaper-grungy-texture-fire-grunge-modern-orange-stain-wood-thumbnail.jpg" }}
            style={styles.background}
        >
            <View style={styles.container}>
                <Text style={styles.header}>Registro</Text>
                <TextInput style={styles.input} placeholder='Nombre(s)' value={userName} onChangeText={(text) => setUserName(text)} />
                <TextInput style={styles.input} placeholder='Apellido(s)' value={lastName} onChangeText={(text) => setLastName(text)} />
{/*                 <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={documentType}
                        onValueChange={(itemSelected) => setDocumentType(itemSelected)}
                        style={styles.picker}
                    >
                        <Picker.Item label='Cédula de ciudadanía' value='Cédula de ciudadanía' />
                        <Picker.Item label='Cédula de extranjería' value='Cédula de extranjería' />
                        <Picker.Item label='Pasaporte' value='Pasaporte' />
                    </Picker>
                </View>
                <TextInput style={styles.input} placeholder='Número de documento' value={documentNumber} onChangeText={(text) => setDocumentNumber(text)} keyboardType='numeric' /> */}
                <TextInput style={styles.input} placeholder='Email' value={email} onChangeText={(text) => setEmail(text)} keyboardType='email-address' />
                <TextInput style={styles.input} placeholder='Contrasena' value={password} secureTextEntry={true} onChangeText={(text) => setPassword(text)} />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin:10}}>
                    <Checkbox value={isChecked} onValueChange={handleCheckboxChange} />
                    <Text> He leído y acepto la </Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <Text style={{ color: "white", textDecorationLine: 'underline' }}>política de privacidad</Text>
                    </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                  <Text style={styles.buttonText}>Registrarse</Text>
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'flex-end', backgroundColor: 'lightgray', justifyContent: "space-between"}}>
                    <View style={{ flexDirection: 'row'}}>
                        {/* <TouchableOpacity onPress={handleGoBack}>
                            <AntDesign name="arrowleft" size={30} color="black" />
                        </TouchableOpacity> */}
                    </View>
                </View>

                <ScrollView contentContainerStyle>
                    <PrivacyPolicies />
                </ScrollView>
            </Modal>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        
    },
    container: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        backgroundColor: "rgba(100, 50, 100, 0.3)"
    },
    header: {
        fontSize: 50,
        marginBottom: 30,
        textAlign: "center",
        color:"#FAFAFA",
        
    },
    input: {
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 3,
        borderColor: "#ccc",
        borderRadius: 10
    },
    button: {
      backgroundColor: "#EFEDE6",
      width: "100%",
      height: 44,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 20,
      marginTop:10
    },
    buttonText: {
      color: "#000000",
      fontSize: 16,
      fontWeight: "bold",
    },
    pickerContainer: {
      marginBottom: 10,
      borderRadius:10,
      borderWidth:3,
      borderColor:"#ccc",
      backgroundColor:"#ccc"
    },
    picker: {
      backgroundColor:"#ccc",
      height: 55,
      width: '100%',
      color: "#000000",
    },
})

export default RegisterForm;
