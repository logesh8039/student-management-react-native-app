import React from 'react';
import { Text, StyleSheet } from 'react-native';
import FONTS from '../utils/fonts';
import COLORS from '../utils/colors';

const Typo = ({
  children,
  variant = 'p',
  color = COLORS.dark,
  align = 'left',
  lh,
  uc = false,
  numberOfLines,
  style,
  onPress,
}) => {
  const textTransform = uc ? 'uppercase' : 'none';

  return (
    <Text
      numberOfLines={numberOfLines}
      style={[
        styles[variant],
        { color, textAlign: align, lineHeight: lh, textTransform },
        style,
      ]}
      onPress={onPress}
    >
      {children}
    </Text>
  );
};

export default Typo;

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontFamily: FONTS.bold,
  },

  h2: {
    fontSize: 28,
    fontFamily: FONTS.bold,
  },

  h3: {
    fontSize: 24,
    fontFamily: FONTS.medium,
  },

  h4: {
    fontSize: 20,
    fontFamily: FONTS.medium,
  },

  h5: {
    fontSize: 18,
    fontFamily: FONTS.medium,
  },

  h6: {
    fontSize: 16,
    fontFamily: FONTS.medium,
  },

  p: {
    fontSize: 14,
    fontFamily: FONTS.regular,
  },

  small: {
    fontSize: 12,
    fontFamily: FONTS.light,
  },
});
