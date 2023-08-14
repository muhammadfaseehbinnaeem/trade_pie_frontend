import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import Currency from '../constants/Currency';
import { useHttpClient } from '../hooks/http-hook';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const TeamCommissionsScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [teamCommissions, setTeamCommissions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('All');
    const fontsLoaded = useCustomFonts();

    const teamCommissionsNotFoundAlertOkHandler = () => {
        status === 'All' ? navigation.navigate('AdminDashboard') : navigation.navigate('UserTeamCommissions');
        setStatus('All');
        setIsLoading(false);
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getUserTeamCommissions = async () => {
                setStatus('All');
                setIsLoading(true);

                try {
                    const response = await sendRequest(
                        `/api/commissions/allteam/${status}`,
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );

                    const responseData = JSON.parse(JSON.stringify(response));
                    
                    if (responseData?.success) {
                        let teamCommissionsData = responseData?.data;
                        if (teamCommissionsData.length === 0) {
                            return (
                                Alert.alert(
                                    'Message',
                                    'No team commissions found in this category.',
                                    [{
                                        text: 'OK',
                                        onPress: () => teamCommissionsNotFoundAlertOkHandler()
                                    }],
                                    {cancelable: false}
                                )
                            );
                        }

                        const teamCommissionsArray = teamCommissionsData.map((teamCommission) => {
                            if (!teamCommission.isActive && teamCommission.isApproved) {
                                return { ...teamCommission, status: 'Approved', color: 'green' };
                            }
                            
                            if (teamCommission.isActive && !teamCommission.isApproved) {
                                return { ...teamCommission, status: 'Pending', color: 'orange' };
                            }

                            return teamCommission;
                        });

                        setTeamCommissions(teamCommissionsArray);
                    } else {
                        ErrorAlert(responseData?.error?.message);
                    }
                } catch (err) {
                    console.log(err);
                }

                setIsLoading(false);
            };

            getUserTeamCommissions();
        });

        const getFilteredTeamCommissions = async (req, res) => {
            setIsLoading(true);

            try {
                const response = await sendRequest(
                    `/api/commissions/allteam/${status}`,
                    'GET',
                    null,
                    {'Content-Type': 'application/json'}
                );

                const responseData = JSON.parse(JSON.stringify(response));
                
                if (responseData?.success) {
                    let teamCommissionsData = responseData?.data;
                    if (teamCommissionsData.length === 0) {
                        return (
                            Alert.alert(
                                'Message',
                                'No team commissions found in this category.',
                                [{
                                    text: 'OK',
                                    onPress: () => teamCommissionsNotFoundAlertOkHandler()
                                }],
                                {cancelable: false}
                            )
                        );
                    }

                    const teamCommissionsArray = teamCommissionsData.map((teamCommission) => {
                        if (!teamCommission.isActive && teamCommission.isApproved) {
                            return { ...teamCommission, status: 'Approved', color: 'green' };
                        }
                        
                        if (teamCommission.isActive && !teamCommission.isApproved) {
                            return { ...teamCommission, status: 'Pending', color: 'orange' };
                        }

                        return teamCommission;
                    });

                    setTeamCommissions(teamCommissionsArray);
                } else {
                    ErrorAlert(responseData?.error?.message);
                }
            } catch (err) {
                console.log(err);
            }

            setIsLoading(false);
        };
        
        getFilteredTeamCommissions();
      
        return unsubscribe;
    }, [navigation, status]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

    const teamCommissionCardHandler = async (item) => {
        const params = { teamCommissionId: item._id };

        navigation.navigate('FocusedTeamCommission', params);
    };

    const renderCard = ({ item }) => (
        <TouchableOpacity onPress={() => teamCommissionCardHandler(item)}>
            <View style={styles.card}>
                <Text style={styles.text}>
                    ID: {item._id}
                </Text>
                <Text style={styles.text}>
                    From: {item.from}
                </Text>
                <Text style={styles.text}>
                    Status: {
                        <Text style={{ color: item.color }}>
                            {item.status}
                        </Text>
                    }
                </Text>
                <Text style={styles.text}>
                    Commission: {Currency}{item.commission}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View
            style={{
                paddingTop: 1.5,
                paddingBottom: 50
            }}
        >
            <Picker
                selectedValue={status}
                onValueChange={(value) => setStatus(value)}
                style={{ backgroundColor: Colors.onPrimary }}
            >
                <Picker.Item label='All' value='All' />
                <Picker.Item label='Approved' value='Approved' />
                <Picker.Item label='Pending' value='Pending' />
            </Picker>
            <FlatList
                data={teamCommissions}
                renderItem={renderCard}
                keyExtractor={(item) => item._id}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                contentContainerStyle={styles.container}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: Spacing * 2,
        paddingBottom: Spacing,
        marginVertical: Spacing,
    },
    card: {
        backgroundColor: Colors.onPrimary,
        paddingHorizontal: Spacing * 2,
        paddingVertical: Spacing * 1.5,
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
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalCard: {
        padding: 10,
    },
    statusText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10,
    },
    profitInput: {
        borderBottomWidth: 1,
        marginBottom: 10,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TeamCommissionsScreen;