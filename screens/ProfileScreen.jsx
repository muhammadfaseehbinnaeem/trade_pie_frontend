import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';
import Footer from '../components/Footer';

const ProfileScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [requestData, setRequestData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUserProfile = async () => {
                setIsLoading(true);

                try {
                    const responseData = await sendRequest(
                        '/api/users/profile',
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData.success) {
                        setRequestData(responseData.data);

                    } else {
                        ErrorAlert(responseData?.error?.message);
                    }
                } catch (err) {
                    console.log(err);
                }

                setIsLoading(false);
            };

            getUserProfile();
        });
    
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('UserDashboard');
        setIsLoading(false);
    };

    const updateAlertYesHandler = async () => {
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/users/profile',
                'PUT',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                let updatedUserInfo = responseData.data;
                
                AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));

                return (
                    Alert.alert(
                        'User Profile',
                        'Updated successfully.',
                        [{
                            text: 'OK',
                            onPress: () => alertOkHandler()
                        }],
                        {cancelable: false}
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

    const updateHandler = () => {
        if (
            requestData.name === '' ||
            requestData.accountNumber === '' ||
            requestData.accountType === ''
        ) {
            ErrorAlert('All fields are required.');
            return;
        }

        Alert.alert(
            'Update Profile',
            'Are you sure you want to update your profile?',
            [
                {
                    text: 'YES',
                    onPress: () => updateAlertYesHandler()
                },
                { text: 'NO' }
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.container} >
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
                            Enter Profile Details
                        </Text>
                    </View>
                    <View style={{ marginBottom: Spacing * 3 }}>
                        <AppTextInput
                            value={requestData?.name}
                            placeholder='Name'
                            maxLength={15}
                            onChangeText={(text) => setRequestData({ ...requestData, name: text })}
                        />
                        <AppTextInput
                            value={requestData?.accountNumber}
                            placeholder='Account Number e.g. 03001234567'
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, accountNumber: text })}
                        />
                        <AppTextInput
                            value={requestData?.accountType}
                            placeholder='Account Type e.g. Jazzcash/Easypaisa'
                            onChangeText={(text) => setRequestData({ ...requestData, accountType: text })}
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
                            onPress={() => updateHandler()}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                    >
                                Update
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

export default ProfileScreen;