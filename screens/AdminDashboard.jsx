import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import Loader from '../components/Loader';
import ErrorAlert from '../components/ErrorAlert';

const AdminDashboardScreen = ({ navigation }) => {
    const { error, sendRequest, clearError } = useHttpClient();
    const [dashboardData, setDashboardData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const fontsLoaded = useCustomFonts();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            const getAdminDashboard = async () => {
                setIsLoading(true);

                try {
                    const responseData = await sendRequest(
                        '/api/admin/dashboard',
                        'GET',
                        null,
                        {'Content-Type': 'application/json'}
                    );
                    
                    if (responseData.success) {
                        setDashboardData(responseData.data);

                    } else {
                        ErrorAlert(responseData?.error?.message);
                    }
                } catch (err) {
                    console.log(err);
                }

                setIsLoading(false);
            };

            getAdminDashboard();
        });
    
        return unsubscribe;
    }, [navigation]);

    if (!fontsLoaded || isLoading) {
        return <Loader />;
    }

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
                                marginVertical: Spacing * 3
                            }}
                        >
                            Investments
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
                            Approved:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.approvedCount}
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
                            Rejected:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.rejectedCount}
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
                            Pending:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.pendingCount}
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
                            onPress={() => navigation.navigate('SetGoals')}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Set Goals
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default AdminDashboardScreen;