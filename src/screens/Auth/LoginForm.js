import React, { useState } from "react";
import { Alert, Button, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLogin } from '../../context/LoginProvider';

const ip = "192.168.0.12:3000";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [current_password, setcurrent_password] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { isLoggedIn, setIsLoggedIn, profile, setProfile } = useLogin();
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `http://${ip}/api/v1/users/login`,
        {
          email: email,
          password: current_password,
        }
      );

      const accessToken = response.data.access;
      await AsyncStorage.setItem("accessToken", accessToken);
      Alert.alert(
        "Inicio de sesión exitoso",
        "¡Bienvenido! Por favor, inicia sesión para continuar."
      );
      setIsLoggedIn(true)
      /* navigation.navigate("Welcome"); */
    }catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        Alert.alert("Inicio de sesión incorrecto", errorMessage);
      } else {
        Alert.alert(
          "Inicio de sesión incorrecto",
          "Ha ocurrido un error. Por favor, inténtalo de nuevo."
        );
      }
    }
  };

  const signUp = () => {
    navigation.navigate("Registro");
  };

  return (
    <ImageBackground
      source={{ uri: "https://w0.peakpx.com/wallpaper/502/610/HD-wallpaper-grungy-texture-fire-grunge-modern-orange-stain-wood-thumbnail.jpg" }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: "https://i.pinimg.com/originals/96/ea/53/96ea53d9e053e9ea2404b71396dabf95.png" }}
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(100, 50, 100, 0.3)",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  
  passwordInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 3,
    borderRadius: 8,
  },
  passwordInput: {
    flex: 1,
    height: 44,
    padding: 10,
  },
  input: {
    width: "100%",
    height: 55,
    padding: 10,
    borderWidth: 3,
    borderColor: "#ccc",
    marginBottom: 20,
    borderRadius: 8,
  },
  button: {
    backgroundColor: "#EFEDE6",
    width: "100%",
    height: 44,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Login;
