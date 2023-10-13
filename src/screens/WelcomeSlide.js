import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ImageBackground, StyleSheet, Text, TouchableHighlight, View } from "react-native";
import Swiper from "react-native-swiper";

const WelcomeSlide = () => {
  const navigation = useNavigation();
  const goToRegister = () => {
    navigation.navigate("Registro");
  };
  const goToLogin = () => {
    navigation.navigate("Login");
  };
  const goToApiAxios = () => {
    navigation.navigate("Products");
  };
  const goToMovies = () => {
    navigation.navigate("Movies");
  }
  const goToPokemon = () => {
    navigation.navigate("PokemonAxios")
  }
  const goToPosts = () => {
    navigation.navigate("Posts")
  }

  const Slide1 = () => {
    return (
      <View style={styles.view}>
        <TouchableHighlight style ={styles.button}>
          <Button title="Registrarse" onPress={goToRegister} color="black"/>
        </TouchableHighlight>

        <TouchableHighlight style ={styles.button}>
          <Button title="Iniciar sesión" onPress={goToLogin}color="black"/>
        </TouchableHighlight>

        <TouchableHighlight style ={styles.button}>
          <Button title="Products" onPress={goToApiAxios} color="black"/>
        </TouchableHighlight>

        <TouchableHighlight style ={styles.button}>
          <Button title="Movies" onPress={goToMovies} color="black"/>
        </TouchableHighlight>

        <TouchableHighlight style ={styles.button}>
          <Button title="Pokemon" onPress={goToPokemon} color="black"/>
        </TouchableHighlight>

        <TouchableHighlight style ={styles.button}>
          <Button title="Posts" onPress={goToPosts} color="black"/>
        </TouchableHighlight>

        {/* <ImageBackground
          source={require("./images/digital_artist_male.jpg")}
          style={styles.imgBackground}
        >
        </ImageBackground> */}
      </View>
    );
  };
  /* const Slide2 = () => {
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
<       <Button title="Registrarse" onPress={goToRegister} />
        <Button title="Iniciar sesión" onPress={goToLogin} />
        <Button title="Api Axios" onPress={goToApiAxios} />
        
        </ImageBackground>
      </View>
    );
  }; */

  return (
    <Swiper>
      <Slide1 />
      {/* <Slide2 />
      <Slide3 /> */}
    </Swiper>
  );
};

const styles = StyleSheet.create({
  view:{
    flex:1,
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"white"
  },
  imgBackground: {
    margin:0,
    width: "100%",
    height: "90%",
  },
  button: {
    width:200,
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 50,
    margin:2
  },
});

export default WelcomeSlide;