import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const ForgotPasswordEmailVerifyScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [requestData, setRequestData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRequestData({ email: '' });
        });
        
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const verifyEmailHandler = async () => {
        if (requestData?.email === '') {
            ErrorAlert('Email is required.');
            return;
        }

        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/users/verifyemail',
                'POST',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                navigation.navigate('ForgotPasswordNewPassword', responseData?.data);
            } else {
                ErrorAlert(responseData?.error?.message);
            }
        } catch (err) {
            console.log(err);
        }

        setIsLoading(false);
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    padding: '5%',
                    marginVertical: Spacing * 6
                }}
            >
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
                            Verify Email Address
                        </Text>
                    </View>
                    <View style={{ marginBottom: Spacing * 5 }}>
                        <AppTextInput
                            placeholder='Email'
                            keyboardType='email-address'
                            onChangeText={(text) => setRequestData({ ...requestData, email: text })}
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
                            onPress={() => verifyEmailHandler()}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                    >
                                Verify
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordEmailVerifyScreen;