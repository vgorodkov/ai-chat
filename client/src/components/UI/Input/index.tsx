import { TextInput, TextInputProps } from 'react-native';
import React from 'react';
import { styles } from './styles';
import { colors } from '@/constants/colors';

export const Input = ({ ...props }: TextInputProps) => {
  return (
    <TextInput
      {...props}
      style={styles.textInput}
      placeholderTextColor={colors.border}
      {...props}
    />
  );
};
