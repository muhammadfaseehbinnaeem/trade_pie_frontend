import React, { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

import Spacing from '../constants/Spacing';
import FontSize from '../constants/FontSize';
import Colors from '../constants/Colors';
import { useCustomFonts } from '../constants/Font';
import Loader from './Loader';

const SelectInput = ({ options, ...otherProps }) => {
    const [selectedValue, setSelectedValue] = useState('');
    const fontsLoaded = useCustomFonts();

    const handleValueChange = (itemValue, itemIndex) => {
        setSelectedValue(itemValue);
    };

    if (!fontsLoaded) {
        return <Loader />;
    }

    return (
        <Picker
            selectedValue={selectedValue}
            onValueChange={handleValueChange}
            style={{
                fontFamily: 'poppins-regular',
                fontSize: FontSize.small,
                padding: Spacing / 2,
                backgroundColor: Colors.lightPrimary,
                borderRadius: Spacing,
                marginVertical: Spacing
            }}
            {...otherProps}
        >
            {
                options.map((option) => 
                    <Picker.Item
                        style={{
                            fontFamily: 'poppins-regular',
                            fontSize: FontSize.small,
                        }}
                        key={option}
                        label={option}
                        value={option} />
                )
            }
        </Picker>
    );
};

export default SelectInput;