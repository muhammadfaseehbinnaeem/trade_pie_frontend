import { Alert } from 'react-native';

const ErrorAlert = (errorMessage) => {
  return (
    Alert.alert(
      'Error',
      errorMessage,
      [{ text: 'OK' }],
      { cancelable: true }
    )
  );
};

export default ErrorAlert;