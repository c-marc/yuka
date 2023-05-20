import { View, Text, Pressable } from "react-native";

export default function SignupScreen() {
  return (
    <View>
      <Pressable onPress={() => console.log("signup")}>
        <Text>S'inscrire</Text>
      </Pressable>
    </View>
  );
}
