import { colors } from '@/constants/colors';
import { spacings } from '@/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.border,
    padding: spacings.s + spacings.xs / 2,
    flex: 1,
    color: colors.primaryText,
  },
});
