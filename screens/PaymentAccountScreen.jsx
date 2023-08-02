import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Alert,
    StyleSheet
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import Footer from '../components/Footer';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const PaymentAccountScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [requestData, setRequestData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getPaymentAccount = async () => {
                setIsLoading(true);

                try {
                    const responseData = await sendRequest(
                        '/api/admin/paymentaccount',
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData.success) {
                        setRequestData(responseData.data);
                    } else {
                        ErrorAlert(responseData?.error?.message)
                    }
                } catch (err) {
                    console.log(err);
                }

                setIsLoading(false);
            };

            getPaymentAccount();
        });
    
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('AdminDashboard');
        setIsLoading(false);
    };

    const updateAlertYesHandler = async () => {
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/admin/paymentaccount',
                'PUT',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'Payment Account',
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
            requestData.accountNumber === '' ||
            requestData.accountType === ''
        ) {
            ErrorAlert('All fields are required.');
            return;
        }

        Alert.alert(
            'Payment Account',
            'Are you sure you want to update payment account?',
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
                            Enter Payment Account Details
                        </Text>
                    </View>
                    <View style={{ marginBottom: Spacing * 3 }}>
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
        marginTop: Spacing * 3
    },
    horizontalSpacer: {
        paddingHorizontal: Spacing * 2,
        marginHorizontal: Spacing * 15
    },
});

export default PaymentAccountScreen;