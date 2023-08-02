import React, { useContext, useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
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
import AppTextInput from "../components/AppTextInput";

const FocusedReferralCommissionScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [referralCommissionData, setReferralCommissionData] = useState({});
    const fontsLoaded = useCustomFonts();
    const referralCommissionId = useRoute().params?.referralCommissionId;
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getReferralCommissionById = async () => {
                console.log(userInfo);
                setIsLoading(true);
                    
                try {
                    const responseData = await sendRequest(
                        `/api/commissions/${referralCommissionId}`,
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData?.success) {
                        const referralCommissionArray = responseData?.data;

                        if (!referralCommissionArray.isActive && referralCommissionArray.isApproved) {
                            setReferralCommissionData({
                                ...referralCommissionArray,
                                status: 'Approved',
                                color: 'green'
                            });
                        }
                        
                        if (referralCommissionArray.isActive && !referralCommissionArray.isApproved) {
                            setReferralCommissionData({
                                ...referralCommissionArray,
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
    
            getReferralCommissionById();
        });
      
        return unsubscribe;
    }, [navigation, referralCommissionId]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('ReferralCommissions');
        setIsLoading(false);
    };

    const approveAlertYesHandler = async() => {
        referralCommissionData.isActive = false;
        referralCommissionData.isApproved = true;
        referralCommissionData.status = 'Approved';
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                `/api/commissions/${referralCommissionData._id}`,
                'PUT',
                JSON.stringify(referralCommissionData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData?.success) {
                return (
                    Alert.alert(
                        'Referral Commission',
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

    const approveHandler = () => {
        Alert.alert(
            'Approve Referral Commission',
            'Are you sure you want to approve this referral commission?',
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
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.body}>
                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.card}>
                        <Text>ID: {referralCommissionData._id}</Text>
                        <Text>Type: {referralCommissionData.commissionType}</Text>
                        <Text>From: {referralCommissionData.from}</Text>
                        <Text>User ID: {referralCommissionData.userId}</Text>
                        <Text>Name: {referralCommissionData.userName}</Text>
                        <Text>Account Number: {referralCommissionData.userAccountNumber}</Text>
                        <Text>Account Type: {referralCommissionData.userAccountType}</Text>
                        <Text>
                            Status: {
                                <Text style={[styles.status, { color: referralCommissionData.color }]}>
                                    {referralCommissionData.status}
                                </Text>
                            }
                        </Text>
                        <Text>Commission: {Currency}{referralCommissionData.commission}</Text>
                        {
                            (
                                referralCommissionData.status === 'Pending' && userInfo.isAdmin
                            ) ?
                            (
                                <View style={styles.buttonsContainer}>
                                    <TouchableOpacity
                                        style={[styles.button, { backgroundColor: 'green' }]}
                                        onPress={() => approveHandler()}
                                    >
                                        <Text style={styles.buttonText}>Approve</Text>
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
        height: '30%',
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
        paddingVertical: Spacing,
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

export default FocusedReferralCommissionScreen;