import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Button from "./components/button";
import { useState, useEffect, useReducer } from "react";
import Overview from "./components/overview";

// Screens
import CameraScreen from "./screens/camera-screen";
import MainNavigation from "./navigators/main-navigation";
import SplashScreen from "./screens/splash-screen";
import AuthProvider from "./auth-flow/auth-provider";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <MainNavigation />
    </AuthProvider>
  );

  const [showOverview, setShowOverview] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <View>
        <Button label={"Choose"} onPress={() => setShowOverview(true)} />
        <Button label={"Use"} onPress={() => setIsModalVisible(true)} />
      </View>

      {showOverview && (
        <View>
          <Text>Hello</Text>
        </View>
      )}

      <Overview isVisible={isModalVisible} onClose={onModalClose}></Overview>

      <StatusBar style="auto" />
    </View>
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
