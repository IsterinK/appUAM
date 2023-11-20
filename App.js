import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import LoginProvider from "./src/context/LoginProvider";
import MainNavigator from "./src/MainNavigator"
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <LoginProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </LoginProvider>
  );
}

