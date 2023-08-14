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
import AppTextInput from "../components/AppTextInput";

const FocusedInvestmentScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [investmentData, setInvestmentData] = useState({});
    const fontsLoaded = useCustomFonts();
    const investmentId = useRoute().params?.investmentId;
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getInvestmentById = async () => {
                setIsLoading(true);
                    
                try {
                    const responseData = await sendRequest(
                        `/api/investments/${investmentId}`,
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData.success) {
                        const investmentArray = responseData.data;

                        if (!investmentArray.isActive && investmentArray.isApproved) {
                            setInvestmentData({
                                ...investmentArray,
                                status: 'Approved',
                                color: 'green'
                            });
                        }
                        
                        if (!investmentArray.isActive && !investmentArray.isApproved) {
                            setInvestmentData({
                                ...investmentArray,
                                status: 'Rejected',
                                color: 'red'
                            });
                        }
                        
                        if (investmentArray.isActive && !investmentArray.isApproved) {
                            setInvestmentData({
                                ...investmentArray,
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
    
            getInvestmentById();
        });
      
        return unsubscribe;
    }, [navigation, investmentId]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('Investments');
        setIsLoading(false);
    };

    const approveAlertYesHandler = async() => {
        investmentData.isActive = false;
        investmentData.isApproved = true;
        investmentData.status = 'Approved';
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                `/api/investments/${investmentData._id}`,
                'PUT',
                JSON.stringify(investmentData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'Investment',
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
        investmentData.isActive = false;
        investmentData.isApproved = false;
        investmentData.status = 'Rejected';
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                `/api/investments/${investmentData._id}`,
                'PUT',
                JSON.stringify(investmentData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'Investment',
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
            'Approve Investment',
            'Are you sure you want to approve this investment?',
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
            'Reject Investment',
            'Are you sure you want to reject this investment?',
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
                    <Image
                        source={{uri: `${baseUrl}/${investmentData.image}`}}
                        style={styles.image}
                        resizeMode="cover"
                    />
                    <View style={styles.card}>
                        <Text>ID: {investmentData._id}</Text>
                        <Text>User ID: {investmentData.userId}</Text>
                        <Text>Name: {investmentData.userName}</Text>
                        <Text>Account Number: {investmentData.userAccountNumber}</Text>
                        <Text>Account Type: {investmentData.userAccountType}</Text>
                        <Text>Amount: {Currency}{investmentData.amount}</Text>
                        <Text>
                            Status: {
                                <Text style={[styles.status, { color: investmentData.color }]}>
                                    {investmentData.status}
                                </Text>
                            }
                        </Text>
                        <Text>Profit: {Currency}{investmentData.profit}</Text>
                        {
                            (
                                userInfo.isAdmin &&
                                investmentData.status !== 'Approved' &&
                                investmentData.status !== 'Rejected'
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

export default FocusedInvestmentScreen;