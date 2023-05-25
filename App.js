import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import MainNavigation from "./navigators/main-navigation";
import AuthProvider from "./auth-flow/auth-provider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>

    // SOMETHING IS WRONG
    // <AuthProvider>
    //   <View style={styles.container}>
    //     <StatusBar style="auto" />
    //     <MainNavigation />
    //   </View>
    // </AuthProvider>
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
