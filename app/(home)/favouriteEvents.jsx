import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { EventItem } from '../../components';
import { useFavorites } from '../../common'; 

const FavoriteEventsScreen = () => {
  const { favoriteEvents, loading } = useFavorites();

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {favoriteEvents.length > 0 ? (
        <FlatList
          data={favoriteEvents}
          renderItem={({ item }) => <EventItem item={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.noFavoritesContainer}>
          <Ionicons name="heart-dislike-outline" size={80} color="#ccc" />
          <Text style={styles.noFavoritesText}>You don't have any favorite events yet.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default FavoriteEventsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
  noFavoritesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noFavoritesText: {
    marginTop: 20,
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
  },
});
