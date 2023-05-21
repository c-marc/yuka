import { View, Text, Pressable } from "react-native";

import { useAuthDispatch } from "../auth-flow/auth-contexts";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signUp } = useAuthDispatch();

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Prénom"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={() => signUp({ email, username, password })}>
        <Text>S'inscrire</Text>
      </Pressable>
    </View>
  );
}
