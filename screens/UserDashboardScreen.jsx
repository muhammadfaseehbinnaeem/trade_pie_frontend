import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const UserDashboardScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [userInfo, setUserInfo] = useState({});
    const [visible, setVisible] = useState(false);
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
                        setUserInfo(responseData.data);

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

    const toggleModal = () => {
        setVisible(!visible);
    };

    return (
        <SafeAreaView>
            <View
                style={{
                    paddingHorizontal: Spacing * 2,
                    marginTop: '5%'
                }}
            >
                <ScrollView>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginLeft: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xxLarge,
                                color: Colors.primary,
                                fontFamily: 'poppins-semibold',
                                marginVertical: Spacing * 3,
                            }}
                        >
                            {userInfo?.name}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginTop: Spacing * 3,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Investment:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            Rs. {userInfo?.totalInvestment}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginTop: Spacing * 3,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Earning:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            Rs. {userInfo?.totalEarning}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginTop: Spacing * 3,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Profit:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            Rs. {userInfo?.totalProfit}
                        </Text>
                    </View>
                    <View
                        style={{
                            marginVertical: Spacing * 3,
                            paddingVertical: Spacing * 2
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                padding: Spacing,
                                backgroundColor: Colors.primary,
                                marginTop: Spacing * 3,
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
                            onPress={() => toggleModal()}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                See Goals
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={visible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                            <Text style={styles.heading}>Your Goals</Text>
                            <View style={styles.card}>
                                <Text style={styles.cardText}>{userInfo.goals}</Text>
                            </View>
                            <TouchableOpacity style={styles.okButton} onPress={() => toggleModal()}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    modalContent: {
        width: '70%',
        height: '40%',
        backgroundColor: Colors.onPrimary,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 25,
        fontFamily: 'poppins-semibold',
        color: Colors.primary,
        alignSelf: 'center',
        marginTop: Spacing * 2
    },
    card: {
        padding: 10,
        marginHorizontal: Spacing,
        marginBottom: Spacing * 4
    },
    cardText: {
        fontSize: 16,
        fontFamily: 'poppins-regular'
    },
    okButton: {
        backgroundColor: Colors.primary,
        borderRadius: 5,
        alignItems: 'center',
        padding: 10,
        marginBottom: Spacing * 2,
        marginHorizontal: Spacing * 2
    },
    okButtonText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.onPrimary
    }
});

export default UserDashboardScreen;