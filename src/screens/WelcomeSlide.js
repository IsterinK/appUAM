import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Button, Text, View } from 'react-native'

const WelcomeSlide = () => {
    const navigation = useNavigation();
    const goToRegister = () =>{
        navigation.navigate("Register")
    };
    const goToLogin = () =>{
        navigation.navigate("Login")
    };
  return (
    <View>
        <Text>Slide 1</Text>
        <Button title="Register" onPress={goToRegister}></Button>
        <Button title="Login" onPress={goToRegister}></Button>
    </View>
  )
}

export default WelcomeSlide
