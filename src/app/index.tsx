import { Redirect } from "expo-router";

export default function RootIndex() {
  // Redirect to splash screen first, which will handle auth checking
  return <Redirect href="/(splash)" />;
}