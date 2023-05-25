import { View, StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

// Global styles
import { COLORS } from "../styles/global";

export default function LayoutMain({ children }) {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.main}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // NOT WORKING: this is an attempt to darken the status bar
    backgroundColor: COLORS.darkgreen,
  },
  main: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "white",
  },
});
