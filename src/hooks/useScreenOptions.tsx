import React from 'react';
import {TouchableOpacity} from 'react-native';
import {CardStyleInterpolators} from '@react-navigation/stack';
import {StackHeaderOptions} from '@react-navigation/stack/lib/typescript/src/types';
import type {HeaderTitleProps} from '@react-navigation/elements';
import {useData} from './useData';

import Image from '@src/components/Image';
import Text from '@src/components/Text';
import useTheme from '@src/hooks/useTheme';
import Button from '@src/components/Button';
import Block from '@src/components/Block';
import useNavigation from '@src/routes/Navigation';

export default () => {
  const {user} = useData();
  const {drawerNavigate, navigate, back} = useNavigation();

  const {icons, colors, gradients, sizes} = useTheme();

  const menu = {
    headerStyle: {elevation: 0},
    headerTitleAlign: 'left',
    headerTitleContainerStyle: {marginLeft: -sizes.sm},
    headerLeftContainerStyle: {paddingLeft: sizes.s},
    headerRightContainerStyle: {paddingRight: sizes.s},
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
    headerTitle: ({children}: HeaderTitleProps) => <Text p>{children}</Text>,
    headerLeft: () => (
      <Button onPress={drawerNavigate}>
        <Image source={icons.menu} radius={0} color={colors.icon} />
      </Button>
    ),
    headerRight: () => (
      <Block row flex={0} align="center" marginRight={sizes.padding}>
        <TouchableOpacity
          style={{marginRight: sizes.sm}}
          onPress={() => navigate('Pro')}>
          <Image source={icons.bell} radius={0} color={colors.icon} />
          <Block
            flex={0}
            right={0}
            width={sizes.s}
            height={sizes.s}
            radius={sizes.xs}
            position="absolute"
            gradient={gradients?.primary}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate('Pro')}>
          <Image source={icons.basket} radius={0} color={colors.icon} />
          <Block
            flex={0}
            padding={0}
            justify="center"
            position="absolute"
            top={-sizes.s}
            right={-sizes.s}
            width={sizes.sm}
            height={sizes.sm}
            radius={sizes.sm / 2}
            gradient={gradients?.primary}>
            <Text white center bold size={10} lineHeight={10} paddingTop={3}>
              3
            </Text>
          </Block>
        </TouchableOpacity>
      </Block>
    ),
  } as StackHeaderOptions;

  const options = {
    stack: menu,
    components: {
      ...menu,
      headerTitle: () => (
        <Text p white>
          Components
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={drawerNavigate}>
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    pro: {
      ...menu,
      headerTransparent: true,
      headerTitle: () => (
        <Text p white semibold>
          Soft UI PRO
        </Text>
      ),
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={drawerNavigate}>
          <Image source={icons.menu} radius={0} color={colors.white} />
        </Button>
      ),
    },
    back: {
      ...menu,
      headerRight: () => null,
      headerLeft: () => (
        <Button onPress={back}>
          <Image
            radius={0}
            width={10}
            height={18}
            color={colors.icon}
            source={icons.arrow}
            transform={[{rotate: '180deg'}]}
          />
        </Button>
      ),
    },
    profile: {
      ...menu,
      headerRight: () => (
        <Block row flex={0} align="center" marginRight={sizes.padding}>
          <TouchableOpacity
            style={{marginRight: sizes.sm}}
            onPress={() => navigate('Notifications')}>
            <Image source={icons.bell} radius={0} color={colors.icon} />
            <Block
              flex={0}
              right={0}
              width={sizes.s}
              height={sizes.s}
              radius={sizes.xs}
              position="absolute"
              gradient={gradients?.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('Profile')}>
            <Image
              radius={6}
              width={24}
              height={24}
              source={{uri: user.avatar}}
            />
          </TouchableOpacity>
        </Block>
      ),
    },
  };

  return options;
};
