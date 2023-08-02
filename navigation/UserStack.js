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
import MyReferralCommissionsScreen from '../screens/MyReferralCommissionsScreen';
import FocusedReferralCommissionScreen from '../screens/FocusedReferralCommissionScreen';
import MyTeamCommissionsScreen from '../screens/MyTeamCommissionsScreen';
import FocusedTeamCommissionScreen from '../screens/FocusedTeamCommissionScreen';

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

const UserReferralCommissionStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='MyReferralCommissions'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="MyReferralCommissions"
                component={MyReferralCommissionsScreen}
            />
            <Stack.Screen
                name="FocusedReferralCommission"
                component={FocusedReferralCommissionScreen}
            />
        </Stack.Navigator>
    )
}

const UserTeamCommissionStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='MyTeamCommissions'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="MyTeamCommissions"
                component={MyTeamCommissionsScreen}
            />
            <Stack.Screen
                name="FocusedTeamCommission"
                component={FocusedTeamCommissionScreen}
            />
        </Stack.Navigator>
    )
}

const UserStack = () => {
    const Drawer = createDrawerNavigator();
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <Drawer.Navigator initialRouteName='UserDashboard' drawerContent={LogoutButton}>
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
                        fontSize: FontSize.medium,
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
                    headerStyle: { backgroundColor: Colors.primary, },
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
                name='UserReferralCommission'
                component={UserReferralCommissionStack}
                options={{
                    headerTitle: 'My Referral Commissions',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold',
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'My Referral Commissions',
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
                name='UserTeamCommission'
                component={UserTeamCommissionStack}
                options={{
                    headerTitle: 'My Team Commissions',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold',
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'My Team Commissions',
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
                        fontSize: FontSize.medium,
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

export default UserStack;