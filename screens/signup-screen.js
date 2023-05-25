import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// Auth
import { useAuthDispatch } from "../auth-flow/auth-contexts";

// API
import { fakeUser } from "../services/yuka-api-user";

// Components
import LayoutForm, {
  LinkButton,
  SubmitButton,
  TextInputStyled,
} from "../components/layout-form";
import ErrorCustom from "../components/error-custom";

export default function SignupScreen({ navigation }) {
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
      return setErrorMessage("Tous les champs sont obligatoires");
    }

    try {
      await signUp({ email, username, password });
    } catch (error) {
      setErrorMessage("User already exists?");
    }
    setIsLoading(false);
  }

  return (
    <LayoutForm>
      <Text style={styles.titleText}>🐰</Text>

      <TextInputStyled
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        autoCompleteType="email"
      />
      <TextInputStyled
        placeholder="Prénom"
        value={username}
        onChangeText={setUsername}
        textContentType="username"
        autoCorrect={false}
      />
      <TextInputStyled
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="newPassword"
        autoCorrect={false}
      />

      <SubmitButton
        isLoading={isLoading}
        text="S'inscrire"
        onPress={handleSubmit}
      />

      <View style={styles.row}>
        <Text>Déjà inscrit(e) ?</Text>
        <LinkButton
          text="C'est par ici"
          onPress={() => navigation.navigate("Signin")}
        />
      </View>

      <ErrorCustom message={errorMessage} />
    </LayoutForm>
  );
}

const styles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    textAlign: "center",
  },
  row: { flexDirection: "row", gap: 10 },
});
