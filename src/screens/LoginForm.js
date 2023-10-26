import React, { useState } from "react";
import {Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [current_password, setcurrent_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://192.168.120.25:3000/api/v1/auth/login",
        {
          email: email,
          current_password: current_password,
        }
      );

      const accessToken = response.data.access;
      await AsyncStorage.setItem("accessToken", accessToken);
      Alert.alert(
        "Inicio de sesión exitoso",
        "¡Bienvenido! Por favor, inicia sesión para continuar."
      );
      navigation.navigate("MainMenu");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      Alert.alert(
        "Error",
        "Nombre de usuario o contraseña incorrectos. Por favor, inténtalo de nuevo."
      );
    }
  };

  const signUp = () =>{
    navigation.navigate("Registro")
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={{uri: "https://icon-library.com/images/user-icon-png-transparent/user-icon-png-transparent-17.jpg"}}
          style={styles.logo}
        />
      </View>
      <TextInput
        value={email}
        onChangeText={(newEmail) => setEmail(newEmail)}
        placeholder={"Nombre de Usuario"}
        style={styles.input}
        autoCapitalize="none"
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          value={current_password}
          onChangeText={(newCurrentPassword) =>
            setcurrent_password(newCurrentPassword)
          }
          placeholder={"Contraseña"}
          secureTextEntry={!showPassword}
          style={styles.passwordInput}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={signUp}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 200, 
    height: 200, 
    resizeMode: "contain", 
  },
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 44,
    padding: 10,
  },
  eyeIcon: {
    padding: 10,
  },
  input: {
    width: "100%",
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#2a7de1",
    width: "100%", 
    height: 44,
    borderRadius: 8,
    alignItems: "center", 
    justifyContent: "center", 
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;