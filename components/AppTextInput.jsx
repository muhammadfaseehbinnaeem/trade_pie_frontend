import React, { useState } from 'react';
import { TextInput } from 'react-native';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import Loader from './Loader';

const AppTextInput = ({ ...otherProps }) => {
    const [focused, setFocused] = useState(false);
    const fontsLoaded = useCustomFonts();

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholderTextColor={Colors.darkText}
            style={[
                {
                    fontFamily: 'poppins-regular',
                    fontSize: FontSize.small,
                    padding: Spacing / 2,
                    backgroundColor: Colors.lightPrimary,
                    borderRadius: Spacing,
                    marginVertical: Spacing
                },
                focused && {
                    borderWidth: 3,
                    borderColor: Colors.primary,
                    shadowOffset: {
                        width: 4,
                        height: Spacing
                    },
                    shadowColor: Colors.primary,
                    shadowOpacity: 0.2,
                    shadowRadius: Spacing
                }
            ]}
            {...otherProps}
        />
    );
};

export default AppTextInput;