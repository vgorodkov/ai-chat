import { StyleSheet } from 'react-native';

import { spacings } from '@/constants/layout';

export const styles = StyleSheet.create({
  chatCommonTopicRow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: spacings.m,
  },
});
