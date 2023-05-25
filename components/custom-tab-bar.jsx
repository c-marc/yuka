import { Pressable, View, StyleSheet } from "react-native";
import { MaterialTopTabBar } from "@react-navigation/material-top-tabs";

import { MaterialIcons } from "@expo/vector-icons";
import Constants from "expo-constants";

// Global styles
import { COLORS } from "../styles/global";

export default function CustomTabBar(props) {
  return (
    <View style={styles.container}>
      <View style={styles.leftNav}>
        <MaterialTopTabBar {...props} />
      </View>
      <View style={styles.rightNav}>
        <Pressable onPress={() => props.navigation.navigate("MyAccount")}>
          <MaterialIcons name="more-vert" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    width: "100%",
    backgroundColor: COLORS.green,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftNav: {
    // NOT SURE: BETTER WAY?
    width: 200,
    // debug:
    // backgroundColor:"blue"
  },
  rightNav: {
    paddingHorizontal: 5,
  },
});
