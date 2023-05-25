import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

// Global styles
import { COLORS } from "../styles/global";

export default function ModalScanned({ isVisible, children, onClose }) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {/** Pattern to escape modal on overlay press */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}></View>
      </TouchableWithoutFeedback>

      <View style={styles.modalContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Produit trouvé</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" color="white" size={22} />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    height: "25%",
    width: "100%",
    zIndex: 100,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
  },
  titleContainer: {
    height: "16%",
    backgroundColor: COLORS.green,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 16,
  },
});
