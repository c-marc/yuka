import { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  StyleSheet,
} from "react-native";
import { useAuthDispatch } from "../auth-flow/auth-contexts";

import { fakeUser } from "../services/yuka-api";

export default function SigninScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { signIn } = useAuthDispatch();

  // Demo
  useEffect(() => {
    setEmail(fakeUser.email);
    setPassword(fakeUser.password);
  }, []);

  async function handleSubmit() {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      await signIn({ email, password });
    } catch (error) {
      setErrorMessage("Wrong email or password");
    }
    setIsLoading(false);
  }

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
        autoCorrect={false}
      />
      <Pressable
        onPress={handleSubmit}
        disabled={isLoading}
        style={isLoading ? [styles.btn, styles.disabled] : styles.btn}
      >
        <Text>Se connecter</Text>
      </Pressable>

      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {},
  disabled: {
    opacity: 0.5,
  },
});
