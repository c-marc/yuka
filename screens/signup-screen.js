import { useState, useEffect } from "react";

import { View, Text, Pressable } from "react-native";

import { useAuthDispatch } from "../auth-flow/auth-contexts";

import { fakeUser } from "../services/yuka-api";

export default function SignupScreen() {
  const [email, setEmail] = useState(fakeUser.email);
  const [username, setUsername] = useState(fakeUser.username);
  const [password, setPassword] = useState(fakeUser.password);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const { signUp } = useAuthDispatch();

  // Demo
  useEffect(() => {
    setEmail(fakeUser.email);
    setUsername(fakeUser.username);
    setPassword(fakeUser.password);
  }, []);

  async function handleSubmit() {
    setIsLoading(true);
    setErrorMessage(null);

    if (!username || !email || !password) {
      return setErrorMessage("All fields are required");
    }

    try {
      await signUp({ email, username, password });
    } catch (error) {
      setErrorMessage("User already exists?");
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
        placeholder="Prénom"
        value={username}
        onChangeText={setUsername}
        textContentType="username"
        autoCorrect={false}
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="newPassword"
        autoCorrect={false}
      />
      <Pressable onPress={handleSubmit} disabled={isLoading}>
        <Text>S'inscrire</Text>
      </Pressable>

      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
}
