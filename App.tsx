import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DataProvider, ThemeProvider, useData} from '@src/hooks';
import {navigationRef} from '@src/routes/Navigation';
import Routes from '@src/routes/Routes';
import Toast from 'react-native-toast-message';

export default function App() {
  const {theme, setTheme} = useData();

  return (
    <DataProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
          <Routes />
        </NavigationContainer>
      </ThemeProvider>
      <Toast />
    </DataProvider>
  );
}
