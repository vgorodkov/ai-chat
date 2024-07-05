import { colors } from '@/constants/colors';
import { spacings } from '@/constants/layout';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacings.m,
    gap: spacings.s,
    borderRadius: 8,
  },
});
