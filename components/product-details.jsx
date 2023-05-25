import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Components
import GradeIndicator from "./grade-indicator";

// Utils
import { getEnergy, getFruits } from "../utils/data-wrangling";

// Local components
function Item({ data, children }) {
  return (
    <View style={styles.itemContainer}>
      <View>{children}</View>
      <View styles={styles.itemMiddle}>
        <Text style={styles.itemTitle}>{data.title}</Text>
        <Text style={styles.itemComment}>{data.result.comment}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={styles.itemQuantity}>{data.quantity}</Text>
        <GradeIndicator grade={data.result.grade} size={indicatorSize} />
      </View>
    </View>
  );
}

export default function ProductDetails({ product }) {
  const fruits = getFruits(product);
  const energy = getEnergy(product);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Détails :</Text>
        <Text style={styles.itemQuantity}>pour 100g</Text>
      </View>

      <Item data={fruits}>
        <MaterialCommunityIcons
          name="fruit-watermelon"
          size={iconSize}
          color={iconColor}
        />
      </Item>

      <Item data={energy}>
        <MaterialCommunityIcons name="fire" size={iconSize} color={iconColor} />
      </Item>
    </View>
  );
}

// Out of stylesheet
const iconSize = 32;
const iconColor = "grey";
const indicatorSize = 16;

const styles = StyleSheet.create({
  header: {
    marginBottom: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 22,
  },
  itemContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  itemMiddle: {
    // TODO: NOT WORKING AS EXPECTED
    flex: 1,
  },
  itemRight: {
    flexDirection: "row",
    gap: 5,
  },
  itemTitle: {
    fontSize: 18,
  },
  itemComment: {
    color: "grey",
  },
  itemQuantity: {
    color: "grey",
  },
});
