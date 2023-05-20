import { View, Text, ActivityIndicator } from "react-native";

export default function SplashScreen() {
  return (
    <View>
      <ActivityIndicator />
      <Text>Loading...</Text>
    </View>
  );
}
