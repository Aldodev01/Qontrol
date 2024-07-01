import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Block, Button, Text} from '@src/components';
import {useTheme} from '@src/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import useNavigation from './Navigation';
import PresentScreen from '@src/screens/PresentScreen';
import ProfileScreen from '@src/screens/ProfileScreen';
import HomeScreen from '@src/screens/HomeScreen';

const Tab = createBottomTabNavigator();
export default function TabRoutes() {
  const {colors, gradients, sizes} = useTheme();
  const {tabNavigation} = useNavigation();

  // screen list for Drawer menu
  const screens = [
    {
      name: 'Home',
      to: 'DrawerScreen',
      iconActive: 'view-dashboard',
      iconInActive: 'view-dashboard-outline',
      component: HomeScreen,
    },
    {
      name: 'Present',
      to: 'PresentScreen',
      iconActive: 'adjust',
      iconInActive: 'album',
      component: PresentScreen,
    },
    {
      name: 'Profile',
      to: 'ProfileScreen',
      iconActive: 'account',
      iconInActive: 'account-outline',
      component: ProfileScreen,
    },
  ];
  return (
    <Tab.Navigator
      initialRouteName="Analitics"
      screenOptions={{headerShown: false}}>
      {screens?.map((event, index) => {
        return (
          <Tab.Screen
            key={`bottom-menu-tab-${event.name}-${index}`}
            name={event.to}
            component={event.component}
            options={{
              unmountOnBlur: true,
              // tabBarLabel: event.name,
              tabBarShowLabel: false,
              tabBarLabelPosition: 'below-icon',
              tabBarIcon: ({focused}) => (
                <Button
                  justify="center"
                  align="center"
                  marginBottom={event.name === 'Present' ? 30 : sizes.s}
                  key={`bottom-menu-tab-${event.name}-${index}`}
                  onPress={() => tabNavigation(event.to)}>
                  <Block
                    flex={0}
                    radius={focused ? 200 : 6}
                    align="center"
                    justify="center"
                    width={event.name === 'Present' ? 50 : sizes.md}
                    height={event.name === 'Present' ? 50 : sizes.md}
                    style={{
                      backgroundColor:
                        event.name === 'Present'
                          ? colors.primary
                          : 'transparent',
                    }}
                    gradient={gradients[focused ? 'primary' : 'white']}>
                    <Icon
                      size={18}
                      name={focused ? event.iconActive : event.iconInActive}
                      color={colors[focused ? 'white' : 'black']}
                    />
                  </Block>
                  <Text
                    p
                    size={10}
                    align="center"
                    semibold={focused}
                    color={colors[focused ? 'primary' : 'black']}>
                    {event.name}
                  </Text>
                </Button>
              ),
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}
