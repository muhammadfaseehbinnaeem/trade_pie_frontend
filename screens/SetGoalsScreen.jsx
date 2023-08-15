import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const SetGoalsScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [requestData, setRequestData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getGoals = async () => {
                setIsLoading(true);

                try {
                    const responseData = await sendRequest(
                        '/api/admin/goals',
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

            getGoals();
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
                '/api/admin/goals',
                'PUT',
                JSON.stringify(requestData),
                {'Content-Type': 'application/json'}
            );
            
            if (responseData.success) {
                return (
                    Alert.alert(
                        'Goals',
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
        Alert.alert(
            'Set Goals',
            'Are you sure you want to set goals?',
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
        <View style={styles.mainContainer}>
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
                            Set Goals for Users
                        </Text>
                    </View>
                    <View style={{ marginBottom: Spacing * 3 }}>
                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                value={requestData.goals}
                                multiline={true}
                                placeholder="Enter goals here..."
                                textAlignVertical="top"
                                onChangeText={(text) => setRequestData({ ...requestData, goals: text })}

                            />
                        </View>
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
    mainContainer: {
        flex: 1,
        justifyContent: 'center'
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: Spacing * 3
    },
    horizontalSpacer: {
        paddingHorizontal: Spacing * 2,
        marginHorizontal: Spacing * 15
    },
    container: {
        padding: 10,
        backgroundColor: Colors.onPrimary,
        height: 150,
        borderRadius: Spacing,
        marginBottom: Spacing * 4
    },
    input: {
        flex: 1,
        fontFamily: 'poppins-regular',
        fontSize: FontSize.medium,
        color: Colors.text,
        textAlignVertical: 'top',
        padding: Spacing,
    },
});

export default SetGoalsScreen;