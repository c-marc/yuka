import { useEffect, useState } from "react";
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

export default function SigninScreen({ navigation }) {
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
      setErrorMessage("Email ou mot-de-passe invalide");
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
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        textContentType="password"
        autoCorrect={false}
      />
      <SubmitButton
        isLoading={isLoading}
        text="Se connecter"
        onPress={handleSubmit}
      />

      <View style={styles.row}>
        <Text>Pas encore inscrit(e) ?</Text>
        <LinkButton
          text="C'est par ici"
          onPress={() => navigation.navigate("Signup")}
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
