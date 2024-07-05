import { TextStyle } from 'react-native';

import { TypographyVariant } from './constants';

export const typographyStyles: Record<
  TypographyVariant,
  TextStyle | TextStyle[]
> = {
  [TypographyVariant.TITLE_MEDIUM]: {
    fontSize: 24,
    fontWeight: '600',
  },
  [TypographyVariant.TITLE_SMALL]: {
    fontSize: 20,
    fontWeight: '600',
  },
  [TypographyVariant.BODY_LARGE]: {
    fontSize: 16,
    fontWeight: '400',
  },
  [TypographyVariant.BODY_SMALL]: {
    fontSize: 12,
    fontWeight: '400',
  },
  [TypographyVariant.LABEL_LARGE]: {
    fontSize: 16,
    fontWeight: '600',
  },
  [TypographyVariant.LABEL_SMALL]: {
    fontSize: 12,
    fontWeight: '600',
  },
};
