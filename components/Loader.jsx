import { View, ActivityIndicator } from "react-native";

import Colors from "../constants/Colors";

const Loader = ({ ...otherProps }) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <ActivityIndicator
                animating={true}
                size="large"
                color={Colors.primary}
                {...otherProps}
            />
        </View>
    );
};

export default Loader;