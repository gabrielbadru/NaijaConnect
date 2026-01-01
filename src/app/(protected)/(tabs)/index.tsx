import { Link } from "expo-router";
import { View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
        <Link href = {"/(protected)/(tabs)/profile"}> GO  TO PROFILES </Link>
         <Link href = {"/(auth)/signup"}> GO  TO SIGNUP </Link>
          <Link href = {"/(auth)/login"}> GO  TO LOGIN </Link>
        
    </View>
  );
}
