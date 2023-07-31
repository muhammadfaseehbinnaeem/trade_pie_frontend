import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import Modal from 'react-native-modal';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import Currency from '../constants/Currency';
import { useHttpClient } from '../hooks/http-hook';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const InvestmentModal = ({ itemId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const modalOkHandler = () => {
        toggleModal();
        // navigation.navigate('UserDashboard');
    };

    return (
        <View style={styles.modalMainContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text
                            style={{
                                fontFamily: 'poppins-semibold',
                                fontSize: 25,
                                color: Colors.primary,
                                textAlign: 'center',
                                marginBottom: Spacing
                            }}
                        >
                            Payment Successful
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'poppins-semibold',
                                fontSize: 25,
                                color: Colors.primary,
                                textAlign: 'center',
                            }}
                        >
                            Hello!
                        </Text>
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.brightPrimary,
                                marginVertical: '35%',
                                marginHorizontal: '35%',
                                padding: '3%',
                                borderRadius: Spacing
                            }}
                            onPress={() => modalOkHandler()}
                        >
                            <Text
                                style={{
                                    fontFamily: 'poppins-semibold',
                                    fontSize: FontSize.large,
                                    color: Colors.onPrimary,
                                    textAlign: 'center',
                                }}
                            >
                                OK
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
    separator: {
       height: Spacing,
    },
    modalMainContainer: {
        marginTop: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // This adds a semi-transparent overlay
    },
    modalContent: {
        backgroundColor: Colors.onPrimary,
        paddingHorizontal: Spacing * 3,
        marginVertical: Spacing,
        width: Spacing * 30,
        height: Spacing * 60,
        borderRadius: Spacing
    },
});

export default InvestmentModal;