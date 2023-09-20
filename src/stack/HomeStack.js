import React from 'react'
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeSlide from "../screens/WelcomeSlide";
import RegisterForm from "../screens/RegisterForm";
import LoginForm from "../screens/LoginForm"
import ProductsApiAxios from '../screens/ProductsApiAxios';
import MoviesApiAxios from '../screens/MoviesApiAxios';


const Stack = createStackNavigator();

const HomeStack = () => {
    const [orientation, setOrientation] = useState(null);

    const handleOrientationChange = ({ window: { width, height } }) => {
        const newOrientation = height > width ? "portrait" : "landscape";
        setOrientation(newOrientation);
    };

    useEffect(() => {
        const a = Dimensions.addEventListener("change", handleOrientationChange);
        return () => {
            //Dimensions.removeEventListener("change", handleOrientationChange);
        };
    }, []);

    useEffect(() => {
        console.log("Orientation:", orientation);
    }, [orientation]); // Se ejecutará cuando cambie la orientación

    return (
        <Stack.Navigator
            initialRouteName="Welcome"
            screenOptions={{
                headerStyle:
                orientation === "portrait"
                    ? styles.headerStylePortrait
                    : styles.headerStyleLandscape,
        }}>
            <Stack.Screen
                name="Welcome"
                component={WelcomeSlide}
                options={{ headerShown: false }} // Esto oculta el encabezado
            />
            <Stack.Screen
                name="Registro"
                component={RegisterForm}
                options={{ title: "Registro" }} // Personaliza el título del encabezado
            />
            <Stack.Screen
                name="Login"
                component={LoginForm}
                options={{ title: "Login" }} // Personaliza el título del encabezado
            />
            <Stack.Screen
                name="Products"
                component={ProductsApiAxios}
                options={{ title: "Products" }} // Personaliza el título del encabezado
            />
            <Stack.Screen
                name="Movies"
                component={MoviesApiAxios}
                options={{ title: "Movies" }} // Personaliza el título del encabezado
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStylePortrait: {
        backgroundColor: "#2181CD",
        height: 100,
    },
    headerStyleLandscape: {
        backgroundColor: "#2181CD",
        height: 50,
    },
}); 

export default HomeStack
