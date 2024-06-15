import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Routes from '@src/routes/Routes';
import React from 'react';
import {navigationRef} from '@src/routes/Navigation';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {default as theme} from './theme.json';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

export default function App() {
  return (
    <SafeAreaProvider>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <NavigationContainer ref={navigationRef}>
          <Routes />
        </NavigationContainer>
      </ApplicationProvider>
    </SafeAreaProvider>
  );
}
