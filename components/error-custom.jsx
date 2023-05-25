import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function ErrorCustom({ message }) {
  // Allow to call the component with empty message
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MaterialIcons name="error-outline" size={24} color={errorColor} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const errorColor = "firebrick";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    // justifyContent: "center",
    marginVertical: 10,
    alignItems: "center",
    gap: 5,
  },
  text: {
    color: errorColor,
  },
});
