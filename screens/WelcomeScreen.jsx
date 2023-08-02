import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    Linking,
    Image,
    StyleSheet
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

    const openLink = (reference) => {
        const link = reference === 'Gmail' ? 'mailto:www.tradepie@gmail.com' : 'whatsapp://send?phone=923304095376';

        Linking.openURL(link)
            .catch(() => { console.log(`Couldn't open ${reference}`) });
    };      

    return (
        <View style={styles.container} >
            <View style={styles.body}>
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
            <View style={styles.footer}>
                <TouchableOpacity
                        style={{
                        flexDirection: 'row',
                        paddingTop: Spacing,
                    }}
                    onPress={() => openLink('Gmail')}
                >
                    <Image
                        style={{
                            width: Spacing * 4,
                            height: Spacing * 2
                        }}
                        resizeMode='contain'
                        source={require('../assets/icons/gmail.png')}
                    />
                    <Text style={ styles.text }>www.tradepie@gmail.com</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row',
                        paddingTop: Spacing / 2,
                        paddingBottom: Spacing
                    }}
                    onPress={() => openLink('WhatsApp')}
                >
                    <Image
                        style={{
                            width: Spacing * 3.5,
                            height: Spacing * 2.3
                        }}
                        resizeMode='contain'
                        source={require('../assets/icons/whatsapp.png')}
                    />
                    <Text style={ styles.text }>+92-330-4095376</Text>
                </TouchableOpacity>
            </View>
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
    footer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: Spacing * 8,
        marginBottom: Spacing / 2
    },
    text: {
        fontFamily: 'poppins-regular',
        fontSize: FontSize.medium,
        color: Colors.text
}
});

export default WelcomeScreen;