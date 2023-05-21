import { View, Text, Pressable } from "react-native";

export default function ProductsScreen({ navigation }) {
  return (
    <View>
      <Text>Products</Text>
      <Pressable onPress={() => navigation.navigate("Product")}>
        <Text>Go to product</Text>
      </Pressable>
    </View>
  );
}
