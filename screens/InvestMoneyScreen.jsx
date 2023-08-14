import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Image,
    Button,
    Modal
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
import FallingCoinsAnimation from '../components/FallingCoinsAnimation';

const InvestMoneyScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [isLoading, setIsLoading] = useState(false);
    const [paymentAccountDetails, setPaymentAccountDetails] = useState({});
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [amount, setAmount] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [paidAmount, setPaidAmount] = useState('');
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
                        setPaymentAccountDetails(responseData.data);
                    } else {
                        ErrorAlert(responseData?.error?.message)
                    }
                } catch (err) {
                    console.log(err);
                }
                
                setImageUri(null);
                setAmount('');
                setIsLoading(false);
            };

            (async () => {
                const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
                setHasGalleryPermission(galleryStatus.status === 'granted');
            })();
            
            getPaymentAccount();
        });
        
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3, 5],
            quality: 0.5
        });
    
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImageUri(uri);
        }
    };

    if (hasGalleryPermission === false) {
        return ErrorAlert('Permission is not granted.');
    }

    const getFileTypeFromUri = (uri) => {
        const extension = uri.split('.').pop();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
                return 'image/jpeg';
            case 'png':
                return 'image/png';
            default:
                return null;
        }
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const modalOkHandler = () => {
        setImageUri(null);
        setAmount('');
        toggleModal();
        navigation.navigate('UserDashboard');
    };

    const paymentHandler = async (amount) => {
        if (!imageUri && (amount === '' || amount === '0')) {
            return ErrorAlert('All fields are required.');
        }
        if (!imageUri) {
            return ErrorAlert('Receipt is required.');
        }

        if (amount === '' || amount === '0') {
            return ErrorAlert('Amount is required.');
        }
    
        const fileType = getFileTypeFromUri(imageUri);
        
        if (!fileType) {
            return ErrorAlert('Invalid image type. Only JPG, JPEG, and PNG images are allowed.');
        }
        
        const formData = new FormData();
        const fileName = imageUri.split('/').pop();
        
        formData.append('image', {
            uri: imageUri,
            type: fileType,
            name: fileName,
        });
        
        formData.append('amount', amount);
    
        setIsLoading(true);

        try {
            const responseData = await sendRequest(
                '/api/investments',
                'POST',
                formData,
                {'Content-Type': 'multipart/form-data'},
            );

            if (responseData.success) {
                setPaidAmount(responseData?.amount);
                toggleModal();
            } else {
                ErrorAlert(responseData?.error?.message);
            }            
        } catch (err) {
          console.error('Image upload error:', err);
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
                            Enter Payment Details
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
                                Payment Account
                            </Text>
                            <Text style={styles.text}>
                                Account Number: {paymentAccountDetails?.accountNumber}
                            </Text>
                            <Text style={styles.text}>
                                Account Type: {paymentAccountDetails?.accountType}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            marginTop: Spacing * 2,
                            marginBottom: Spacing * 3,
                        }}
                    >
                        {
                            imageUri && 
                            <Image
                                source={{ uri: imageUri }}
                                style={{
                                    flex: 1 / 2,
                                    width: 200,
                                    height: 200
                                }}
                            />
                        }
                        <Button
                            title="Upload Receipt"
                            onPress={() => pickImage()}
                            color={Colors.brightPrimary}
                            style={{
                                paddingVertical: Spacing * 2
                            }}
                        />
                        <Text
                            style={{
                                fontFamily: 'poppins-regular',
                            }}>
                                Maximum size: 500KB (JPG, JPEG, PNG only)
                            </Text>
                        <Text style={styles.separator}></Text>
                        <AppTextInput
                            placeholder={`Enter amount in ${Currency}`}
                            keyboardType='numeric'
                            onChangeText={(text) => setAmount(text)}
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
                            onPress={() => paymentHandler(amount)}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Pay
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.modalMainContainer}>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => setModalVisible(false)}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <FallingCoinsAnimation />
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
                                        {Currency}{paidAmount}
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: Colors.onPrimary,
        paddingHorizontal: Spacing * 3,
        marginVertical: Spacing,
        width: Spacing * 30,
        height: Spacing * 60,
        borderRadius: Spacing,
    },
});

export default InvestMoneyScreen;