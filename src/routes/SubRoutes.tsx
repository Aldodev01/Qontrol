import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Animated, Linking, StyleSheet, View} from 'react-native';

import {
  useDrawerStatus,
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer';

import {Block, Text, Switch, Button, Image} from '@src/components';
import {useData, useTheme} from '@src/hooks';
import Routes from './Routes';
import useNavigation from './Navigation';

const Drawer = createDrawerNavigator();

/* drawer menu screens navigation */
const ScreensStack = () => {
  const {colors} = useTheme();
  const isDrawerOpen = useDrawerStatus();
  const animation = useRef(new Animated.Value(0)).current;

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1],
  });

  const borderRadius = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {
    borderRadius: borderRadius,
    transform: [{scale: scale}],
  };

  useEffect(() => {
    Animated.timing(animation, {
      duration: 200,
      useNativeDriver: true,
      toValue: isDrawerOpen ? 1 : 0,
    }).start();
  }, [isDrawerOpen, animation]);

  return (
    <Animated.View
      style={StyleSheet.flatten([
        animatedStyle,
        {
          flex: 1,
          overflow: 'hidden',
          borderColor: colors.card,
          borderWidth: isDrawerOpen ? 1 : 0,
        },
      ])}>
      <Routes />
    </Animated.View>
  );
};

/* custom drawer menu */
const DrawerContent = (props: DrawerContentComponentProps) => {
  const {navigate} = useNavigation();
  const {isDark, handleIsDark} = useData();
  const [active, setActive] = useState('Home');
  const {assets, colors, gradients, sizes} = useTheme();
  const labelColor = colors.text;

  const handleNavigation = useCallback(
    (to: string) => {
      setActive(to);
      navigate(to);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setActive],
  );

  const handleWebLink = useCallback((url: string) => Linking.openURL(url), []);

  // screen list for Drawer menu
  const screens = [
    {name: 'Home', to: 'Home', icon: assets.home},
    {name: 'components', to: 'Components', icon: assets.components},
    {name: 'articles', to: 'Articles', icon: assets.document},
    {name: 'rental', to: 'Pro', icon: assets.rental},
    {name: 'profile', to: 'Profile', icon: assets.profile},
    {name: 'settings', to: 'Settings', icon: assets.settings},
    {name: 'register', to: 'Register', icon: assets.register},
    {name: 'extra', to: 'Pro', icon: assets.extras},
  ];

  return (
    <DrawerContentScrollView
      {...props}
      scrollEnabled
      removeClippedSubviews
      renderToHardwareTextureAndroid
      contentContainerStyle={{paddingBottom: sizes.padding}}>
      <Block paddingHorizontal={sizes.padding}>
        <Block flex={0} row align="center" marginBottom={sizes.l}>
          <Image
            radius={0}
            width={33}
            height={33}
            color={colors.text}
            source={assets.logo}
            marginRight={sizes.sm}
          />
          <Block>
            <Text size={12} semibold>
              app Name
            </Text>
          </Block>
        </Block>

        {screens?.map((screen, index) => {
          const isActive = active === screen.to;
          return (
            <Button
              row
              justify="flex-start"
              marginBottom={sizes.s}
              key={`menu-screen-${screen.name}-${index}`}
              onPress={() => handleNavigation(screen.to)}>
              <Block
                flex={0}
                radius={6}
                align="center"
                justify="center"
                width={sizes.md}
                height={sizes.md}
                marginRight={sizes.s}
                gradient={gradients[isActive ? 'primary' : 'white']}>
                <Image
                  radius={0}
                  width={14}
                  height={14}
                  source={screen.icon}
                  color={colors[isActive ? 'white' : 'black']}
                />
              </Block>
              <Text p semibold={isActive} color={labelColor}>
                {screen.name}
              </Text>
            </Button>
          );
        })}

        <Block
          flex={0}
          height={1}
          marginRight={sizes.md}
          marginVertical={sizes.sm}
          gradient={gradients.menu}
        />

        <Text semibold transform="uppercase" opacity={0.5}>
          documentation
        </Text>

        <Button
          row
          justify="flex-start"
          marginTop={sizes.sm}
          marginBottom={sizes.s}
          onPress={() =>
            handleWebLink('https://github.com/creativetimofficial')
          }>
          <Block
            flex={0}
            radius={6}
            align="center"
            justify="center"
            width={sizes.md}
            height={sizes.md}
            marginRight={sizes.s}
            gradient={gradients.white}>
            <Image
              radius={0}
              width={14}
              height={14}
              color={colors.black}
              source={assets.documentation}
            />
          </Block>
          <Text p color={labelColor}>
            starteds
          </Text>
        </Button>

        <Block row justify="space-between" marginTop={sizes.sm}>
          <Text color={labelColor}>Dark Mode</Text>
          <Switch
            checked={isDark}
            onPress={checked => {
              handleIsDark(checked);
              Alert.alert('title', 'alert');
            }}
          />
        </Block>
      </Block>
    </DrawerContentScrollView>
  );
};

/* drawer menu navigation */
export default () => {
  const {gradients} = useTheme();

  return (
    <Block gradient={gradients.light}>
      <Drawer.Navigator
        drawerContent={props => <DrawerContent {...props} />}
        screenOptions={{
          drawerType: 'slide',
          overlayColor: 'transparent',
          sceneContainerStyle: {backgroundColor: 'transparent'},
          drawerStyle: {
            flex: 1,
            width: '60%',
            borderRightWidth: 0,
            backgroundColor: 'transparent',
          },
        }}>
        <Drawer.Screen name="Aldodevv" component={ScreensStack} />
      </Drawer.Navigator>
    </Block>
  );
};
