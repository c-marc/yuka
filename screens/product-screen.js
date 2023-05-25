import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

// API
import { getProduct } from "../services/off-api";

// Components
import Loader from "../components/loader";
import ProductOverview from "../components/product-overview";
import ErrorCustom from "../components/error-custom";
import ProductDetails from "../components/product-details";
import LayoutMain from "../components/layout-main";

export default function ProductScreen({ route }) {
  // Screen is called with a payload
  const { id } = route.params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get one product
        const result = await getProduct(id);
        // setState
        if (!ignore) {
          setProduct(result);
        }
      } catch (error) {
        setErrorMessage("Le chargement du produit a échoué");
      }
      // Fetching the product is enough to display sthg
      setIsLoading(false);
    };
    // Go
    let ignore = false;
    fetchData();
    return () => (ignore = true);
  }, []);

  if (isLoading) return <Loader />;

  // Here we cannot display anything if there's an error
  return (
    <LayoutMain>
      {errorMessage ? (
        <ErrorCustom message={errorMessage} />
      ) : (
        <View style={styles.container}>
          <ProductOverview product={product} />

          <ProductDetails product={product} />

          <Text style={styles.etc}>Etc...</Text>
        </View>
      )}
    </LayoutMain>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 20,
  },

  etc: { marginTop: 50 },
});
