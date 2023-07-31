import { useFonts } from 'expo-font';

export function useCustomFonts() {
  const [fontsLoaded] = useFonts({
    "poppins-regular": require('../assets/fonts/Poppins-Regular.ttf'),
    "poppins-bold": require('../assets/fonts/Poppins-Bold.ttf'),
    "poppins-semibold": require('../assets/fonts/Poppins-SemiBold.ttf')
  });

  return fontsLoaded;
};