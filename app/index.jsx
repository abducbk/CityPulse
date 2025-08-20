import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useLocale } from '../common/hooks/useLocale';

const SplashScreen = () => {
  const { locale } = useLocale(); // get locale
  const [timerDone, setTimerDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTimerDone(true), 1500);
    return () => clearTimeout(timer);
  }, []);

useEffect(() => {
  if (locale && timerDone) {
    router.replace('/login');
  }
}, [locale, timerDone]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CityPulse</Text>
      <ActivityIndicator size="large" color="#ffffff" style={styles.indicator} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  indicator: {
    marginTop: 20,
  },
});
