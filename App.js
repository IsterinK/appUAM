import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./src/stack/HomeStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoginProvider from "./src/context/LoginProvider";
import MainNavigator from "./src/MainNavigator"

const Tab = createBottomTabNavigator();

export default function App() {
  const [userRegistered, setUserRegistered] = useState(false);
  const handleRegistrationComplete = () =>{
    setUserRegistered(!userRegistered);
  }

  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}

