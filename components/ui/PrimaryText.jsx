import React from 'react';
import { Text, StyleSheet, I18nManager } from 'react-native';

const PrimaryText = ({ style, children, ...props }) => {
  return (
    <Text
      style={[
        styles.default,
        {
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: '#000',
  },
});

export default PrimaryText;
