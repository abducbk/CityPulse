import AsyncStorage from '@react-native-async-storage/async-storage';

const getStorageKey = (uid) => {
  return uid ? `@favorites_${uid}` : '@favorites_guest';
};

const fetchFavorites = async (uid) => {
  try {
    const storageKey = getStorageKey(uid);
    const favoritesJSON = await AsyncStorage.getItem(storageKey);
    return favoritesJSON ? JSON.parse(favoritesJSON) : {};
  } catch (e) {
    console.error('Failed to fetch favorite events from storage.', e);
    return {};
  }
};

const saveFavorites = async (uid, favorites) => {
  try {
    const storageKey = getStorageKey(uid);
    await AsyncStorage.setItem(storageKey, JSON.stringify(favorites));
  } catch (e) {
    console.error('Failed to save favorites to storage.', e);
  }
};

const toggleFavorite = async (uid, event) => {
  const favoritesObject = await fetchFavorites(uid);
  const isCurrentlyFavorite = !!favoritesObject[event.id];

  if (isCurrentlyFavorite) {
    delete favoritesObject[event.id];
  } else {
    favoritesObject[event.id] = event;
  }

  await saveFavorites(uid, favoritesObject);
  return Object.values(favoritesObject);
};

export { fetchFavorites, saveFavorites, toggleFavorite };
