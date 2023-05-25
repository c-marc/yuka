import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function Loader() {
  return (
    <View style={styles.container}>
      <Text>Loading...</Text>
      <ActivityIndicator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    alignItems: "center",
    gap: 10,
  },
});
