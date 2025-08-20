import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PrimaryButton, SecondaryButton } from '../../components';
import i18n from '../../localization/i18n';
import { useAuth } from '../../common';

const ProfileScreen = () => {
    const { user, logout } = useAuth();
  const handleViewFavorites = () => {
    router.push('/favouriteEvents')
  };

  const handleLogout = async () => {
    await logout()
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileCard}>
         <View style={ { alignItems: 'center' }}>
            <Ionicons name="person-circle-outline" size={100} color="#666" style={styles.profileIcon} />
            <Text style={styles.profileEmail}>{ user?.email } </Text>
        </View>
        


        <PrimaryButton title={i18n.t('Favourites')} onPress={handleViewFavorites} />
        <SecondaryButton title={i18n.t('Logout')} onPress={handleLogout} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center'
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 50,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    bottom: 0
    
  },
  profileIcon: {
    marginBottom: 10
  },
  profileEmail: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  }
});
