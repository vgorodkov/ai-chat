import { View, ViewProps } from 'react-native';
import React from 'react';
import { styles } from './styles';

export const Card = ({ children, style, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.cardContainer, style]}>
      {children}
    </View>
  );
};
