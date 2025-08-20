import axios from 'axios';
import { Alert } from 'react-native';

const API_KEY = 'SgAPufjmzzXLkyUnzl8RGx9AincYzFHx';
const API_URL = 'https://app.ticketmaster.com/discovery/v2/events.json';

async function getEvents(keyword = '', countryCode = 'AE') {
  if (!API_KEY || API_KEY === 'YOUR_TICKETMASTER_API_KEY') {
    Alert.alert('API Key Missing', 'Please replace "YOUR_TICKETMASTER_API_KEY" with your actual API key in EventService.js.');
    return [];
  }

  try {
    const response = await axios.get(API_URL, {
      params: {
        apikey: API_KEY,
        countryCode,
        keyword,
      },
    });

    const events = response.data._embedded?.events || [];
    return events;

  } catch (error) {
    console.error('Failed to fetch events:', error);
    if (error.response) {
      Alert.alert('API Error', `Server responded with status: ${error.response.status}`);
    } else if (error.request) {
      Alert.alert('Network Error', 'No response received from the server. Check your internet connection.');
    } else {
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    }
    return [];
  }
}

export default {
  getEvents,
};
