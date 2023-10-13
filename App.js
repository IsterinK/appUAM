import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Dimensions, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeStack from "./src/stack/HomeStack";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
  const [userRegistered, setUserRegistered] = useState(false);
  const handleRegistrationComplete = () =>{
    setUserRegistered(!userRegistered);
  }


  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="App" component={HomeStack} options={{
          tabBarIcon: () => (
          <MaterialCommunityIcons name="home" color={"black"} size={35} />),
          tabBarLabel: ""
        }}>
          
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

