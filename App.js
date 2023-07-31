import { AppRegistry } from 'react-native';

import { AuthContext, AuthProvider } from './context/AuthContext';
import AppNav from './navigation/AppNav';

const App = () => {

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
};

AppRegistry.registerComponent('online-earning-app', () => App);

// AppRegistry.runApplication('YourAppName', {
//   initialProps: {},
//   rootTag: document.getElementById('root') // Replace 'root' with the ID of your app's root element
// });

export default App;