import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import Loader from '../components/Loader';

const Footer = () => {
  const fontsLoaded = useCustomFonts();

  if (!fontsLoaded) {
      return <Loader />;
  }

  return (
    <View style={styles.footer}>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: Spacing,
        }}
      >
        <Image
          style={{ height: 20 }}
          resizeMode='contain'
          source={require('../assets/icons/email.png')}
        />
        <Text style={ styles.text }>www.tradepie@gmail.com</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          paddingTop: Spacing / 2,
          paddingBottom: Spacing
        }}
      >
        <Image
          style={{ height: 20 }}
          resizeMode='contain'
          source={require('../assets/icons/whatsapp.png')}
        />
        <Text style={ styles.text }>03304095376</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: Spacing * 8
  },
  text: {
    fontFamily: 'poppins-regular',
    fontSize: FontSize.medium,
    color: Colors.onPrimary
  }
});

export default Footer;