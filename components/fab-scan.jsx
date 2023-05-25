import { View, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// Global styles
import { COLORS } from "../styles/global";

export default function FABScan() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate("Camera")}>
        <View style={styles.fab}>
          <MaterialCommunityIcons name="barcode-scan" size={20} color="white" />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10,
    bottom: 20,
    right: 20,
    // for shadow warning?
    backgroundColor: "white",
  },
  fab: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.green,
    justifyContent: "center",
    alignItems: "center",
    // SO: how to get shadow on a floating button in react native
    // iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    // android
    elevation: 0.4,
  },
});
