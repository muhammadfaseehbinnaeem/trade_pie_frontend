import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
    Alert
} from "react-native";
import { useRoute } from "@react-navigation/native";

import Spacing from '../constants/Spacing';
import { useCustomFonts } from '../constants/Font';
import Currency from '../constants/Currency';
import { AuthContext } from "../context/AuthContext";
import { useHttpClient, baseUrl } from '../hooks/http-hook';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const FocusedWithdrawalScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [withdrawalData, setWithdrawalData] = useState({});
    const fontsLoaded = useCustomFonts();
    const withdrawalId = useRoute().params?.withdrawalId;
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getWithdrawalById = async () => {
                setIsLoading(true);
                    
                try {
                    const responseData = await sendRequest(
                        `/api/withdrawals/${withdrawalId}`,
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData.success) {
                        const withdrawalArray = responseData.data;

                        if (!withdrawalArray.isActive && withdrawalArray.isApproved) {
                            setWithdrawalData({
                                ...withdrawalArray,
                                status: 'Approved',
                                color: 'green'
                            });
                        }
                        
                        if (!withdrawalArray.isActive && !withdrawalArray.isApproved) {
                            setWithdrawalData({
                                ...withdrawalArray,
                                status: 'Rejected',
                                color: 'red'
                            });
                        }
                        
                        if (withdrawalArray.isActive && !withdrawalArray.isApproved) {
                            setWithdrawalData({
                                ...withdrawalArray,
                                status: 'Pending',
                                color: 'orange'
                            });
                        }
                    } else {
                        ErrorAlert(responseData?.error?.message)
                    }
                } catch (err) {
                    console.log(err);
                }
                
                setIsLoading(false);
            };
    
            getWithdrawalById();
        });
      
        return unsubscribe;
    }, [navigation, withdrawalId]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('Withdrawals');
        setIsLoading(false);
    };

    const approveAlertYesHandler = async() => {
        withdrawalData.isActive = false;
        withdrawalData.isApproved = true;
        withdrawalData.status = 'Approved';
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                `/api/withdrawals/${withdrawalData._id}`,
                'PUT',
                JSON.stringify(withdrawalData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'Withdrawal',
                        'Approved successfully.',
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

    const rejectAlertYesHandler = async() => {
        withdrawalData.isActive = false;
        withdrawalData.isApproved = false;
        withdrawalData.status = 'Rejected';
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                `/api/withdrawals/${withdrawalData._id}`,
                'PUT',
                JSON.stringify(withdrawalData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'Withdrawal',
                        'Rejected successfully.',
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

    const approveHandler = () => {
        Alert.alert(
            'Approve Withdrawal',
            'Are you sure you want to approve this withdrawal?',
            [
                {
                    text: 'YES',
                    onPress: () => approveAlertYesHandler()
                },
                { text: 'NO' }
            ],
            { cancelable: false }
        );
    };
    
    const rejectHandler = () => {
        Alert.alert(
            'Reject Withdrawal',
            'Are you sure you want to reject this withdrawal?',
            [
                {
                    text: 'YES',
                    onPress: () => rejectAlertYesHandler()
                },
                { text: 'NO' }
            ],
            { cancelable: false }
        );
    };
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.card}>
                        <Text>ID: {withdrawalData._id}</Text>
                        <Text>User ID: {withdrawalData.userId}</Text>
                        <Text>Name: {withdrawalData.userName}</Text>
                        <Text>Account Number: {withdrawalData.userAccountNumber}</Text>
                        <Text>Account Type: {withdrawalData.userAccountType}</Text>
                        <Text>Amount: {Currency}{withdrawalData.amount}</Text>
                        <Text>
                            Status: {
                                <Text style={[styles.status, { color: withdrawalData.color }]}>
                                    {withdrawalData.status}
                                </Text>
                            }
                        </Text>
                        {
                            (
                                userInfo.isAdmin &&
                                withdrawalData.status !== 'Approved' &&
                                withdrawalData.status !== 'Rejected'
                            ) ?
                            (
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: 'green' }]}
                                        onPress={() => approveHandler()}
                                    >
                                        <Text style={styles.buttonText}>Approve</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: 'red' }]}
                                        onPress={() => rejectHandler()}
                                    >
                                        <Text style={styles.buttonText}>Reject</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : ''
                        }
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
        flexGrow: 1,
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '25%',
        aspectRatio: 3 / 5
    },
    card: {
        padding: 20,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        marginVertical: Spacing * 5,
        width: '100%',
    },
    status: {
        fontWeight: 'bold',
        marginVertical: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 5,
        marginTop: Spacing * 2,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    });

export default FocusedWithdrawalScreen;