import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootSiblingParent } from "react-native-root-siblings";
// Screens
import MainNavigation from "./navigators/main-navigation";
import AuthProvider from "./auth-flow/auth-provider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <RootSiblingParent>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
