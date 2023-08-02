import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const LogoutButton = (props) => {
    const { logout } = useContext(AuthContext);
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return <Loader />;
    }

    const logoutHandler = () => {
        logout();
    }

    const signOutHandler = () => {
        Alert.alert(
            'Log Out',
            'Are you sure you want to log out of your account?',
            [
                {
                    text: 'YES',
                    onPress: () => logoutHandler()
                },
                { text: 'NO' }
            ],
            { cancelable: false }
        );
    };
  
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    marginTop: '30%',
                }}
            >
                <View
                    style={{
                        // marginTop: '100%',
                        padding: Spacing,

                    }}
                >
                    <TouchableOpacity
                        style={{
                            paddingVertical: Spacing * 2
                        }}
                        onPress={signOutHandler}
                    >
                        <Text
                            style={{
                                backgroundColor: Colors.primary,
                                color: Colors.onPrimary,
                                fontFamily: 'poppins-semibold',
                                fontSize: FontSize.large,
                                paddingVertical: Spacing,
                                marginHorizontal: Spacing * 5,
                                borderRadius: Spacing,
                                textAlign: 'center',
                            }}
                        >
                            Sign Out
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>
    );
};

export default LogoutButton;