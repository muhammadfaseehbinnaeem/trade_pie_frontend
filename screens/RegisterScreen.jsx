import React, { useState, useEffect }  from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import { useHttpClient } from '../hooks/http-hook';
import ErrorAlert from '../components/ErrorAlert';

const RegisterScreen = ({ navigation }) => {
    const [requestData, setRequestData] = useState({});
    const { error, sendRequest, clearError } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRequestData({
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                accountNumber: '',
                accountType: '',
                referral: ''
            });
        });
    
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('Login');
        setIsLoading(false);
    };

    const submitHandler = async () => {
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/users',
                'POST',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData?.success) {
                return (
                    Alert.alert(
                        'User Profile',
                        'Created successfully.',
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

    const registerHandler = async () => {
        console.log(requestData);
        if (
            requestData.name === '' ||
            requestData.email === '' ||
            requestData.password === '' ||
            requestData.confirmPassword === '' ||
            requestData.accountNumber === '' ||
            requestData.accountType === ''
        ) {
            ErrorAlert('All fields are required.');
            return;
        }

        if (requestData.password !== requestData.confirmPassword) {
            ErrorAlert(`Password and Confirm Password don't match.`);
            return;
        }

        if (requestData.referral === '') {
            Alert.alert(
                'Referral Code',
                'Are you sure you want to sign up without referral code?',
                [
                    {
                        text: 'YES',
                        onPress: () => submitHandler()
                    },
                    {
                        text: 'NO',

                    }
                ],
                { cancelable: false }
            );
        } else {
            submitHandler()
        }
    };
    
    return (
        <SafeAreaView>
            <View
                style={{
                    padding: '5%',
                    marginTop: '5%'
                }}
            >
                {
                    isLoading ?
                    <Loader style={{ paddingTop: 650 }} /> :
                    <ScrollView>
                        <View style={{ alignItems: 'center' }}>
                            <Text
                                style={{
                                    fontSize: FontSize.xLarge,
                                    color: Colors.primary,
                                    fontFamily: 'poppins-bold',
                                    marginVertical: Spacing * 2
                                }}
                            >
                                Create Account
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'poppins-regular',
                                    fontSize: FontSize.small,
                                    maxWidth: '80%',
                                    textAlign: 'center'
                                }}
                            >
                                Create an account so you can earn profit
                            </Text>
                        </View>
                        <View style={{ marginVertical: Spacing * 3 }}>
                            <AppTextInput
                                value={requestData.name}
                                placeholder='Name'
                                maxLength={15}
                                onChangeText={(text) => setRequestData({ ...requestData, name: text })}
                            />
                            <AppTextInput
                                value={requestData.email}
                                placeholder='Email'
                                keyboardType='email-address'
                                onChangeText={(text) => setRequestData({ ...requestData, email: text })}
                            />
                            <AppTextInput
                                value={requestData.password}
                                secureTextEntry
                                placeholder='Password'
                                onChangeText={(text) => setRequestData({ ...requestData, password: text })}
                            />
                            <AppTextInput
                                value={requestData.confirmPassword}
                                secureTextEntry
                                placeholder='Confirm Password'
                                onChangeText={(text) => setRequestData({ ...requestData, confirmPassword: text })}
                            />
                            <AppTextInput
                                value={requestData.accountNumber}
                                placeholder='Account Number e.g. 03001234567'
                                keyboardType='numeric'
                                onChangeText={(text) => setRequestData({ ...requestData, accountNumber: text })}
                            />
                            <AppTextInput
                                value={requestData.accountType}
                                placeholder='Account Type e.g. Jazzcash/Easypaisa'
                                onChangeText={(text) => setRequestData({ ...requestData, accountType: text })}
                            />
                            <AppTextInput
                                value={requestData.referral}
                                placeholder='Referral Code (if you have)'
                                onChangeText={(text) => setRequestData({ ...requestData, referral: text })}
                            />
                        </View>
                        <TouchableOpacity
                            style={{
                                padding: Spacing * 2,
                                backgroundColor: Colors.primary,
                                marginBottom: Spacing * 3,
                                borderRadius: Spacing,
                                shadowColor: Colors.primary,
                                shadowOffset: {
                                    width: 0,
                                    height: Spacing
                                },
                                shadowOpacity: 0.3,
                                shadowRadius: Spacing
                            }}
                            onPress={() => registerHandler()}
                        >
                            <Text
                                style={{
                                    fontFamily: 'poppins-bold',
                                    color: Colors.onPrimary,
                                    textAlign: 'center',
                                    fontSize: FontSize.large
                                }}
                            >
                                Sign up
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ padding: Spacing }}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text
                                style={{
                                    fontFamily: 'poppins-bold',
                                    color: Colors.text,
                                    textAlign: 'center',
                                    fontSize: FontSize.small
                                }}
                            >
                                Already have an account
                            </Text>
                        </TouchableOpacity>
                    </ScrollView>
                }
            </View>
        </SafeAreaView>
    );
};

export default RegisterScreen;