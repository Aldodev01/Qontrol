import React, {useCallback, useState} from 'react';
import {Platform, Pressable} from 'react-native';
import {useTheme} from '@src/hooks/';
import Block from '@src/components/Block';
import Image from '@src/components/Image';
import {ICheckboxProps} from '@src/constants/types';

const Checkbox = ({onPress, id = 'Checkbox', ...props}: ICheckboxProps) => {
  const {colors, icons, sizes} = useTheme();
  const [checked, setChecked] = useState(false);

  const handlePress = useCallback(() => {
    onPress?.(!checked);
    setChecked(!checked);
  }, [checked, setChecked, onPress]);

  // generate component testID or accessibilityLabel based on Platform.OS
  const checkboxID =
    Platform.OS === 'android' ? {accessibilityLabel: id} : {testID: id};

  return (
    <Pressable {...checkboxID} hitSlop={sizes.s} onPress={handlePress}>
      <Block
        flex={0}
        align="center"
        justify="center"
        gray={!checked}
        outlined={!checked}
        width={sizes.checkboxWidth}
        height={sizes.checkboxHeight}
        radius={sizes.checkboxRadius}
        gradient={checked ? colors.checkbox : undefined}
        {...props}>
        {checked && (
          <Image
            source={icons.check}
            color={colors.checkboxIcon}
            width={sizes.checkboxIconWidth}
            height={sizes.checkboxIconHeight}
          />
        )}
      </Block>
    </Pressable>
  );
};

export default React.memo(Checkbox);
