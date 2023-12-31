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
  const goToService = () => {
    navigation.navigate("Service")
  }

  const goToCategories = () => {
    navigation.navigate("Categories")
  }

  const Slide1 = () => {
    return (
      <View style={styles.view}>
        <TouchableHighlight style ={styles.button}>
          <Button title="Posts" onPress={goToPosts} color="black"/>
        </TouchableHighlight>
        <TouchableHighlight style ={styles.button}>
          <Button title="Categories" onPress={goToCategories} color="black"/>
        </TouchableHighlight>

        <TouchableHighlight style ={styles.button}>
          <Button title="Services" onPress={goToService} color="black"/>
        </TouchableHighlight>

      </View>
    );
  };

  return (
    <Swiper>
      <Slide1 />
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