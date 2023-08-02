import React, { useState, useContext, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { AuthContext } from '../context/AuthContext';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';

const LoginScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [requestData, setRequestData] = useState({});
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRequestData({ email: '', password: '' });
        });
    
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <SafeAreaView>
            <View
                style={{
                    padding: '5%',
                    marginTop: '10%'
                }}
            >
                <ScrollView>
                    <View style={{ alignItems: 'center' }}>
                        <Text
                            style={{
                            fontSize: FontSize.xLarge,
                            color: Colors.primary,
                            fontFamily: 'poppins-bold',
                            marginVertical: Spacing * 3
                            }}
                        >
                            Login here
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'poppins-semibold',
                                fontSize: FontSize.large,
                                maxWidth: '60%',
                                textAlign: 'center'
                            }}
                        >
                            Welcome back, you've been missed!
                        </Text>
                    </View>
                    <View style={{ marginVertical: Spacing * 3 }}>
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
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordEmailVerify')}>
                            <Text
                                style={{
                                    fontFamily: 'poppins-semibold',
                                    fontSize: FontSize.small,
                                    color: Colors.primary,
                                    alignSelf: 'flex-end'
                                }}
                            >
                                Forgot your password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            padding: Spacing * 2,
                            backgroundColor: Colors.primary,
                            marginVertical: Spacing * 3,
                            borderRadius: Spacing,
                            shadowColor: Colors.primary,
                            shadowOffset: {
                            width: 0,
                            height: Spacing
                            },
                            shadowOpacity: 0.3,
                            shadowRadius: Spacing
                        }}
                        onPress={() => login(requestData)}
                    >
                    <Text
                        style={{
                        fontFamily: 'poppins-bold',
                        color: Colors.onPrimary,
                        textAlign: 'center',
                        fontSize: FontSize.large
                        }}
                    >
                        Sign in
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={{ padding: Spacing }}
                    onPress={() => navigation.navigate('Register')}
                    >
                    <Text
                        style={{
                        fontFamily: 'poppins-semibold',
                        color: Colors.text,
                        textAlign: 'center',
                        fontSize: FontSize.small
                        }}
                    >
                        Create new account
                    </Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;