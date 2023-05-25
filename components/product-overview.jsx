import { View, Image, Text, StyleSheet } from "react-native";
import { labelForDays, labelForGrade } from "../utils/labels";
import GradeIndicator from "./grade-indicator";
import { MaterialIcons } from "@expo/vector-icons";

export default function ProductOverview({ product }) {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={{ uri: product.image_small_url }} style={styles.img} />
      </View>
      <View style={styles.column}>
        <View style={styles.header}>
          <Text numberOfLines={1} style={styles.title}>
            {product.product_name}
          </Text>
          <Text style={styles.text}>{product.brand_owner}</Text>
        </View>

        <View style={styles.ul}>
          <View style={styles.item}>
            <GradeIndicator grade={product.nutriscore_grade} />
            <Text style={styles.text}>
              {labelForGrade(product.nutriscore_grade)}
            </Text>
          </View>
          {product.days && (
            <View style={styles.item}>
              <MaterialIcons name="access-time" size={24} color="grey" />
              <Text style={styles.text}>{labelForDays(product.days)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: "row",
    gap: 20,
  },
  imgContainer: {
    height: 120,
    width: 80,
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  column: {
    paddingVertical: 5,
    flex: 1,
    gap: 10,
  },
  ul: {
    gap: 5,
  },
  title: {
    fontSize: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: {
    color: "grey",
  },
});
