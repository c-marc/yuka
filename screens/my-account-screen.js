import { View, Text, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";

// auth
import { useAuth, useAuthDispatch } from "../auth-flow/auth-contexts";

// API
import { getUser } from "../services/yuka-api-user";

// Components
import LayoutMain from "../components/layout-main";
import ErrorCustom from "../components/error-custom";

// Helper: expect icon as child
function Item({ children, title, subtitle }) {
  return (
    <View style={styles.columns}>
      <View>{children}</View>
      <View>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

export default function MyAccountScreen() {
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const { userToken } = useAuth();
  const { signOut } = useAuthDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getUser(userToken);
        if (!ignore) {
          setUser(user);
        }
      } catch (error) {
        setErrorMessage("La récupération des données a échoué");
      }
    };
    // Go
    let ignore = false;
    fetchData();
    return () => (ignore = true);
  }, []);

  // Note that here we don't wait for data to display
  return (
    <LayoutMain>
      <View style={styles.container}>
        <Item title="Prénom" subtitle={user?.username}>
          <MaterialIcons name="person" size={iconSize} color={iconColor} />
        </Item>
        <Item title="Email" subtitle={user?.email}>
          <MaterialIcons name="email" size={iconSize} color={iconColor} />
        </Item>
        <Item title="Mot de passe">
          <MaterialIcons name="vpn-key" size={iconSize} color={iconColor} />
        </Item>

        <Pressable onPress={signOut}>
          <Item title="Se déconnecter">
            <MaterialIcons name="logout" size={iconSize} color={iconColor} />
          </Item>
        </Pressable>

        {/* {errorMessage && <ErrorCustom message={errorMessage} />} */}
        <ErrorCustom message={errorMessage} />
      </View>
    </LayoutMain>
  );
}

const iconSize = 28;
const iconColor = "grey";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    gap: 20,
  },
  columns: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  title: {
    fontSize: 18,
  },
  subtitle: {
    color: "grey",
    fontSize: 15,
  },
});
