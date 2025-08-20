import { StyleSheet, Text, View, Alert, Keyboard, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import i18n from '../../localization/i18n';
import { router } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { PrimaryButton, SecondaryButton, PrimaryTextField } from '../../components';
import { useAuth } from '../../common';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [locale, setLocale] = useState(i18n.locale);
  const { register, loading } = useAuth();

   const onRegister = async () => {
    Keyboard.dismiss();
    const success = await register(email, password);
        if (success) {
          router.replace('/home'); 
        }
  };

  const onLogin = () => {
    router.replace('/login');
  };

  return (
    <View style={ styles.container }>
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

         <PrimaryTextField
          label={i18n.t('confirmPassword')}
          placeholder={i18n.t('confirmPasswordPlaceholder')}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      
      {loading ? (
        <ActivityIndicator size="large" color="#1a73e8" style={styles.loadingIndicator} />
      ) : (
        <PrimaryButton title={i18n.t('registerButton')} onPress={onRegister} />
      )}
      

      <View style={styles.loginButtonContainer}>
        <Text style={ styles.centerText }>{i18n.t('alreadyHaveAnAccountDescription')}</Text>
        <SecondaryButton title={i18n.t('loginButton')} onPress={onLogin} />
      </View>
    </View>
  );
}

export default Register

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
   loginButtonContainer: {
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
})
