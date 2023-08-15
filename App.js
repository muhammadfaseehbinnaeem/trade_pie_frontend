import { AppRegistry } from 'react-native';

import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';

const App = () => {

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

AppRegistry.registerComponent('online-earning-app', () => App);

export default App;