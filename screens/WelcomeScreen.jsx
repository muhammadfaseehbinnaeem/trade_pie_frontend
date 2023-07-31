import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import Loader from '../components/Loader';

const { height } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <SafeAreaView>
            <View>
                <ScrollView>
                    <View
                        style={{
                            paddingTop: '5%',
                            marginTop: '20%'
                        }}
                    >
                        <ImageBackground
                            style={{ height: height / 4.5 }}
                            resizeMode='contain'
                            source={require('../assets/images/logo.png')}
                        />
                    </View>
                    <View
                        style={{
                            paddingHorizontal: Spacing * 4,
                            paddingTop: Spacing * 7
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.xxLarge,
                                color: Colors.primary,
                                fontFamily: 'poppins-bold',
                                textAlign: 'center'
                            }}
                        >
                            Earn Money, FulFill Your Dreams
                        </Text>
                        <Text
                            style={{
                                fontSize: FontSize.small,
                                color: Colors.text,
                                fontFamily: 'poppins-regular',
                                textAlign: 'center',
                                marginTop: Spacing * 2
                            }}
                        >
                            Invest as much money as you can to earn large and exciting rewards
                        </Text>
                    </View>
                    <View
                        style={{
                            paddingHorizontal: Spacing * 2,
                            paddingTop: Spacing * 8,
                            flexDirection: 'row'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                backgroundColor: Colors.primary,
                                paddingHorizontal: Spacing * 2,
                                paddingVertical: Spacing * 1.5,
                                width: '48%',
                                borderRadius: Spacing
                            }}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text
                                style={{
                                    color: Colors.onPrimary,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: Spacing * 2,
                                paddingVertical: Spacing * 1.5,
                                width: '48%',
                                borderRadius: Spacing
                            }}
                            onPress={() => navigation.navigate('Register')}
                        >
                            <Text
                                style={{
                                    color: Colors.text,
                                    fontFamily: 'poppins-bold',
                                    fontSize: FontSize.large,
                                    textAlign: 'center'
                                }}
                            >
                                Register
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default WelcomeScreen;