import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';

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

  const openLink = (reference) => {
    const link = reference === 'Gmail' ? 'mailto:www.tradepie@gmail.com' : 'whatsapp://send?phone=923304095376';

    Linking.openURL(link)
      .catch(() => { console.log(`Couldn't open ${reference}`) });
  };

  return (
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
          source={require('../assets/icons/white_gmail.png')}
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
            width: Spacing * 4,
            height: Spacing * 2
          }}
          resizeMode='contain'
          source={require('../assets/icons/white_whatsapp.png')}
        />
        <Text style={ styles.text }>+92-330-4095376</Text>
      </TouchableOpacity>
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