import { useState } from "react";
import { View, Text, Pressable, Button, TextInput } from "react-native";
import { useAuthDispatch } from "../auth-flow/auth-contexts";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = useAuthDispatch();

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={() => signIn({ email, password })}>
        <Text>Se connecter</Text>
      </Pressable>
    </View>
  );
}
