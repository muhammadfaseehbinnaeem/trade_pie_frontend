import React, { useState, useEffect } from 'react';
import {
    Text,
    View,
    ScrollView,
    StyleSheet
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import { useHttpClient } from '../hooks/http-hook';
import Footer from '../components/Footer';
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
                    
                    if (responseData?.success) {
                        setDashboardData(responseData?.data);

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
                                marginVertical: Spacing
                            }}
                        >
                            Referral Commissions
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
                            Approved:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.approvedReferralCommissionsCount}
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
                            Pending:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.pendingReferralCommissionsCount}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginLeft: Spacing,
                            marginTop: Spacing * 3,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: Colors.primary,
                                fontFamily: 'poppins-semibold',
                                marginVertical: Spacing
                            }}
                        >
                            Team Commissions
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
                            Approved:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.approvedTeamCommissionsCount}
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
                            Pending:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.pendingTeamCommissionsCount}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginLeft: Spacing,
                            marginTop: Spacing * 3,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: Colors.primary,
                                fontFamily: 'poppins-semibold',
                                marginVertical: Spacing
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
                            Approved:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.approvedInvestmentsCount}
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
                            Rejected:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.rejectedInvestmentsCount}
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
                            Pending:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.pendingInvestmentsCount}
                        </Text>
                    </View>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            marginLeft: Spacing,
                            marginTop: Spacing * 3,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xLarge,
                                color: Colors.primary,
                                fontFamily: 'poppins-semibold',
                                marginVertical: Spacing
                            }}
                        >
                            Withdrawals
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
                            Approved:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.approvedInvestmentsCount}
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
                            Rejected:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.rejectedInvestmentsCount}
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
                            marginBottom: Spacing * 3,
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
                            Pending:
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.large,
                                fontFamily: 'poppins-regular',
                                paddingRight: Spacing * 2
                            }}
                        >
                            {dashboardData?.pendingInvestmentsCount}
                        </Text>
                    </View>
                    <View style={ styles.horizontalSpacer } />
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
        marginTop: Spacing * 3
    },
    horizontalSpacer: {
        paddingHorizontal: Spacing * 2,
        marginHorizontal: Spacing * 15
    },
});

export default AdminDashboardScreen;