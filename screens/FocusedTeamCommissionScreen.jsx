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

const FocusedTeamCommissionScreen = ({ navigation }) => {
    const { userInfo } = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [teamCommissionData, setTeamCommissionData] = useState({});
    const fontsLoaded = useCustomFonts();
    const teamCommissionId = useRoute().params?.teamCommissionId;
    
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getTeamCommissionById = async () => {
                console.log(userInfo);
                setIsLoading(true);
                    
                try {
                    const responseData = await sendRequest(
                        `/api/commissions/${teamCommissionId}`,
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData?.success) {
                        const teamCommissionArray = responseData?.data;

                        if (!teamCommissionArray.isActive && teamCommissionArray.isApproved) {
                            setTeamCommissionData({
                                ...teamCommissionArray,
                                status: 'Approved',
                                color: 'green'
                            });
                        }
                        
                        if (teamCommissionArray.isActive && !teamCommissionArray.isApproved) {
                            setTeamCommissionData({
                                ...teamCommissionArray,
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
    
            getTeamCommissionById();
        });
      
        return unsubscribe;
    }, [navigation, teamCommissionId]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const alertOkHandler = () => {
        navigation.navigate('TeamCommissions');
        setIsLoading(false);
    };

    const approveAlertYesHandler = async() => {
        teamCommissionData.isActive = false;
        teamCommissionData.isApproved = true;
        teamCommissionData.status = 'Approved';
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                `/api/commissions/${teamCommissionData._id}`,
                'PUT',
                JSON.stringify(teamCommissionData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData?.success) {
                return (
                    Alert.alert(
                        'Team Commission',
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
            'Approve Team Commission',
            'Are you sure you want to approve this team commission?',
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
                        <Text>ID: {teamCommissionData._id}</Text>
                        <Text>Type: {teamCommissionData.commissionType}</Text>
                        <Text>From: {teamCommissionData.from}</Text>
                        <Text>User ID: {teamCommissionData.userId}</Text>
                        <Text>Name: {teamCommissionData.userName}</Text>
                        <Text>Account Number: {teamCommissionData.userAccountNumber}</Text>
                        <Text>Account Type: {teamCommissionData.userAccountType}</Text>
                        <Text>
                            Status: {
                                <Text style={[styles.status, { color: teamCommissionData.color }]}>
                                    {teamCommissionData.status}
                                </Text>
                            }
                        </Text>
                        <Text>Commission: {Currency}{teamCommissionData.commission}</Text>
                        {
                            (
                                teamCommissionData.status === 'Pending' && userInfo.isAdmin
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

export default FocusedTeamCommissionScreen;