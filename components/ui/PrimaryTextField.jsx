import React from 'react';
import { StyleSheet, TextInput, View, Text, I18nManager } from 'react-native';
import PrimaryText from './PrimaryText';

function PrimaryTextField({ label, style, ...props }) {
  return (
    <View style={styles.inputContainer}>
      <PrimaryText style={styles.label}>{label}</PrimaryText>
<TextInput
  style={[
    styles.input,
    {
      textAlign: I18nManager.isRTL ? 'right' : 'left',
      writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
    },
    style,
  ]}
  {...props}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
});

export default PrimaryTextField;
