import useNavigation from '@src/routes/Navigation';
import {Button, Divider, Layout, TopNavigation} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';

const HomeScreen = () => {
  const {navigate, push, pop, back, tabNavigation, backToHome, reset} =
    useNavigation();
  return (
    <SafeAreaView edges={['right', 'bottom', 'left', 'top']}>
      <TopNavigation title="MyApp" alignment="center" />
      <Divider />
      <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button onPress={() => tabNavigation('Present')}>OPEN DETAILS</Button>
      </Layout>
    </SafeAreaView>
  );
};

export default HomeScreen;
