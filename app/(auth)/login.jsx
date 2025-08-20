import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Pressable, I18nManager, Alert, Keyboard, ActivityIndicator } from 'react-native';
import { Colors } from '../../constants/Colors';
import i18n, { toggleLanguage } from '../../localization/i18n';
import { router } from 'expo-router';
import { PrimaryTextField, SecondaryButton, PrimaryButton, PrimaryText } from '../../components';
import { useAuth } from '../../common';
import { useLocale } from '../../common/hooks/useLocale';
import * as Updates from 'expo-updates';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useAuth();
  const { changeLocale, locale } = useLocale();

  const onLogin = async () => {
    Keyboard.dismiss();
    const success = await login(email, password);
    if (success) {
      router.push('/home');
    }
  };
  const onRegister = () => {
    console.log("isRTL?", I18nManager.isRTL);
    router.push('/register');
  };

   const switchLocale = async () => {
    changeLocale(locale == 'ar' ? 'en' : 'ar');
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.localeButton} onPress={ switchLocale }>
        <Text style={styles.localeButtonText}>
          {i18n.t('toggleButton')}
        </Text>
      </Pressable>

      <PrimaryTextField
        label={i18n.t('email')}
        placeholder={i18n.t('emailPlaceholder')}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <PrimaryTextField
        label={i18n.t('password')}
        placeholder={i18n.t('passwordPlaceholder')}
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1a73e8" style={styles.loadingIndicator} />
      ) : (
        <PrimaryButton title={i18n.t('loginButton')} onPress={onLogin} />
      )}

      <View style={styles.registerButtonContainer}>
        <PrimaryText style={styles.centerText}>{i18n.t('noAccountDescription')}</PrimaryText>
        <SecondaryButton title={i18n.t('registerButton')} onPress={onRegister} />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
    paddingTop: 80,
  },
  localeButton: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    position: 'absolute',
    top: 80,
    right: 20,
  },
  localeButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  registerButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
  },
  centerText: {
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 10,
    marginBottom: 20,
  },
});
