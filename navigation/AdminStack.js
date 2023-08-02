import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import { useCustomFonts } from '../constants/Font';
import LogoutButton from '../components/LogoutButton';
import Loader from '../components/Loader';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';
import PaymentAccountScreen from '../screens/PaymentAccountScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import FocusedInvestmentScreen from '../screens/FocusedInvestmentScreen';
import SetGoalScreen from '../screens/SetGoalsScreen';

const UserInvestmentsStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Investments'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name='Investments'
                component={InvestmentsScreen}
            />
            <Stack.Screen
                name='FocusedInvestment'
                component={FocusedInvestmentScreen}
            />
        </Stack.Navigator>
    );
};

const AdminStack = () => {
    const Drawer = createDrawerNavigator();
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <Drawer.Navigator initialRouteName='AdminDashboard' drawerContent={LogoutButton}>
            <Drawer.Screen
                name='AdminDashboard'
                component={AdminDashboardScreen}
                options={{
                    headerTitle: 'Admin Dashboard',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Admin Dashboard',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='PaymentAccount'
                component={PaymentAccountScreen}
                options={{
                    headerTitle: 'Payment Account',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Payment Account',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='ChangePassword'
                component={ChangePasswordScreen}
                options={{
                    headerTitle: 'Change Password',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Change Password',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='UserInvestments'
                component={UserInvestmentsStack}
                options={{
                    headerTitle: 'Manage Investments',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Manage Investments',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='SetGoals'
                component={SetGoalScreen}
                options={{
                    headerTitle: 'Set Goals',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Set Goals',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
        </Drawer.Navigator>
    );
};

export default AdminStack;