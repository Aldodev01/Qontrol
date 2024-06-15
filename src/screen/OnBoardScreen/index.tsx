import useNavigation from '@src/routes/Navigation';
import React from 'react';
import {Button, StatusBar, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

const OnBoardScreen = () => {
  const {navigate, push, pop, back, tabNavigation, backToHome} =
    useNavigation();
  return (
    <SafeAreaView edges={['right', 'bottom', 'left', 'top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#d090f1" />
      <Text>OnBoardScreen</Text>
      <View>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigate('Home', {id: 42})}
        />
        <Button
          title="Push to Profile"
          onPress={() => push('Home ', {userId: 'abc123', showDetails: true})}
        />
        <Button title="Pop Screen" onPress={() => pop()} />
        <Button title="Go Back" onPress={() => back()} />
        <Button
          title="Tab Navigation to Home"
          onPress={() => tabNavigation('Home')}
        />
        <Button title="Back to Home" onPress={() => backToHome()} />
      </View>
    </SafeAreaView>
  );
};

export default OnBoardScreen;
