import React from 'react'
import { useEffect, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import WelcomeSlide from "./screens/WelcomeSlide";
import RegisterForm from "./screens/RegisterForm";
import LoginForm from "./screens/LoginForm"
import ProductsApiAxios from './screens/ProductsApiAxios';
import MoviesApiAxios from './screens/MoviesApiAxios';
import PokemonApiAxios from './screens/PokemonApiAxios';
import Category from './screens/Category';
import { Posts } from './components/Posts';
import {Service} from './screens/Service';

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
        };
    }, []);

    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                headerStyle:
                orientation === "portrait"
                    ? styles.headerStylePortrait
                    : styles.headerStyleLandscape,
        }}>
            <Stack.Screen
                name="Welcome"
                component={WelcomeSlide}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Registro"
                component={RegisterForm}
                options={{ title: "Registro" }} 
            />
            <Stack.Screen
                name="Login"
                component={LoginForm}
                options={{ title: "Login" }} 
            />
            <Stack.Screen
                name="Products"
                component={ProductsApiAxios}
                options={{ title: "Products" }} 
            />
            <Stack.Screen
                name="Movies"
                component={MoviesApiAxios}
                options={{ title: "Movies" }} 
            />
            <Stack.Screen
                name="PokemonAxios"
                component={PokemonApiAxios}
                options={{ title: "PokemonAxios" }} 
            />
            <Stack.Screen
                name="Posts"
                component={Posts}
                options={{ title: "Posts" }} 
            />
            <Stack.Screen
                name="Service"
                component={Service}
                options={{ title: "Service" }} 
            />
            <Stack.Screen
                name="Categories"
                component={Category}
                options={{ title: "Categories" }} 
            />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({
    headerStylePortrait: {
        backgroundColor: 'rgba(0, 0, 0, 0)', 
        height: 200,
    },
    headerStyleLandscape: {
        backgroundColor: 'rgba(0, 0, 0, 0)', 
        height: 200,
    },
}); 

export default HomeStack
