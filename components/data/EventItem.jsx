import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import PrimaryText from '../ui/PrimaryText';

const EventItem = ({ item }) => {
  const handlePress = () => {
    router.push({
      pathname: '/eventDetail',
      params: item,
    });
  };

  return (
    <Pressable style={styles.itemContainer} onPress={handlePress}>
      <Image
        style={styles.image}
        source={{ uri: item.imageUrl }}
        accessibilityLabel={item.title}
      />

      <View style={styles.detailsContainer}>
        <PrimaryText style={styles.title}>{item.title}</PrimaryText>
        <PrimaryText style={styles.date}>{item.date}</PrimaryText>
        <PrimaryText style={styles.location}>{item.location}</PrimaryText>
      </View>
    </Pressable>
  );
};

export default EventItem;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  location: {
    fontSize: 14,
    color: '#888',
    marginTop: 3,
  },
});
