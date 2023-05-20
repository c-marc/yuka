import { View, Text, Pressable } from "react-native";

export default function SigninScreen() {
  return (
    <View>
      <Pressable onPress={() => console.log("signin")}>
        <Text>Se connecter</Text>
      </Pressable>
    </View>
  );
}
