import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordEmailVerifyScreen from '../screens/ForgotPasswordEmailVerifyScreen';
import ForgotPasswordNewPasswordScreen from '../screens/ForgotPasswordNewPasswordScreen';

const HomeStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen name='Welcome' component={WelcomeScreen} options={{headerShown: false}} />
            <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
            <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} />
            <Stack.Screen name='ForgotPasswordEmailVerify' component={ForgotPasswordEmailVerifyScreen} options={{headerShown: false}} />
            <Stack.Screen name='ForgotPasswordNewPassword' component={ForgotPasswordNewPasswordScreen} options={{headerShown: false}} />
        </Stack.Navigator>
    );
};

export default HomeStack;
