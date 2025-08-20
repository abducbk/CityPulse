import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import EventService from '../services/EventService';

const GetEvents = (keyword = '') => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedEvents = await EventService.getEvents(keyword);
        const mappedEvents = fetchedEvents.map(event => ({
          id: event.id,
          title: event.name,
          date: event.dates?.start?.localDate || '',
          location: event._embedded?.venues?.[0]?.name || '',
          imageUrl: event.images?.[0]?.url,
          latitude: event._embedded?.venues?.[0]?.location?.latitude,
          longitude: event._embedded?.venues?.[0]?.location?.longitude,
        }));
        setEvents(mappedEvents);
      } catch (e) {
        setError('Failed to load events. Please try again.');
        Alert.alert('Error', 'Failed to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchEvents();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [keyword]);

  return { events, loading, error };
};

export default GetEvents;
