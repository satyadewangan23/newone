import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import StackRoot from './src/navigation/Navigation';

const App = () => {
  return (
      <NavigationContainer>
        <StackRoot />
      </NavigationContainer>
  );
};

export default App;
