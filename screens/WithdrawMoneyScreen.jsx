import React, { useState, useEffect } from 'react';
import {
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
import Currency from '../constants/Currency';
import { useHttpClient } from '../hooks/http-hook';
import Footer from '../components/Footer';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const WithdrawMoneyScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [wallet, setWallet] = useState(0);
    const [requestData, setRequestData] = useState({});
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUserWallet = async () => {
                setIsLoading(true);
                
                try {
                    const responseData = await sendRequest(
                        '/api/users/wallet',
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData.success) {
                        setWallet(responseData?.data?.wallet);
                    } else {
                        ErrorAlert(responseData?.error?.message)
                    }
                } catch (err) {
                    console.log(err);
                }
                
                setRequestData({ amount: 0 });
                setIsLoading(false);
            };
            
            getUserWallet();
        });
        
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const withdrawalAlertOkHandler = () => {
        navigation.navigate('UserDashboard');
        setIsLoading(false);
    };

    const requestHandler = async () => {
        if (Number(requestData.amount) === 0) {
            return ErrorAlert('Amount is required.');
        }

        if (Number(requestData.amount) > wallet) {
            return ErrorAlert('Not sufficent balance.');
        }
        
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/withdrawals',
                'POST',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );

            if (responseData.success) {
                Alert.alert(
                    'Withdrawal',
                    `${Currency}${responseData?.amount} requested successfully.`,
                    [{
                        text: 'OK',
                        onPress: () => withdrawalAlertOkHandler()
                    }],
                    { cancelable: false }
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
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                <ScrollView>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text
                            style={{
                            fontSize: FontSize.xLarge,
                            color: Colors.text,
                            fontFamily: 'poppins-semibold',
                            marginVertical: Spacing * 3
                            }}
                        >
                            Enter Waithdrawal Details
                        </Text>
                    </View>
                    <View style={{marginVertical: Spacing}}>
                        <View style={styles.card}>
                            <Text
                                style={{
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    marginBottom: Spacing,
                                    color: Colors.text
                                }}
                            >
                                Available Amount
                            </Text>
                            <Text style={styles.text}>
                                Wallet: {Currency}{wallet}
                            </Text>
                        </View>
                    </View>
                    <View style={{ marginBottom: Spacing * 3 }}>
                        <AppTextInput
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, amount: text })}
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
                            onPress={() => requestHandler()}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Request
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
    mainContainer: {
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
    container: {
        paddingHorizontal: Spacing * 2,
        paddingVertical: Spacing,
        marginVertical: Spacing * 1.5,
    },
    card: {
        backgroundColor: Colors.onPrimary,
        paddingHorizontal: Spacing * 2,
        paddingVertical: Spacing * 1.5,
        marginBottom: Spacing * 3,
        borderRadius: Spacing,
    },
    text: {
        fontFamily: 'poppins-regular',
        fontSize: FontSize.medium,
        marginBottom: Spacing / 2,
        color: Colors.text,
    }
});

export default WithdrawMoneyScreen;