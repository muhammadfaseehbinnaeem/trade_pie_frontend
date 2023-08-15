import React, { useState, useEffect } from 'react';
import {
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
import Currency from '../constants/Currency';
import { useHttpClient } from '../hooks/http-hook';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const UserDashboardScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [userInfo, setUserInfo] = useState({});
    const [goalsModalVisible, setGoalsModalVisible] = useState(false);
    const [referralCodeModalVisible, setReferralCodeModalVisible] = useState(false);
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

    const toggleModal = (reference) => {
        reference === 'referralCode' ?
        setReferralCodeModalVisible(!referralCodeModalVisible) :
        setGoalsModalVisible(!goalsModalVisible)
    };

    return (
        <View style={styles.container}>
            <View style={styles.body}>
                <ScrollView>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginLeft: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: Colors.primary,
                                fontFamily: 'poppins-semibold',
                                marginTop: Spacing,
                                marginBottom: Spacing * 2
                            }}
                        >
                            Hi {userInfo?.name},
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginVertical: Spacing / 2,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Wallet:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {Currency}{userInfo?.wallet}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginVertical: Spacing / 2,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Referral Commission:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {Currency}{userInfo?.referralCommission}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginVertical: Spacing / 2,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Team Commission:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {Currency}{userInfo?.teamCommission}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginVertical: Spacing / 2,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Investment:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {Currency}{userInfo?.investment}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginVertical: Spacing / 2,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Profit:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {Currency}{userInfo?.profit}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginVertical: Spacing / 2,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Earning:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {Currency}{userInfo?.earning}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            backgroundColor: Colors.onPrimary,
                            paddingVertical: Spacing,
                            marginVertical: Spacing / 2,
                            borderRadius: Spacing
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingLeft: Spacing * 2
                            }}
                        >
                            Withdrawal:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {Currency}{userInfo?.withdrawal}
                        </Text>
                    </View>
                    <View style={{ marginTop: Spacing * 3 }}>
                        <TouchableOpacity onPress={() => toggleModal('goals')}>
                            <Text
                                style={{
                                    fontFamily: 'poppins-semibold',
                                    fontSize: FontSize.small,
                                    color: Colors.primary,
                                    alignSelf: 'center'
                                }}
                            >
                                My goals
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: Spacing }}>
                        <TouchableOpacity onPress={() => toggleModal('referralCode')}>
                            <Text
                                style={{
                                    fontFamily: 'poppins-semibold',
                                    fontSize: FontSize.small,
                                    color: Colors.primary,
                                    alignSelf: 'center'
                                }}
                            >
                                My referral code
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={ styles.horizontalSpacer } />
                    <Modal visible={referralCodeModalVisible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                            <Text style={styles.heading}>Your Referral Code</Text>
                            <View style={styles.card}>
                                <Text style={styles.cardText}>{userInfo._id}</Text>
                            </View>
                            <TouchableOpacity style={styles.okButton} onPress={() => toggleModal('referralCode')}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <Modal visible={goalsModalVisible} transparent={true} animationType="slide">
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                            <Text style={styles.heading}>Your Goals</Text>
                            <View style={styles.card}>
                                <Text style={styles.cardText}>{userInfo.goals}</Text>
                            </View>
                            <TouchableOpacity style={styles.okButton} onPress={() => toggleModal('goals')}>
                                <Text style={styles.okButtonText}>OK</Text>
                            </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    horizontalSpacer: {
        paddingHorizontal: Spacing * 2,
        marginHorizontal: Spacing * 15
    },
    modalContent: {
        width: '80%',
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
        padding: Spacing,
        marginBottom: Spacing * 2,
        marginHorizontal: Spacing * 2
    },
    okButtonText: {
        fontSize: 16,
        fontFamily: 'poppins-semibold',
        color: Colors.onPrimary
    },
    animationContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: Colors.lightPrimary,
        height: 50,
        overflow: 'visible',
    },
    strip: {
        height: '100%',
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
});

export default UserDashboardScreen;