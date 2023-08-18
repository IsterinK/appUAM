import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import WelcomeSlide from './src/screens/WelcomeSlide';
import RegisterForm from './src/screens/RegisterForm';
import LoginForm from './src/screens/LoginForm';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name='Welcome' component={WelcomeSlide}></Stack.Screen>
        <Stack.Screen name='Register' component={RegisterForm}></Stack.Screen>
        <Stack.Screen name='Login' component={LoginForm}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
