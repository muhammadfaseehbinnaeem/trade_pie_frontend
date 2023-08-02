import React, { useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/http-hook';
import Footer from '../components/Footer';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const ChangePasswordScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    const [requestData, setRequestData] = useState({});
    const [dashboardLink, setDashboardLink] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRequestData({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });

            !userInfo.isAdmin ?
            setDashboardLink('UserDashboard') :
            setDashboardLink('AdminDashboard')
        });
    
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate(dashboardLink);
        setIsLoading(false);
    };

    const changeAlertYesHandler = async () => {
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/users/password',
                'PUT',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'User Password',
                        'Changed successfully.',
                        [{
                            text: 'OK',
                            onPress: () => alertOkHandler()
                        }],
                        { cancelable: false }
                    )
                );
            } else {
                ErrorAlert(responseData?.error?.message);
            }
        } catch (err) {
            console.log(err);
        }

        setIsLoading(false);
    };

    const changeHandler = () => {
        if (
            requestData.oldPassword === '' ||
            requestData.newPassword === '' ||
            requestData.confirmNewPassword === ''
        ) {
            ErrorAlert('All fields are required.');
            return;
        }

        if (
            requestData.newPassword !== requestData.confirmNewPassword) {
            ErrorAlert(`New Password and Confirm New Password don't match.`);
            return;
        }

        if (requestData.oldPassword === requestData.newPassword) {
            ErrorAlert('New Password should be different from Old Password.');
            return;
        }

        Alert.alert(
            'Change Password',
            'Are you sure you want to change your password?',
            [
                {
                    text: 'YES',
                    onPress: () => changeAlertYesHandler()
                },
                { text: 'NO' }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text
                            style={{
                            fontSize: FontSize.xLarge,
                            color: Colors.text,
                            fontFamily: 'poppins-semibold',
                            marginVertical: Spacing * 3
                            }}
                        >
                            Enter Password Details
                        </Text>
                    </View>
                    <View style={{ marginBottom: Spacing * 3 }}>
                        <AppTextInput
                            value={requestData.oldPassword}
                            secureTextEntry
                            placeholder='Old Password'
                            maxLength={15}
                            onChangeText={(text) => setRequestData({ ...requestData, oldPassword: text })}
                        />
                        <AppTextInput
                            value={requestData.newPassword}
                            secureTextEntry
                            placeholder='New Password'
                            onChangeText={(text) => setRequestData({ ...requestData, newPassword: text })}
                        />
                        <AppTextInput
                            value={requestData.confirmNewPassword}
                            secureTextEntry
                            placeholder='Confirm New Password'
                            onChangeText={(text) => setRequestData({ ...requestData, confirmNewPassword: text })}
                        />
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.primary,
                                marginTop: Spacing,
                                marginHorizontal: Spacing * 10,
                                borderRadius: Spacing,
                                shadowColor: Colors.primary,
                                shadowOffset: {
                                    width: 0,
                                    height: Spacing
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: Spacing
                            }}
                            onPress={() => changeHandler()}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Change
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.horizontalSpacer } />
                </ScrollView>
            </View>
            <Footer />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing * 3,
    },
    horizontalSpacer: {
        paddingHorizontal: Spacing * 2,
        marginHorizontal: Spacing * 15
    },
});

export default ChangePasswordScreen;