import { useEffect, useState } from "react";
import { View, Pressable, StyleSheet, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

// API & utils
import { getProducts } from "../services/off-api";
import { addToCollection, getCollection } from "../services/yuka-api-data";
import { joinAndPreprocess } from "../utils/db";

// components
import ProductOverview from "../components/product-overview";
import Loader from "../components/loader";
import FABScan from "../components/fab-scan";
import LayoutMain from "../components/layout-main";
import ErrorCustom from "../components/error-custom";

export default function FavoritesScreen({ navigation }) {
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Need to trigger useEffect when we go back
  // Ex: from Product, favorites might be different
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get favorites
        const favorites = await getCollection("favorites");
        // if collection is not empty, fetch data
        if (favorites.length) {
          // extract ids
          const ids = favorites.map((el) => el.id);
          // request OFF API
          let result = await getProducts(ids);
          // join data
          result = joinAndPreprocess(result, favorites);
          if (!ignore) {
            setProducts(result);
          }
        }
      } catch (error) {
        setErrorMessage("Le chargement des favoris a échoué");
      }
      setIsLoading(false);
    };
    // Go
    let ignore = false;
    // fetchData();
    isFocused && fetchData();
    return () => (ignore = true);
  }, [isFocused]);

  if (isLoading) return <Loader />;

  return (
    <LayoutMain>
      <FABScan />

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <View style={styles.item}>
              <Pressable
                onPress={() => navigation.navigate("Product", { id: item._id })}
              >
                <ProductOverview product={item} />
              </Pressable>
            </View>
          );
        }}
      />

      <ErrorCustom message={errorMessage} />
    </LayoutMain>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    position: "relative",
  },
  item: { borderBottomColor: "lightgrey", borderBottomWidth: 1 },
});
