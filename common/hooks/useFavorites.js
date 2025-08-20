import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import useAuth from './useAuth'; // Import your custom authentication hook
import { fetchFavorites, toggleFavorite } from '../services';

const useFavorites = () => {
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const { user } = useAuth();

  const handleToggleFavorite = async (event) => {
    const updatedFavorites = await toggleFavorite(user?.email, event);
    setFavoriteEvents(updatedFavorites);
  };

  const isFavorite = (eventId) => {
    return favoriteEvents.some(event => event.id === eventId);
  };

  useEffect(() => {
    const loadFavorites = async () => {
      setLoading(true);
      const favoritesObject = await fetchFavorites(user?.email);
      setFavoriteEvents(Object.values(favoritesObject));
      setLoading(false);
    };

    if (isFocused && user) {
      loadFavorites();
    }
  }, [isFocused, user]);

  return { 
    favoriteEvents, 
    loading, 
    toggleFavorite: handleToggleFavorite, 
    isFavorite 
  };
};

export default useFavorites;
