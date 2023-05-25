import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

// API & DB
import { addToCollection } from "../services/yuka-api-data";
import { getProduct } from "../services/off-api";

// components
import ModalScanned from "../components/modal-scanned";
import ProductOverview from "../components/product-overview";
import ErrorCustom from "../components/error-custom";
import Loader from "../components/loader";

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  // TMP hack for easier testing on laptop
  // const [scanned, setScanned] = useState(false);
  const [scanned, setScanned] = useState("0737628064502");

  const [product, setProduct] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      // reset product
      setProduct(null);
      try {
        // get one product
        const result = await getProduct(scanned);
        // setState
        if (!ignore) {
          setProduct(result);
        }
      } catch (error) {
        setErrorMessage("Le chargement du produit a échoué");
      }
    };
    // Go
    let ignore = false;
    fetchData();
    return () => (ignore = true);
  }, [scanned]);

  const handleBarCodeScanned = async ({ type, data }) => {
    // setScanned(true);
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setScanned(data);
    await addToCollection("history", data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      </View>

      <ModalScanned
        isVisible={scanned !== null}
        onClose={() => setScanned(null)}
      >
        {!product ? (
          <Loader />
        ) : (
          <>
            <Pressable
              onPress={() => {
                // close modal
                setScanned(null);
                navigation.navigate("Product", { id: product._id });
              }}
            >
              <ProductOverview product={product} />
            </Pressable>

            <ErrorCustom message={errorMessage} />
          </>
        )}
      </ModalScanned>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
