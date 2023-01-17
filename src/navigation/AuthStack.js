import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPassword from '../screens/ForgotPassword';
const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
      />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
}
