import { Stack } from 'expo-router'
 
export default function HomeLayout() {
  return (
    <Stack options={{ headerShown: false }}>
    <Stack.Screen name="home"  options={{ headerShown: true, title:"Upcoming Events" }}/>
    <Stack.Screen name="eventDetail" options={{ headerShown: true }}/>
    <Stack.Screen name="favouriteEvents"  options={{ headerShown: true, title: "Favourites" }}/>
    <Stack.Screen name="profile" options={{ headerShown: true,  title: "Profile" }}/>
    </Stack>
  )
}