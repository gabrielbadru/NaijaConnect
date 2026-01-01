import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile-setup" />
      <Stack.Screen name="location" />
      <Stack.Screen name="naija-dna" />
      <Stack.Screen name="interest" />
      <Stack.Screen name="contacts" />
    </Stack>
  );
}
