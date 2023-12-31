import React from 'react';
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
import SetGoalsScreen from '../screens/SetGoalsScreen';
import ReferralCommissionsScreen from '../screens/ReferralCommissionsScreen';
import FocusedReferralCommissionScreen from '../screens/FocusedReferralCommissionScreen';
import TeamCommissionsScreen from '../screens/TeamCommissionsScreen';
import FocusedTeamCommissionScreen from '../screens/FocusedTeamCommissionScreen';
import InvestmentsScreen from '../screens/InvestmentsScreen';
import FocusedInvestmentScreen from '../screens/FocusedInvestmentScreen';
import WithdrawalsScreen from '../screens/WithdrawalsScreen';
import FocusedWithdrawalScreen from '../screens/FocusedWithdrawalScreen';
import SetMarginsScreen from '../screens/SetMarginsScreen';

const UserReferralCommissionsStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='ReferralCommissions'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="ReferralCommissions"
                component={ReferralCommissionsScreen}
            />
            <Stack.Screen
                name="FocusedReferralCommission"
                component={FocusedReferralCommissionScreen}
            />
        </Stack.Navigator>
    )
};

const UserTeamCommissionsStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='TeamCommissions'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name="TeamCommissions"
                component={TeamCommissionsScreen}
            />
            <Stack.Screen
                name="FocusedTeamCommission"
                component={FocusedTeamCommissionScreen}
            />
        </Stack.Navigator>
    )
};

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

const UserWithdrawalsStack = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator
            initialRouteName='Withdrawals'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name='Withdrawals'
                component={WithdrawalsScreen}
            />
            <Stack.Screen
                name='FocusedWithdrawal'
                component={FocusedWithdrawalScreen}
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
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='SetGoals'
                component={SetGoalsScreen}
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
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='SetMatgins'
                component={SetMarginsScreen}
                options={{
                    headerTitle: 'Set Margins',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Set Margins',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='UserReferralCommissions'
                component={UserReferralCommissionsStack}
                options={{
                    headerTitle: 'Referral Commissions',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Referral Commissions',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='UserTeamCommissions'
                component={UserTeamCommissionsStack}
                options={{
                    headerTitle: 'Team Commissions',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Team Commissions',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='UserInvestments'
                component={UserInvestmentsStack}
                options={{
                    headerTitle: 'Investments',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Investments',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
            <Drawer.Screen
                name='UserWithdrawals'
                component={UserWithdrawalsStack}
                options={{
                    headerTitle: 'Withdrawals',
                    headerTitleStyle: {
                        fontSize: 25,
                        fontFamily: 'poppins-semibold'
                    },
                    headerStyle: { backgroundColor: Colors.primary, },
                    headerTintColor: Colors.onPrimary,
                    headerStatusBarHeight: Spacing * 4,
                    title: 'Withdrawals',
                    drawerActiveTintColor: Colors.onPrimary,
                    drawerActiveBackgroundColor: Colors.primary,
                    drawerInactiveTintColor: Colors.primary,
                    drawerInactiveBackgroundColor: Colors.onPrimary,
                    drawerLabelStyle: {
                        fontSize: FontSize.medium,
                        textAlign: 'center',
                        fontFamily: 'poppins-semibold'
                    }
                }}
            />
        </Drawer.Navigator>
    );
};

export default AdminStack;