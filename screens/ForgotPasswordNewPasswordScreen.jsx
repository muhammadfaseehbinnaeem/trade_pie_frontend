import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { useRoute } from "@react-navigation/native";

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const ForgotPasswordNewPasswordScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [requestData, setRequestData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();
    const userEmail = useRoute().params?.email;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRequestData({
                email: userEmail,
                password: '',
                confirmPassword: ''
            });
        });
    
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('Login');
        setIsLoading(false);
    };
    
    const saveHandler = async () => {
        if (requestData.password === '' || requestData.confirmPassword === '') {
            ErrorAlert('All fields are required.');
            return;
        }

        if (
            requestData.password !== requestData.confirmPassword) {
            ErrorAlert(`Password and Confirm Password don't match.`);
            return;
        }

        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/users/forgotpassword',
                'PUT',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'User Password',
                        'Reset successfully.',
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
                            Enter New Password
                        </Text>
                    </View>
                    <View style={{ marginBottom: Spacing * 5 }}>
                        <AppTextInput
                            secureTextEntry
                            placeholder='Password'
                            onChangeText={(text) => setRequestData({ ...requestData, password: text })}
                        />
                        <AppTextInput
                            secureTextEntry
                            placeholder='Confirm Password'
                            onChangeText={(text) => setRequestData({ ...requestData, confirmPassword: text })}
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
                            onPress={() => saveHandler()}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Reset
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default ForgotPasswordNewPasswordScreen;