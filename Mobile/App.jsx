import React from 'react';
import { StatusBar } from 'react-native';

import {NavigationContainer} from '@react-navigation/native'
import Routes from './src/routes/auth.routes';
import { AutheProvider } from './src/context/authContext';

export default function App() {
  return (
    <AutheProvider>
      <StatusBar backgroundColor = "#87CEFA" barStyle="light-content"/>
      <Routes/>
    </AutheProvider>
    
  );
}


