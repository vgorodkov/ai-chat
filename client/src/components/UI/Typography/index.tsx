import React from 'react';
import { Text as RNText } from 'react-native';

import { colors } from '@/constants/colors';
import { TypographyProps } from './types';
import { TypographyVariant } from './constants';
import { typographyStyles } from './styles';

export const Typography = ({
  children,
  variant = TypographyVariant.BODY_LARGE,
  style,
  color = colors.primaryText,
}: TypographyProps) => {
  const txtStyle = typographyStyles[variant];

  return (
    <RNText style={[txtStyle, { color: color }, style]}>{children}</RNText>
  );
};
