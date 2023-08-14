import AsyncStorage from '@react-native-async-storage/async-storage';
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
import Currency from '../constants/Currency'
import { useHttpClient } from '../hooks/http-hook';
import AppTextInput from '../components/AppTextInput';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';
import Footer from '../components/Footer';

const SetMarginsScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [requestData, setRequestData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getMargins = async () => {
                setIsLoading(true);

                try {
                    const responseData = await sendRequest(
                        '/api/admin/margins',
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

            getMargins();
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

    const setAlertYesHandler = async () => {
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/admin/margins',
                'PUT',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'Margins',
                        'Set successfully.',
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

    const setHandler = () => {
        if (
            requestData.referralCommission === '' ||
            requestData.teamCommission === '' ||
            requestData.profitRange1 === '' ||
            requestData.profitRange2 === '' ||
            requestData.profitRange3 === '' ||
            requestData.profitRange4 === '' ||
            requestData.profitRange5 === ''
        ) {
            ErrorAlert('All fields are required.');
            return;
        }

        Alert.alert(
            'Set Margins',
            'Are you sure you want to set margins?',
            [
                {
                    text: 'YES',
                    onPress: () => setAlertYesHandler()
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
                            Set Margins for Users
                        </Text>
                    </View>
                    <View style={{ marginBottom: Spacing * 3 }}>
                        <Text style={{ marginTop: Spacing / 2 }}>Referral Commission</Text>
                        <AppTextInput
                            value={String(requestData?.referralCommission)}
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, referralCommission: text })}
                        />
                        <Text style={{ marginTop: Spacing / 2 }}>Team Commission</Text>
                        <AppTextInput
                            value={String(requestData?.teamCommission)}
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, teamCommission: text })}
                        />
                        <Text style={{ marginTop: Spacing / 2 }}>Profit for less than {Currency}10</Text>
                        <AppTextInput
                            value={String(requestData?.profitRange1)}
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, profitRange1: text })}
                        />
                        <Text style={{ marginTop: Spacing / 2 }}>Profit for {Currency}10-100</Text>
                        <AppTextInput
                            value={String(requestData?.profitRange2)}
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, profitRange2: text })}
                        />
                        <Text style={{ marginTop: Spacing / 2 }}>Profit for {Currency}100-500</Text>
                        <AppTextInput
                            value={String(requestData?.profitRange3)}
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, profitRange3: text })}
                        />
                        <Text style={{ marginTop: Spacing / 2 }}>Profit for {Currency}500-1000</Text>
                        <AppTextInput
                            value={String(requestData?.profitRange4)}
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, profitRange4: text })}
                        />
                        <Text style={{ marginTop: Spacing / 2 }}>Profit for greater than {Currency}1000</Text>
                        <AppTextInput
                            value={String(requestData?.profitRange5)}
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setRequestData({ ...requestData, profitRange5: text })}
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
                            onPress={() => setHandler()}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Set
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

export default SetMarginsScreen;