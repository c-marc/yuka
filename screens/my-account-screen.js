import { View, Text, Pressable } from "react-native";

export default function MyAccountScreen() {
  return (
    <View>
      <Pressable onPress={() => console.log("logout")}>
        <Text>Se déconneter</Text>
      </Pressable>
    </View>
  );
}
