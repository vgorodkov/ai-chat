import { TextProps as RNTextProps } from 'react-native';
import { TypographyVariant } from './constants';

export interface TypographyProps extends RNTextProps {
  color?: string;
  variant?:
    | TypographyVariant.TITLE_MEDIUM
    | TypographyVariant.TITLE_SMALL
    | TypographyVariant.BODY_LARGE
    | TypographyVariant.BODY_SMALL
    | TypographyVariant.LABEL_LARGE
    | TypographyVariant.LABEL_SMALL;
}
