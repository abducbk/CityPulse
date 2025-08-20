import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useAuth, fetchFavorites, toggleFavorite } from '../../common';

const EventDetailsScreen = () => {
  const event = useLocalSearchParams();
  const navigation = useNavigation();
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!user?.email) {
        setIsFavorite(false);
        return;
      }
      try {
        const favorites = await fetchFavorites(user.email);
        if (favorites[event.id]) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };
    checkFavorite();
  }, [event.id, user]);

  const toggleFavoriteStatus = async () => {
    if (!user?.email) {
        return;
    }
    try {
      const updatedFavorites = await toggleFavorite(user.email, event);
      const isCurrentlyFavorite = updatedFavorites.some(fav => fav.id === event.id);
      setIsFavorite(isCurrentlyFavorite);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: event.title,
      headerRight: () => (
        <Pressable onPress={toggleFavoriteStatus}>
          <Ionicons
            name={isFavorite ? 'heart' : 'heart-outline'}
            size={24}
            color={isFavorite ? 'red' : 'black'}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      ),
    });
  }, [navigation, isFavorite, toggleFavoriteStatus, event.title]);

  if (!event || Object.keys(event).length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No event details found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: event.imageUrl }}
          accessibilityLabel={event.title}
        />

        <Text style={styles.title}>{event.title}</Text>

        <View style={styles.detailRow}>
          <Ionicons name="calendar-outline" size={20} color="#666" style={styles.icon} />
          <Text style={styles.detailText}>{event.date}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={20} color="#666" style={styles.icon} />
          <Text style={styles.detailText}>{event.location}</Text>
        </View>

        {event.latitude && event.longitude && (
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: Number(event.latitude),
                longitude: Number(event.longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: Number(event.latitude),
                  longitude: Number(event.longitude),
                }}
                title={event.title}
                description={event.location}
              />
            </MapView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default EventDetailsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  errorText: {
    fontSize: 18,
    color: '#888',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 8,
  },
  icon: {
    marginRight: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#666',
  },
  mapContainer: {
    height: 250,
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
