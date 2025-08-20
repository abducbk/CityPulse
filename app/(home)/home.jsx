import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, ActivityIndicator, Pressable, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useNavigation } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { EventItem } from '../../components';
import { GetEvents } from '../../common/hooks'; // Import the new custom hook

const EventListScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { events, loading, error } = GetEvents(searchQuery);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isSearchVisible ? () => (
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search events..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus={true}
          />
        </View>
      ) : 'Upcoming Events',
      headerRight: () => (
        <Pressable onPress={() => {
          setIsSearchVisible(!isSearchVisible);
          if (isSearchVisible) {
            setSearchQuery('');
          }
        }}>
          <Ionicons name={isSearchVisible ? 'close' : 'search'} size={24} color="black" style={{ marginRight: 15 }} />
        </Pressable>
      ),
      headerLeft: () => (
        <Pressable onPress={() => router.push('/profile')}>
          <Ionicons name="person-circle-outline" size={28} color="black" style={{ marginLeft: 15 }} />
        </Pressable>
      ),
    });
  }, [navigation, isSearchVisible, searchQuery]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading events...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={events}
        renderItem={({ item }) => <EventItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No events found.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default EventListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    top: 20,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#FF3B30',
    textAlign: 'center',
  },
  list: {
    paddingHorizontal: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    minHeight: 200,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});
