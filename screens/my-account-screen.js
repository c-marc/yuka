import { View, Text, Pressable } from "react-native";
import { useAuthDispatch } from "../auth-flow/auth-contexts";

export default function MyAccountScreen() {
  const { signOut } = useAuthDispatch();

  return (
    <View>
      <Pressable onPress={signOut}>
        <Text>Se déconnecter</Text>
      </Pressable>
    </View>
  );
}
