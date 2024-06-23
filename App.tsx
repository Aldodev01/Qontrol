import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DataProvider, ThemeProvider, useData} from '@src/hooks';
import SubRoutes from '@src/routes/SubRoutes';
import { navigationRef } from '@src/routes/Navigation';

export default function App() {
  const {isDark, theme, setTheme} = useData();



  return (
    <DataProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer ref={navigationRef} theme={DefaultTheme}>
          <SubRoutes />
        </NavigationContainer>
      </ThemeProvider>
    </DataProvider>
  );
}
