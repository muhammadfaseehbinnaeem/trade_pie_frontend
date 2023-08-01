import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import { useCustomFonts } from '../constants/Font';
import LogoutButton from '../components/LogoutButton';
import Loader from '../components/Loader';
import UserDashboardScreen from '../screens/UserDashboardScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import InvestMoneyScreen from '../screens/InvestMoneyScreen';
import MyInvestmentsScreen from '../screens/MyInvestmentsScreen';
import FocusedInvestmentScreen from '../screens/FocusedInvestmentScreen';

const UserInvestmentStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='MyInvestments'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="MyInvestments"
                component={MyInvestmentsScreen}
            />
            <Stack.Screen
                name="FocusedInvestment"
                component={FocusedInvestmentScreen}
            />
        </Stack.Navigator>
    );
};

const UserStack = () => {
    const Drawer = createDrawerNavigator();
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <Drawer.Navigator initialRouteName='Profile' drawerContent={LogoutButton}>
            <Drawer.Screen
                name='UserDashboard'
                component={UserDashboardScreen}
                options={{
                    headerTitle: 'Dashboard',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Dashboard',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.large,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='Profile'
                component={ProfileScreen}
                options={{
                    headerTitle: 'Profile',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Profile',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.large,
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
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Change Password',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.large,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='UserInvestment'
                component={UserInvestmentStack}
                options={{
                    headerTitle: 'My Investments',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold',
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'My Investments',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.large,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='InvestMoney'
                component={InvestMoneyScreen}
                options={{
                    headerTitle: 'Invest Money',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold',
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Invest Money',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.large,
                        paddingVertical: Spacing,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
        </Drawer.Navigator>
    );
};

export default UserStack;