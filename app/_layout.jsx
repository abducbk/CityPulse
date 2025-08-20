import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import { LocaleProvider } from '../common/hooks/useLocale';

const RootLayout = () => {
  return (
    <LocaleProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }}/>
          <Stack.Screen name="(auth)" options={{ headerShown: false }}/>
          <Stack.Screen name="(home)" options={{ headerShown: false }}/>
        </Stack>
    </LocaleProvider>
  )
}

export default RootLayout

const styles = StyleSheet.create({})