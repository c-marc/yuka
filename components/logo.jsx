import { View, Image, StyleSheet } from "react-native";

export default function Logo({ height = 30 }) {
  return (
    <View style={[styles.container, { height: height }]}>
      <Image source={require("../assets/logo-yuka.png")} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});
