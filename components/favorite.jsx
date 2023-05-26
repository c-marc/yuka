import { useState, useEffect } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Toast from "react-native-root-toast";

// API
import {
  removeFromCollection,
  addToCollection,
  getCollection,
} from "../services/yuka-api-data";

export default function Favorite({ id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get favorites
        const favorites = await getCollection("favorites");
        // setState
        if (!ignore) {
          setIsFavorite(favorites.some((el) => el.id === id));
        }
      } catch (error) {
        console.error(error.message);
        setError(true);
      }
    };
    // Go
    let ignore = false;
    fetchData();
    return () => (ignore = true);
  }, []);

  const handleToggle = async () => {
    // optimistic
    setIsFavorite(!isFavorite);
    // async will rerender to rely on real data
    // isFavorite is still right until we return the promise (I think :))
    if (isFavorite) {
      await removeFromCollection("favorites", id);
      let toast = Toast.show("Retiré des favoris");
    } else {
      await addToCollection("favorites", id);
      let toast = Toast.show("Ajouté aux favoris");
    }
  };

  return (
    <View>
      {!error && (
        <Pressable onPress={handleToggle}>
          {isFavorite ? (
            <MaterialIcons name="star" size={24} color="white" />
          ) : (
            <MaterialIcons name="star-outline" size={24} color="white" />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});
