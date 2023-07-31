import React from "react";
import { View } from 'react-native';
import LottieView from "lottie-react-native";

import Spacing from "../constants/Spacing";

export default function FallingCoinsAnimation() {
    return (
        <View style={{
            // flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
            <LottieView
                source={require('../assets/animations/coins_drop.json')}
                autoPlay
                loop={false}
                style={{
                    height: Spacing * 40,
                    marginTop: '-20%',
                    marginBottom: '-20%'
                }}
                speed={2}
            />
      </View>
    );
};