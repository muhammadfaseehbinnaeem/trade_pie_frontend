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
    let link;

    if (reference === 'Link') {
      link = 'https://chat.whatsapp.com/DMgVW3BGvxeFJPqWCksA6M';    
    } else if ( reference === 'Gmail') {
      link = 'mailto:www.tradepie@gmail.com';
    } else {
      link = 'whatsapp://send?phone=923487178935';
    }

    Linking.openURL(link)
      .catch(() => { console.log(`Couldn't open ${reference}`) });
  };

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingTop: Spacing / 2
        }}
        onPress={() => openLink('Link')}
      >
        <Image
          style={{
            width: Spacing * 3,
            height: Spacing * 2
          }}
          resizeMode='contain'
          source={require('../assets/icons/white_link.png')}
        />
        <Text style={ styles.text }>Join the Family</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flexDirection: 'row' }}
        onPress={() => openLink('Gmail')}
      >
        <Image
          style={{
            width: Spacing * 3,
            height: Spacing * 1.8
          }}
          resizeMode='contain'
          source={require('../assets/icons/white_gmail.png')}
        />
        <Text style={ styles.text }>www.tradepie@gmail.com</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingBottom: Spacing / 2
        }}
        onPress={() => openLink('WhatsApp')}
      >
        <Image
          style={{
            width: Spacing * 3,
            height: Spacing * 1.5
          }}
          resizeMode='contain'
          source={require('../assets/icons/white_whatsapp.png')}
        />
        <Text style={ styles.text }>+92-348-7178935</Text>
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
    fontSize: FontSize.small,
    color: Colors.onPrimary
  }
});

export default Footer;