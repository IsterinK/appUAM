import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { useLogin } from './context/LoginProvider';
import { useNavigation } from "@react-navigation/native";

//Screens
import { MoviesApiAxios, PokemonApiAxios, Posts } from "./screens/Functions/index"
import { LoginForm, RegisterForm, PrivacyPolicies , Settings} from './screens/Auth/index';
import { UsersManagement } from './screens/Admin/index'

//Icons
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 60,
        background: "#fff"
    }

}

const AuthStack = (orientation) => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
                headerStyle:
                orientation === "portrait"
                    ? styles.headerStylePortrait
                    : styles.headerStyleLandscape,
            }}
        >
            <Stack.Screen
                name="Login"
                component={LoginForm}
                options={{ title: "Login" }} 
            />

            <Stack.Screen
                name="Registro"
                component={RegisterForm}
                options={{ title: "Registro" }} 
            />
        </Stack.Navigator>
    );
};
  
const MainTabs = () => {
    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name="Posts" component={Posts}  
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{alignItems:'center', justifyContent: 'center'}}>
                                <FontAwesome name="newspaper-o" size={24} color={focused ? "black" : "#d58635"} />
                            </View>
                        )
                    }
                }}
            />

            <Tab.Screen 
                name="Movies" component={MoviesApiAxios} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{alignItems:'center', justifyContent: 'center'}}>
                                <MaterialCommunityIcons name="movie-open-outline" size={24} color={focused ? "black" : "#d58635"} />
                            </View>
                        )
                    }
                }}
            />

            <Tab.Screen 
                name="Pokemon" component={PokemonApiAxios} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{alignItems:'center', justifyContent: 'center'}}>
                                <MaterialCommunityIcons name="pokemon-go" size={28} color={focused ? "black" : "#d58635"} />
                            </View>
                        )
                    }
                }}
            />   

            <Tab.Screen 
                name="Settings" component={Settings} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{alignItems:'center', justifyContent: 'center'}}>
                                <Ionicons name="settings-outline" size={24} color={focused ? "black" : "#d58635"} />
                            </View>
                        )
                    }
                }}
            />       

            <Tab.Screen 
                name="userManagement" 
                component={UsersManagement} 
                options={{ tabBarButton: () => null }} 
            />
        </Tab.Navigator>
    );
};

const HomeStack = () => {
    const navigation = useNavigation();
    const [orientation, setOrientation] = useState(null);
    const { isLoggedIn } = useLogin();

    const handleOrientationChange = ({ window: { width, height } }) => {
        const newOrientation = height > width ? "portrait" : "landscape";
        setOrientation(newOrientation);
    };

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate("Posts");
        }
        const a = Dimensions.addEventListener("change", handleOrientationChange);
            return () => {
        };
    }, [isLoggedIn]);

    if(isLoggedIn){
        return (
            <MainTabs></MainTabs>
        );
    }else{
        return (
            <AuthStack></AuthStack>
        );
    }
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
