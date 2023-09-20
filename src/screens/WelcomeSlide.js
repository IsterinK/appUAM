import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ImageBackground, StyleSheet, Text, View } from "react-native";
import Swiper from "react-native-swiper";

const WelcomeSlide = () => {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate("Registro");
  };
  const goToLogin = () => {
    navigation.navigate("Login");
  };
<<<<<<< HEAD
  const goToProducts = () =>{
    navigation.navigate("Products");
  }
=======
  const goToApiAxios = () => {
    navigation.navigate("ApiAxios");
  };
>>>>>>> 422e8703fd00bce7ed15bb04f7ba5b8ac053f3ee

  const Slide1 = () => {
    return (
      <View>
        <ImageBackground
          source={require("./images/digital_artist_male.jpg")}
          style={styles.imgBackground}
        >
          <Button title="Registrarse" onPress={goToRegister} />
          <Button title="Iniciar sesión" onPress={goToLogin} />
          <Button title="Products" onPress={goToProducts} />
        </ImageBackground>
      </View>
    );
  };
  const Slide2 = () => {
    return (
      <View>
        <ImageBackground
          source={require("./images/digital_2.jpg")}
          style={styles.imgBackground}
        ></ImageBackground>
      </View>
    );
  };
  const Slide3 = () => {
    return (
      <View>
        <ImageBackground
          source={require("./images/digital_3.jpg")}
          style={styles.imgBackground}
        >
<<<<<<< HEAD
=======
          <Button title="Registrarse" onPress={goToRegister} />
          <Button title="Iniciar sesión" onPress={goToLogin} />
          <Button title="Api Axios" onPress={goToApiAxios} />
>>>>>>> 422e8703fd00bce7ed15bb04f7ba5b8ac053f3ee
        </ImageBackground>
      </View>
    );
  };

  return (
    <Swiper>
      <Slide1 />
      <Slide2 />
      <Slide3 />
    </Swiper>
  );
};

const styles = StyleSheet.create({
  imgBackground: {
    width: "100%",
    height: "90%",
  },
});

export default WelcomeSlide;